package com.bata.backend.config;

import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;

@Configuration
@OpenAPIDefinition(
		info = @Info(
			title = "Bata backend API", 
			version = "1.0", 
			description = "Documentación oficial de la API de Bata"
		), 
		security = @SecurityRequirement(name = "bearerAuth") //aplica seguridad globalmente
		)
@SecurityScheme(
		name = "bearerAuth",
		description = "JWT de autenticación",
		scheme = "bearer", //tipo dee esquema 
		type = SecuritySchemeType.HTTP, 
		bearerFormat = "JWT", //formato del token
		in = SecuritySchemeIn.HEADER) // donde se envia

public class OpenApiConfig {

}
