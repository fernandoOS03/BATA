package com.bata.backend.modules.product.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bata.backend.modules.product.entities.ProductVariantEntity;

@Repository
public interface ProductVariantRepository extends JpaRepository<ProductVariantEntity, Integer>{
	
}
