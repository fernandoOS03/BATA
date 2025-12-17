package com.bata.backend.modules.order.dto.request;

import java.util.List;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record OrderRequest(
		@NotNull(message = "La dirección de envío es obligatoria") 
		Integer addressId, 
																											// direcció																											// usuari
		@NotNull(message = "El método de pago es obligatorio") 
		String paymentMethod, 

		@NotEmpty(message = "El carrito no puede estar vacío") 
		List<OrderItemRequest> items 
) {
	public record OrderItemRequest(	
			@NotNull Integer variantId, 
			@NotNull Integer quantity) {
	}
}
