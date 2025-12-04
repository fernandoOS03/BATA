package com.bata.backend.modules.order.entities;


import com.bata.backend.modules.product.entities.ProductVariantEntity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "order_items")
public class OrderItemEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "quantity")
	private Integer quantity;
	
	//====== Relacación con Order ====== 
	@ManyToOne
	@JoinColumn(name = "order_id")
	private OrderEntity order;
	
	//====== Relacación con ProductoVariant ====== 
	@ManyToOne
	@JoinColumn(name = "product_variant_id")
	private ProductVariantEntity variant;
	
}
