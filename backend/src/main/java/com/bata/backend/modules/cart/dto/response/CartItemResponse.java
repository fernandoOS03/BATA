package com.bata.backend.modules.cart.dto.response;

import java.math.BigDecimal;

public record CartItemResponse(
		Long id,
	    Long productId,
	    String productName,
	    String imageUrl,
	    String color,
	    String size,
	    BigDecimal price,
	    Integer quantity,
	    BigDecimal subtotal,
	    Integer maxStock // Útil para limitar el contador en el frontend
		) {}
