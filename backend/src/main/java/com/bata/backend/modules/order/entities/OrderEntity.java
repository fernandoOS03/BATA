package com.bata.backend.modules.order.entities;


import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.bata.backend.modules.payment.entities.PaymentEntity;
import com.bata.backend.modules.user.entities.AddressEntity;
import com.bata.backend.modules.user.entities.UserEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

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
	private BigDecimal totalAmount;
	
	//====== Relacación con OrderItem ====== 
	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
	List<OrderItemEntity> orderItems;
	
	
	//====== Relacación con Address ====== 
	 @ManyToOne
	 @JoinColumn(name ="address_id")
	 private AddressEntity address;
	
	 //====== Relacación con Payment ======
	 @OneToOne(mappedBy = "order")
	 private PaymentEntity payment;
	 
	 //====== Relacación con Usuario ======
	 @ManyToOne
	 @JoinColumn(name = "user_id")
	 private UserEntity user;
	 
	// ==========================================================
	// MÉTODOS
	// ==========================================================	
	 public String getFullAddress() {
		 if (this.address == null) return "Sin dirección asignada";
	        return this.address.getStreet() + ", " + this.address.getCity();
	 }
	



}
