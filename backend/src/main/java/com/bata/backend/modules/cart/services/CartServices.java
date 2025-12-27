package com.bata.backend.modules.cart.services;

import com.bata.backend.exceptions.ResourceNotFoundException;
import com.bata.backend.modules.cart.dto.request.AddCartRequest;
import com.bata.backend.modules.cart.dto.response.CartItemResponse;
import com.bata.backend.modules.cart.dto.response.CartResponse;
import com.bata.backend.modules.cart.entities.CartEntity;
import com.bata.backend.modules.cart.entities.CartItemEntity;
import com.bata.backend.modules.cart.repositories.CartRepository;
import com.bata.backend.modules.product.entities.ProductEntity;
import com.bata.backend.modules.product.entities.ProductVariantEntity;
import com.bata.backend.modules.product.repositories.ProductVariantRepository;
import com.bata.backend.modules.user.entities.UserEntity;
import com.bata.backend.modules.user.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartServices {

    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductVariantRepository variantRepository;

    @Transactional
    public CartResponse addItemToCart(String email, AddCartRequest request) {
        // 1. Buscamos al usuario por su email (extraído del Token JWT)
        UserEntity user = userRepository.findByLoginEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con email: " + email));

        // 2. Buscamos el carrito o creamos uno nuevo si no existe
        CartEntity cart = cartRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    CartEntity newCart = new CartEntity();
                    newCart.setUser(user);
                    newCart.setItems(new ArrayList<>());
                    return cartRepository.save(newCart);
                });

        // 3. Buscar la variante del producto solicitada
        ProductVariantEntity variant = variantRepository.findById(request.variantId().intValue())
                .orElseThrow(() -> new ResourceNotFoundException("Variante no encontrada" + request.variantId()));

        // 4. Validar disponibilidad de stock
        if (variant.getStock() < request.quantity()) {
            throw new ResourceNotFoundException("Stock insuficiente. Disponible: " + variant.getStock());
        }

        // 5. Lógica de actualización: si ya existe el producto, sumamos cantidad; si
        // no, creamos item
        CartItemEntity itemToSave = cart.getItems().stream()
                .filter(item -> item.getVariant().getId().equals(variant.getId()))
                .findFirst()
                .orElse(null);

        if (itemToSave != null) {
            itemToSave.setQuantity(itemToSave.getQuantity() + request.quantity());
        } else {
            CartItemEntity newItem = new CartItemEntity();
            newItem.setCart(cart);
            newItem.setVariant(variant);
            newItem.setQuantity(request.quantity());
            cart.getItems().add(newItem);
        }

        // 6. Sincronizar con la DB y devolver el DTO mapeado
        CartEntity savedCart = cartRepository.saveAndFlush(cart);
        return mapToResponse(savedCart);
    }

    @Transactional(readOnly = true)
    public CartResponse getMyCart(String email) {
        UserEntity user = userRepository.findByLoginEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        return cartRepository.findByUserId(user.getId())
                .map(this::mapToResponse)
                .orElseGet(() -> {
                    // Si no tiene carrito, devolvemos un objeto de respuesta vacío (Total 0)
                    return new CartResponse(null, List.of(), BigDecimal.ZERO, 0);
                });
    }

    @Transactional
    public CartResponse removeItemFromCart(String email, Long itemId) {
        // 1. Buscamos al usuario
        UserEntity user = userRepository.findByLoginEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        // 2. Buscamos el carrito del usuario
        CartEntity cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Carrito no encontrado"));

        // 3. Eliminamos el ítem de la lista (usando el ID del CartItem)
        // El orphanRemoval = true en la entidad CartEntity se encargará de borrarlo de
        // la DB
        cart.getItems().removeIf(item -> item.getId().equals(itemId));

        // 4. Guardamos los cambios y devolvemos la respuesta actualizada
        CartEntity savedCart = cartRepository.saveAndFlush(cart);
        return mapToResponse(savedCart);
    }

    @Transactional
    public void clearCart(String email) {
        // Buscamos al usuario y su carrito
        UserEntity user = userRepository.findByLoginEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        cartRepository.findByUserId(user.getId()).ifPresent(cart -> {
            cart.getItems().clear(); // Vaciamos la lista de ítems
            cartRepository.save(cart);
        });
    }

    private CartResponse mapToResponse(CartEntity cart) {
        List<CartItemResponse> items = cart.getItems().stream()
                .map(item -> new CartItemResponse(
                        item.getId(),
                        Long.valueOf(item.getVariant().getProduct().getId()),
                        item.getVariant().getProduct().getName(),
                        item.getVariant().getImagenUrl(),
                        item.getVariant().getColor().getName(),
                        item.getVariant().getSize().getName(),
                        item.getVariant().getProduct().getBasePrice(), // Precio
                        item.getQuantity(),
                        item.getVariant().getProduct().getBasePrice().multiply(BigDecimal.valueOf(item.getQuantity())), // Subtotal
                        item.getVariant().getStock()))
                .collect(Collectors.toList());

        return new CartResponse(
                cart.getId(),
                items,
                // Calcula el total aquí mismo
                items.stream().map(CartItemResponse::subtotal).reduce(BigDecimal.ZERO, BigDecimal::add),
                items.stream().mapToInt(CartItemResponse::quantity).sum());
    }

    private CartItemResponse mapItemToRecord(CartItemEntity item) {
        ProductVariantEntity v = item.getVariant();
        ProductEntity p = v.getProduct();

        // El precio unitario puede incluir modificadores de la variante
        BigDecimal unitPrice = p.getBasePrice();
        if (v.getPriceModifier() != null) {
            unitPrice = unitPrice.add(v.getPriceModifier());
        }

        return new CartItemResponse(
                item.getId(),
                Long.valueOf(p.getId()),
                p.getName(),
                v.getImagenUrl() != null ? v.getImagenUrl() : "default.png",
                (v.getColor() != null && v.getColor().getName() != null) ? v.getColor().getName() : "N/A",
                (v.getSize() != null && v.getSize().getName() != null) ? v.getSize().getName() : "N/A",
                unitPrice,
                item.getQuantity(),
                unitPrice.multiply(BigDecimal.valueOf(item.getQuantity())),
                v.getStock());
    }

}