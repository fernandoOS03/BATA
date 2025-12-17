package com.bata.backend.modules.order.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import com.bata.backend.modules.order.dto.request.OrderRequest;
import com.bata.backend.modules.order.dto.response.OrderResponse;
import com.bata.backend.modules.order.entities.OrderEntity;
import com.bata.backend.modules.order.entities.OrderItemEntity;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface OrderMapper {
	
	// --- DE ENTITY A RESPONSE ---
    @Mapping(target = "paymentStatus", source = "payment.status") 
    @Mapping(target = "address", expression = "java(entity.getFullAddress())") 
    @Mapping(target = "items", source = "orderItems") 
    OrderResponse toDto(OrderEntity entity);
   
    // --- DE ITEM A ITEM-DTO --- 
    @Mapping(target = "productName", source = "variant.product.name")
    @Mapping(target = "variantDetails",expression = "java(item.getVariantDetails())")
    @Mapping(target = "subtotal", expression = "java(item.getSubtotal())")
    OrderResponse.OrderItemResponse toItemDto(OrderItemEntity item);
    
    // --- DE REQUEST A ENTITY ---
    //Se esta ignorando casi todo porque se llenara en el service con la lógica
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "date", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "totalAmount", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "address", ignore = true) 
    @Mapping(target = "payment", ignore = true)
    @Mapping(target = "orderItems", ignore = true) 
    OrderEntity toEntity (OrderRequest request);
}
