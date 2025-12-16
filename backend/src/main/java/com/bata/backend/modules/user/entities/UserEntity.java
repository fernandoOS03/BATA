package com.bata.backend.modules.user.entities;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.*;

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
    private String name;
    
    @Column(name = "last_name")
    private String lastName;
    
    @Column(name = "dni")
    private String dni;
    
    @Column(name = "birthday")
    private LocalDate birthday;
    
    // Agregado cascade = CascadeType.ALL para evitar errores al guardar direcciones
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL) 
    private List<AddressEntity> address;
    
    // 'cascade = CascadeType.ALL' permite guardar el Login automáticamente cuando guardas el User
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "login_id")
    private LoginEntity login;

}