package com.bata.backend.modules.cart.entities;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.bata.backend.modules.product.entities.ProductEntity;
import com.bata.backend.modules.product.entities.ProductVariantEntity;
import com.bata.backend.modules.user.entities.UserEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "carts")
@Getter 
@Setter 
public class CartEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserEntity user;

    // Relación Bidireccional: Si se borra  el carrito, se borran los items
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItemEntity> items = new ArrayList<>();

    private LocalDateTime updatedAt;
    
    @PrePersist @PreUpdate
    public void updateTimestamp() {
        this.updatedAt = LocalDateTime.now();
    }

    
 // Método helper para calcular total dinámicamente
    public BigDecimal getTotal() {
        if (items == null || items.isEmpty()) {
            return BigDecimal.ZERO;
        }

        return items.stream()
            .map(item -> {
                ProductVariantEntity variant = item.getVariant();
                ProductEntity product = variant.getProduct();

                BigDecimal finalPrice = product.getBasePrice();

                if (variant.getPriceModifier() != null) {
                    finalPrice = finalPrice.add(variant.getPriceModifier());
                }

                return finalPrice.multiply(BigDecimal.valueOf(item.getQuantity()));
            })
            .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
