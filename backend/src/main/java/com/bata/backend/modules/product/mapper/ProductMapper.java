package com.bata.backend.modules.product.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import com.bata.backend.modules.product.dto.request.ProductRequest;
import com.bata.backend.modules.product.dto.response.ProductResponse;
import com.bata.backend.modules.product.entities.ProductEntity;
import com.bata.backend.modules.product.entities.ProductVariantEntity;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)

public interface ProductMapper {
	// ==========================================================
    // DE ENTITY A RESPONSE (SALIDA VISUAL)
    // ==========================================================
	
	//Navegamos por las relaciones, sacamos los nombres de cada entidad y mapea el listado de  variantes
	@Mapping(target = "brand", source = "brand.name")
	@Mapping(target = "category", source = "category.name") 
    @Mapping(target = "material", source = "material.name") 
    @Mapping(target = "variants", source = "productsVariants")
	ProductResponse toDto(ProductEntity entity);
	
	@Mapping(target = "color", source = "color.name")
    @Mapping(target = "size", source = "size.name")
    ProductResponse.ProductVariantResponse toVariantDto(ProductVariantEntity variant);
	
	// ==========================================================
    // DE REQUEST A ENTITY (ENTRADA PARA GUARDAR)
    // ==========================================================
	@Mapping(target = "id", ignore = true)
    @Mapping(target = "brand", ignore = true)      
    @Mapping(target = "category", ignore = true)   
    @Mapping(target = "material", ignore = true)  
    @Mapping(target = "productsVariants", ignore = true) 
    ProductEntity toEntity(ProductRequest request);

}
