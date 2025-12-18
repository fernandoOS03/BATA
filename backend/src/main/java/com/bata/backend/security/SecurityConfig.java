package com.bata.backend.security;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.bata.backend.security.jwt.JwtAuthenticationFilter;

import lombok.RequiredArgsConstructor;

/*
 * Cierra todas las puertas excepto login/registro.
 * Se agrega un filtro a trabajar*/

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	private final JwtAuthenticationFilter jwtAuthFilter; // Inyectar Filtro
	private final AuthenticationProvider authenticationProvider; // Inyectar Provider

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable())
				.authorizeHttpRequests(
						auth -> auth.requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html")
								.permitAll().requestMatchers("/api/users/register", "/api/users/login").permitAll()
								.requestMatchers(org.springframework.http.HttpMethod.GET, "/api//pruducts").permitAll()
								.requestMatchers(org.springframework.http.HttpMethod.POST, "/api/products")
								.hasRole("ADMIN").requestMatchers("/api/orders/**").authenticated() // solo usuaris
																									// autenticados
																									// pueden comprar
								.anyRequest().authenticated() // ¡Todo lo demás cerrado!
				)
				// IMPORTANTE: Gestión de sesión STATELESS (Sin estado)
				.sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authenticationProvider(authenticationProvider)
				.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class); // <--- AQUÍ SE AGREGA EL
																								// FILTRO

		return http.build();
	}

	//------ PARA LOS CORS ------
	@Bean
	public CorsConfigurationSource configurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();

		configuration.setAllowedOrigins(List.of("http://localhost:3000"));
		configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
		configuration.setAllowCredentials(true);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	};

}
