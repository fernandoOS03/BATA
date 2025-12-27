package com.bata.backend.modules.cart.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bata.backend.modules.cart.entities.CartEntity;

public interface CartRepository extends JpaRepository<CartEntity, Long>{
	Optional<CartEntity> findByUserId(Integer userId);
	}
