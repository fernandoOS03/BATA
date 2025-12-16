package com.bata.backend.modules.user.dto.request;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UserRegisterRequest(
		@NotBlank(message = "El nombre es obligatorio") 
		String name,

		@NotBlank(message = "El apellido es obligatorio") 
		String lastName,

		@NotBlank(message = "El DNI es obligatorio") 
		String dni,

		@Email(message = "Debe ser un correo válido") 
		@NotBlank(message = "El email es obligatorio") 
		String email,
		
		@NotNull(message = "La fecha de nacimiento es obligatoria")
	    LocalDate birthday,

		@NotBlank(message = "La contraseña es obligatoria")
		@Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
		String password
) {}
