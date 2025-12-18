package com.bata.backend.modules.order.services;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.bata.backend.modules.order.dto.request.OrderRequest;
import com.bata.backend.modules.order.dto.request.OrderItemRequest;
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
import com.bata.backend.modules.user.repositories.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {
	private final OrderRepository orderRepository;
	private final ProductVariantRepository productVariantRepository;
	private final AddressRepository addressRepository;
	private final PaymentRepository paymentRepository;
	private final LoginRepository loginRepository;
	private final OrderMapper orderMapper;

	@Transactional // si algo falla, se cancela todo
	public OrderResponse createOrder(OrderRequest request, String userEmail) {

		// ----- Buscamos quien comprara -----
		LoginEntity login = loginRepository.findByEmail(userEmail)
				.orElseThrow(() -> new RuntimeException("Usuario/Login no encontrado con email: " + userEmail));
		UserEntity user = login.getUser();

		// ----- Buscamos la dirección -----
		AddressEntity address = addressRepository.findById(request.addressId())
				.orElseThrow(() -> new RuntimeException("Dirección no encontrada"));

		// ----- Iniciamos la orden -----
		OrderEntity order = new OrderEntity();
		order.setUser(user);
		order.setUser(user);
		order.setAddress(address);
		order.setDate(LocalDateTime.now());
		order.setStatus("PAID"); // cambiar el estado, se esta asuminedod que esta pagado

		// ----- Procesar items y calcular totales

		List<OrderItemEntity> orderItems = new ArrayList<>();
		BigDecimal totalAmount = BigDecimal.ZERO;

		for (OrderItemRequest itemReq : request.items()) {

			// Primero buscamos la variante en la db
			ProductVariantEntity variant = productVariantRepository.findById(itemReq.variantId())
					.orElseThrow(() -> new RuntimeException("Producto no encontrado ID: " + itemReq.variantId()));

			// Continuamos validando stocko
			if (variant.getStock() < itemReq.quantity()) {
				throw new RuntimeException("Stock insuficiente para: " + variant.getProduct().getName());
			}

			// Continuamos actualizando inventario
			variant.setStock(variant.getStock() - itemReq.quantity());
			productVariantRepository.save(variant);

			// calculamos el precio base mas el modificador
			BigDecimal basePrice = variant.getProduct().getBasePrice();
			BigDecimal modifier = variant.getPriceModifier() != null ? variant.getPriceModifier() : BigDecimal.ZERO;
			BigDecimal realPrice = basePrice.add(modifier);

			// Ahora pasamos crear el item
			OrderItemEntity orderItem = new OrderItemEntity();
			orderItem.setVariant(variant);
			orderItem.setQuantity(itemReq.quantity());
			orderItem.setPrice(realPrice);
			orderItem.setOrder(order);

			orderItems.add(orderItem);

			// sumamos el precio total
			BigDecimal subTotal = realPrice.multiply(new BigDecimal(itemReq.quantity()));
			totalAmount = totalAmount.add(subTotal);
		}

		// Cerramos la orden
		order.setOrderItems(orderItems);
		order.setTotalAmount(totalAmount);

		// Guardamos la orden
		OrderEntity savedOrder = orderRepository.save(order);

		// 6. GENERAR PAGO (Simulado)
		PaymentEntity payment = new PaymentEntity();
		payment.setAmount(totalAmount);
		payment.setPaymentMethod(request.paymentMethod());
		payment.setStatus("COMPLETED");
		payment.setTransactionId(UUID.randomUUID().toString()); // ID falso de Visa
		payment.setOrder(savedOrder);

		paymentRepository.save(payment);

		// Actualizamos la orden con el pago para devolverla completa
		savedOrder.setPayment(payment);

		return orderMapper.toDto(savedOrder);
	}

	public List<OrderResponse> getMyOrders(String userEmail) {

		// ---- Recuperamos el usuario ----
		LoginEntity login = loginRepository.findByEmail(userEmail)
				.orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

		UserEntity user = login.getUser();
		if (user == null)
			throw new RuntimeException("Perfil de usuario no configurado");

		// ----Buscamos sus pedidos ----
		List<OrderEntity> orders = orderRepository.findByUserId(user.getId());

		// Tenemos que convertir la lista de entidades a dto usando mapper
		return orders.stream()
				.map(orderMapper::toDto)
				.toList();

	}

}
