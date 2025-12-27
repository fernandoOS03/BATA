package com.bata.backend.modules.cart.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record AddCartRequest(
		@NotNull(message = "El ID de la variante es obligatorio")
	    Long variantId, // Usamos el ID de la variante exacta (Talla/Color ya definidos)
	    
	    @Positive(message = "La cantidad debe ser mayor a 0")
	    Integer quantity
		
		) {}
