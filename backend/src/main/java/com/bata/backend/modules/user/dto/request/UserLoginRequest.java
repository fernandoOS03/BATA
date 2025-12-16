package com.bata.backend.modules.user.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserLoginRequest(
	    @NotBlank(message = "El email es obligatorio")
	    @Email(message = "Email inválido")
	    String email,

	    @NotBlank(message = "La contraseña es obligatoria")
	    String password
	) {}
