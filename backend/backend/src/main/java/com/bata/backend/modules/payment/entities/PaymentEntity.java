package com.bata.backend.modules.payment.entities;


import com.bata.backend.modules.order.entities.OrderEntity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "payments")
public class PaymentEntity {
	@Id
	@Column(name="id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
		
	@Column(name="transaction_id")
	private String transactionId;

	@Column(name="amount")
	private String amount;
	
	@Column(name="payment_method")
	private String paymentMethod;
	
	@Column(name="status")
	private String status;
	
	//====== Relacación con Order ====== 
	 @OneToOne
	 @JoinColumn(name = "order_id")
	 private OrderEntity order;
	
}
