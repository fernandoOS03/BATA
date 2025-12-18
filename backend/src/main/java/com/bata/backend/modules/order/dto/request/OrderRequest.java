package com.bata.backend.modules.order.dto.request;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record OrderRequest(
		@NotNull(message = "La dirección de envío es obligatoria") 
		@JsonProperty("addressId")
		Integer addressId, 
																											// direcció																											// usuari
		@NotNull(message = "El método de pago es obligatorio") 
		@JsonProperty("paymentMethod")
		String paymentMethod, 

		@NotEmpty(message = "El carrito no puede estar vacío") 
		@JsonProperty("items")
		List<OrderItemRequest> items 
		
		
) {
}
