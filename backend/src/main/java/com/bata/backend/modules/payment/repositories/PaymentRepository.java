package com.bata.backend.modules.payment.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bata.backend.modules.payment.entities.PaymentEntity;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentEntity, Integer> {

}
