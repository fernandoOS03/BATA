package com.bata.backend.modules.order.services;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.bata.backend.exceptions.BadRequestException;
import com.bata.backend.exceptions.ResourceNotFoundException;
import com.bata.backend.modules.cart.entities.CartEntity;
import com.bata.backend.modules.cart.repositories.CartRepository;
import com.bata.backend.modules.order.dto.request.OrderRequest;
import com.bata.backend.modules.order.dto.response.OrderResponse;
import com.bata.backend.modules.order.entities.OrderEntity;
import com.bata.backend.modules.order.entities.OrderItemEntity;
import com.bata.backend.modules.order.mapper.OrderMapper;
import com.bata.backend.modules.order.repositories.OrderRepository;
import com.bata.backend.modules.payment.entities.PaymentEntity;
import com.bata.backend.modules.payment.repositories.PaymentRepository;
import com.bata.backend.modules.product.entities.ProductVariantEntity;
import com.bata.backend.modules.product.repositories.ProductVariantRepository;
import com.bata.backend.modules.user.entities.AddressEntity;
import com.bata.backend.modules.user.entities.LoginEntity;
import com.bata.backend.modules.user.entities.UserEntity;
import com.bata.backend.modules.user.repositories.AddressRepository;
import com.bata.backend.modules.user.repositories.LoginRepository;
import com.bata.backend.shared.email.EmailService;
import com.bata.backend.shared.email.HtmlGenerator;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {

    // Repositorios Principales
    private final OrderRepository orderRepository;
    private final ProductVariantRepository productVariantRepository;
    private final AddressRepository addressRepository;
    private final PaymentRepository paymentRepository;
    private final LoginRepository loginRepository;
    private final CartRepository cartRepository; 

    // Mappers y Servicios Auxiliares
    private final OrderMapper orderMapper;
    private final EmailService emailService;      
    private final HtmlGenerator htmlGenerator;

    /**
     * Proceso completo de Checkout:
     * 1. Valida usuario y carrito.
     * 2. Crea la orden.
     * 3. Mueve items del carrito a la orden (validando stock y congelando precio).
     * 4. Genera pago simulado.
     * 5. Vacía el carrito.
     * 6. Envía correo de confirmación.
     */
    @Transactional 
    public OrderResponse createOrder(OrderRequest request, String userEmail) {

        // 1. ----- BUSCAR USUARIO -----
        LoginEntity login = loginRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con email: " + userEmail));
        UserEntity user = login.getUser();

        // 2. ----- OBTENER EL CARRITO REAL -----
        // No usamos los items que vienen del frontend por seguridad. Usamos la BD.
        CartEntity cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Carrito no encontrado para el usuario"));

        if (cart.getItems() == null || cart.getItems().isEmpty()) {
            throw new BadRequestException("El carrito está vacío, no se puede procesar la compra");
        }

        // 3. ----- BUSCAR DIRECCIÓN -----
        AddressEntity address = addressRepository.findById(request.addressId())
                .orElseThrow(() -> new ResourceNotFoundException("Dirección no encontrada ID: " + request.addressId()));

        // 4. ----- INICIAR LA CABECERA DE LA ORDEN -----
        OrderEntity order = new OrderEntity();
        order.setUser(user);
        order.setAddress(address);
        order.setDate(LocalDateTime.now());
        order.setStatus("PAID"); // Estado inicial asumido como pagado

        // 5. ----- PROCESAR ITEMS, VALIDAR STOCK Y CALCULAR TOTALES -----
        List<OrderItemEntity> orderItems = new ArrayList<>();
        BigDecimal totalAmount = BigDecimal.ZERO;

        // Iteramos sobre los items DEL CARRITO (CartEntity), no del Request
        for (var cartItem : cart.getItems()) {
            
            // a) Obtener variante fresca de la BD
            ProductVariantEntity variant = productVariantRepository.findById(cartItem.getVariant().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));

            // b) Validar Stock disponible
            if (variant.getStock() < cartItem.getQuantity()) {
                throw new BadRequestException("Stock insuficiente para: " + variant.getProduct().getName());
            }

            // c) Descontar Stock y guardar
            variant.setStock(variant.getStock() - cartItem.getQuantity());
            productVariantRepository.save(variant);

            // d) Calcular Precio Real (Base + Modificador)
            BigDecimal basePrice = variant.getProduct().getBasePrice();
            BigDecimal modifier = variant.getPriceModifier() != null ? variant.getPriceModifier() : BigDecimal.ZERO;
            BigDecimal realPrice = basePrice.add(modifier);

            // e) Crear Item de Orden (Snapshot histórico)
            OrderItemEntity orderItem = new OrderItemEntity();
            orderItem.setVariant(variant);
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(realPrice); // Guardamos precio histórico con setPrice()
            orderItem.setOrder(order);

            orderItems.add(orderItem);

            // f) Sumar al total general
            BigDecimal subTotal = realPrice.multiply(new BigDecimal(cartItem.getQuantity()));
            totalAmount = totalAmount.add(subTotal);
        }

        // Asignar items y total a la orden
        order.setOrderItems(orderItems);
        order.setTotalAmount(totalAmount);

        // Guardar la orden en BD (Esto genera el ID de la orden)
        OrderEntity savedOrder = orderRepository.save(order);

        // 6. ----- GENERAR PAGO (Simulado) -----
        PaymentEntity payment = new PaymentEntity();
        payment.setAmount(totalAmount);
        payment.setPaymentMethod(request.paymentMethod());
        payment.setStatus("COMPLETED");
        payment.setTransactionId(UUID.randomUUID().toString()); // ID falso tipo Visa
        payment.setOrder(savedOrder);

        paymentRepository.save(payment);

        // Actualizamos la orden con el pago para devolverla completa
        savedOrder.setPayment(payment);

        // 7. ----- VACIAR EL CARRITO -----
        // Como ya se compró, el carrito debe quedar limpio
        cart.getItems().clear();
        cartRepository.save(cart);

        // 8. ----- ENVIAR CORREO (Try-Catch) -----
        // Usamos un bloque try-catch para que, si falla el servidor de correos,
        // la venta NO se cancele (porque ya se cobró y se descontó stock).
        try {
            String htmlReceipt = htmlGenerator.generateReceiptHtml(savedOrder);
            // Asegúrate de castear el ID a Long si tu método sendOrderConfirmation pide Long, o Integer si pide Integer
            emailService.sendOrderConfirmation(
                userEmail, 
                user.getName(), 
                Long.valueOf(savedOrder.getId()), // Convertimos ID a Long si es necesario
                htmlReceipt
            );
        } catch (Exception e) {
            System.err.println("Advertencia: No se pudo enviar el correo de confirmación: " + e.getMessage());
        }

        // 9. ----- RETORNAR DTO -----
        return orderMapper.toDto(savedOrder);
    }

    /**
     * Obtiene el historial de compras de un usuario.
     */
    public List<OrderResponse> getMyOrders(String userEmail) {

        // ---- Recuperamos el usuario ----
        LoginEntity login = loginRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        UserEntity user = login.getUser();
        if (user == null) {
            throw new BadRequestException("Perfil de usuario no configurado");
        }

        // ---- Buscamos sus pedidos ----
        List<OrderEntity> orders = orderRepository.findByUserId(user.getId());

        // ---- Convertimos a DTO ----
        return orders.stream()
                .map(orderMapper::toDto)
                .toList();
    }
    
    /**
     * Obtiene todas las ventas (Para panel Admin).
     */
    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(orderMapper::toDto)
                .toList();
    }

}