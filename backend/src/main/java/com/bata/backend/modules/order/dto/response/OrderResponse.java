package com.bata.backend.modules.order.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record OrderResponse(
		Integer  id,
		LocalDateTime date,
		String status,
	    BigDecimal totalAmount,
	    String address,     // Devolvemos la dirección en texto (Ej: "Av. Arequipa 123, Lima")
	    String paymentStatus,
	    List<OrderItemResponse> items
	
		) {
	
	public record OrderItemResponse(
			Integer id,
			String productName,   
	        String variantDetails, 
	        Integer quantity,
	        BigDecimal price,      
	        BigDecimal subtotal   
			) {}

}
