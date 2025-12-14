package com.bata.backend.modules.product.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bata.backend.modules.product.entities.SizeEntity;

@Repository
public interface SizeRepository extends JpaRepository<SizeEntity, Integer>{

}
