package com.bata.backend.modules.order.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bata.backend.modules.order.entities.OrderEntity;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Integer>{
 
	//Para mostar los pedidos del usuario
	List<OrderEntity> findByUserId (Integer userId);
}
