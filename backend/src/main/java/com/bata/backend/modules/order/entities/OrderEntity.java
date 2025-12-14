package com.bata.backend.modules.order.entities;


import java.time.LocalDateTime;
import java.util.List;

import com.bata.backend.modules.payment.entities.PaymentEntity;
import com.bata.backend.modules.user.entities.AddressEntity;

import lombok.Data;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.NoArgsConstructor;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Data
@NoArgsConstructor
@Table(name = "orders")
public class OrderEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "date")
	private LocalDateTime date;
	
	@Column(name = "status")
	private String status;
	
	@Column(name = "total_amount")
	private Integer totalAmount;
	
	//====== Relacación con OrderItem ====== 
	@OneToMany(mappedBy = "order")
	List<OrderItemEntity> orderItems;
	
	
	//====== Relacación con Address ====== 
	 @ManyToOne
	 @JoinColumn(name ="address_id")
	 private AddressEntity address;
	
	 //====== Relacación con Payment ======
	 @OneToOne(mappedBy = "order")
	 private PaymentEntity payment;


}
