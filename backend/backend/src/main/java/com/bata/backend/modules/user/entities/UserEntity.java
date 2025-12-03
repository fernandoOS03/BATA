package com.bata.backend.modules.user.entities;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "users")
public class UserEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "name")
	private String  name;
	
	@Column(name = "last_name")
	private String lastName;
	
	@Column(name = "dni")
	private String dni;
	
	@Column(name = "birthday")
	private LocalDate birthday;
	
	@OneToMany(mappedBy = "user") //este valor coincide con la variable en AddressEntity
	List<AddressEntity> address;
	
	@OneToOne
	@JoinColumn(name = "login_id")
	private LoginEntity login;
	

}
