package com.bata.backend.modules.cart.controllers;

import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bata.backend.modules.cart.dto.request.AddCartRequest;
import com.bata.backend.modules.cart.dto.response.CartResponse;
import com.bata.backend.modules.cart.services.CartServices;

import io.swagger.v3.oas.annotations.Parameter;

@RestController
@RequestMapping("/api/cart")
public class CartController {
	private final CartServices cartServices;

    public CartController(CartServices cartServices) {
        this.cartServices = cartServices;
    }

    @PostMapping("/items")
    public ResponseEntity<CartResponse> addItem(
            @RequestBody AddCartRequest request, 
            @Parameter(hidden = true) Principal principal 
    ) {
        return ResponseEntity.ok(cartServices.addItemToCart(principal.getName(), request));
    }

    @GetMapping
    public ResponseEntity<CartResponse> getMyCart(@Parameter(hidden = true) Principal principal) {
        return ResponseEntity.ok(cartServices.getMyCart(principal.getName()));
    }
    
    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<CartResponse> removeItem(@PathVariable Long itemId, Principal principal) {
        return ResponseEntity.ok(cartServices.removeItemFromCart(principal.getName(), itemId));
    }

    @DeleteMapping
    public ResponseEntity<Void> clearCart(Principal principal) {
        cartServices.clearCart(principal.getName());
        return ResponseEntity.noContent().build();
    }

}
