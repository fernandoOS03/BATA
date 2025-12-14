package com.bata.backend.modules.product.repositories;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.bata.backend.modules.product.entities.BrandEntity;

@Repository
public interface BrandRepository extends JpaRepository<BrandEntity, Integer> {

}
