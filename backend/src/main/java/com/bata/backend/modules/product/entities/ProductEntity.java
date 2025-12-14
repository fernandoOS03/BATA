package com.bata.backend.modules.product.entities;

import java.math.BigDecimal;
import java.util.List;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name ="products")
public class ProductEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "description")
	private String description;

	@Column(name = "base_price")
	private BigDecimal basePrice;
	
	//====== Relacación con ProductVariant ====== 
	@OneToMany(mappedBy = "product")
	List<ProductVariantEntity> productsVariants;
	
	//====== Relacaciones con tablas hijas ====== 
	@ManyToOne
	@JoinColumn(name = "material_id")
	private MaterialEntity material;
	
	@ManyToOne
	@JoinColumn(name = "category_id")
	private CategoryEntity category;
	
	@ManyToOne
	@JoinColumn(name = "brand_id")
	private BrandEntity brand;
	

	
	
	
}
