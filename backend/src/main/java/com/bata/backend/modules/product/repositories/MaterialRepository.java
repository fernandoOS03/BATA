package com.bata.backend.modules.product.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bata.backend.modules.product.entities.MaterialEntity;

@Repository
public interface MaterialRepository extends JpaRepository<MaterialEntity, Integer>{

}
