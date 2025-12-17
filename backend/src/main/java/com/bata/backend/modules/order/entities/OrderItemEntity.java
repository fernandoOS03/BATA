package com.bata.backend.modules.order.entities;

import java.math.BigDecimal;

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

	@Column(name = "price")
	private BigDecimal price;

	@Column(name = "quantity")
	private Integer quantity;

	// ====== Relacación con Order ======
	@ManyToOne
	@JoinColumn(name = "order_id")
	private OrderEntity order;

	// ====== Relacación con ProductoVariant ======
	@ManyToOne
	@JoinColumn(name = "product_variant_id")
	private ProductVariantEntity variant;

	
	// ==========================================================
	// MÉTODOS
	// ==========================================================
	public BigDecimal getSubtotal() {
		if (this.price == null || this.quantity == null) {
			return BigDecimal.ZERO;
		}
		return this.price.multiply(new BigDecimal(this.quantity));
	}
	
	public String getVariantDetails() {
		if (this.variant == null) return "Sin detalles";
        String colorName = (this.variant.getColor() != null) ? this.variant.getColor().getName() : "Sin color";
        String sizeName = (this.variant.getSize() != null) ? this.variant.getSize().getName() : "Sin talla";
        
        return colorName + " - Talla " + sizeName;
		
	}

}
