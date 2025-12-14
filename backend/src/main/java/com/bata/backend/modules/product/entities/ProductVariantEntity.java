package com.bata.backend.modules.product.entities;


import java.math.BigDecimal;
import java.util.List;

import com.bata.backend.modules.order.entities.OrderItemEntity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name ="products_variants")
public class ProductVariantEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
		
	@Column(name = "stock")
	private Integer stock;
	
	@Column(name = "price_modifier")
	private BigDecimal priceModifier;
	
	//====== Relacación con Product ====== 
	@ManyToOne
	@JoinColumn(name = "product_id")
	private ProductEntity product;
	
	//====== Relacaciones con tablas hijas ====== 
	@ManyToOne
	@JoinColumn(name = "color_id")
	private ColorEntity color;
	
	@ManyToOne
	@JoinColumn(name = "size_id")
	private SizeEntity size;
	
	//====== Relacación con OrderItems ====== 
	@OneToMany(mappedBy = "variant")
	List<OrderItemEntity> orderItems;	

	
	

	
}
