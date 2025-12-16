package com.bata.backend.modules.product.dto.request;

import java.math.BigDecimal;
import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record ProductRequest(
		@NotBlank(message = "El nombre del producto es obligatorio") 
		String name,

		String description,

		@NotNull(message = "El precio base es obligatorio") 
		@Positive(message = "El precio debe ser mayor a 0") 
		BigDecimal basePrice,

		@NotNull(message = "La marca es obligatoria") 
		Integer brandId,

		@NotNull(message = "La categoría es obligatoria") 
		Integer categoryId,

		@NotNull(message = "El material es obligatorio") 
		Integer materialId,

		List<ProductVariantRequest> variants) {

	public record ProductVariantRequest(@NotNull(message = "El color es obligatorio") Integer colorId,

			@NotNull(message = "La talla es obligatoria") 
			Integer sizeId,

			@NotNull(message = "El stock es obligatorio") 
			@Positive(message = "El stock debe ser positivo") 
			Integer stock,

			String imageUrl,

			BigDecimal priceModifier
			) {}
}
