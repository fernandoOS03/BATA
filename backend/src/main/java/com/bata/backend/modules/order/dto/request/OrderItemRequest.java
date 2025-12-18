package com.bata.backend.modules.order.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotNull;

public record OrderItemRequest(
		@JsonProperty("variantId")
		@NotNull 
		Integer variantId, 
		
		@JsonProperty("quantity")
		@NotNull Integer quantity) {

}
