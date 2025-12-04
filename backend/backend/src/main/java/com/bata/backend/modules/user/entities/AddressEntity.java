package com.bata.backend.modules.user.entities;

import java.util.List;

import com.bata.backend.modules.order.entities.OrderEntity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "address")
public class AddressEntity {
	
	@Id
	@Column(name="id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
		
	@Column(name="street")
	private String street;

	@Column(name="district")
	private String district;
	
	@Column(name="city")
	private String city;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private UserEntity user;
	
	//====== Relacación con Order ====== 
	@OneToMany(mappedBy = "address")
	List<OrderEntity> orders;
}
