package com.bata.backend.modules.product.entities;

import java.math.BigDecimal;
import java.util.List;

import com.bata.backend.modules.product.entities.enums.Gender;

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
		
	@Column(name = "active")
	private Boolean active = true;
	
	@Enumerated(EnumType.STRING)
	@Column (name = "gender")
	private Gender gender;
	
	//====== Relacación con ProductVariant ====== 
	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
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
