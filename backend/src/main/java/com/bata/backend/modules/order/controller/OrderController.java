package com.bata.backend.modules.order.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bata.backend.modules.order.services.OrderService;
import com.bata.backend.modules.order.dto.request.OrderRequest;
import com.bata.backend.modules.order.dto.response.OrderResponse;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.RequestBody;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
	private final OrderService orderService;

	@PostMapping
	public ResponseEntity<OrderResponse> create(@RequestBody @Valid OrderRequest request,
			Authentication authentication) {	
		String userEmail = authentication.getName();
		return ResponseEntity.ok(orderService.createOrder(request, userEmail));
	}
	
	@GetMapping("/my-orders")
	public ResponseEntity<List<OrderResponse>> getMyOrders (Authentication authentication){
		String userEmail = authentication.getName();
		return ResponseEntity.ok(orderService.getMyOrders(userEmail));
	}
	
	@GetMapping("/admin")
    public ResponseEntity<List<OrderResponse>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

}
