package com.bata.backend.modules.product.dto.response;

import java.math.BigDecimal;
import java.util.List;

public record ProductResponse(
		Integer id,
	    String name,
	    String description,
	    BigDecimal basePrice,
	    
	    Integer brandId,
        Integer categoryId,
        Integer materialId,
	    
	    String brand,   
	    String category, 
	    String material,
	    String gender,
	    List<ProductVariantResponse> variants) {
		public record ProductVariantResponse(
		        Integer id,
		        
		        Integer colorId,
	            Integer sizeId,
	            
		        String color, 
		        String size,  
		        Integer stock,
		        String imagenUrl,
		        
	            BigDecimal priceModifier, 

		        BigDecimal finalPrice 
		    ) {}
}



/* 
 * ===== MUESTRA DE COMO ENVIARA EL FRONTEND =====
 * {
  "name": "Zapatilla Urbana X",
  "basePrice": 150.00,
  "brandId": 1,
  "categoryId": 2,
  "materialId": 1,
  "variants": [
    {
      "colorId": 1, 
      "sizeId": 3, 
      "stock": 10,
      "imageUrl": "foto_roja.jpg"
    },
    {
      "colorId": 2, 
      "sizeId": 3, 
      "stock": 5,
      "imageUrl": "foto_azul.jpg"
    }
  ]
}
 * */
 