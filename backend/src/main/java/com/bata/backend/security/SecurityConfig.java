package com.bata.backend.security;

import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
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

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 1. Configuración de CORS y CSRF
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            
            // 2. Reglas de Autorización
            .authorizeHttpRequests(auth -> auth
                // PERMITIR OPTIONS: Esto elimina el error "CORS Missing Allow Origin" en el preflight
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                
                // RUTAS PÚBLICAS (Swagger y Auth)
                .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()
                .requestMatchers("/api/users/register", "/api/users/login").permitAll()
                
                // PRODUCTOS: GET es público para la Landing Page
                .requestMatchers(HttpMethod.GET, "/api/products/**").permitAll()
                
                // RUTAS PROTEGIDAS
                .requestMatchers(HttpMethod.POST, "/api/products/**").hasRole("ADMIN")
                .requestMatchers("/api/media/upload").hasRole("ADMIN")
                .requestMatchers("/api/orders/**").authenticated()
                
                // CUALQUIER OTRA RUTA
                .anyRequest().authenticated()
            ) // <-- Aquí cierra correctamente el bloque auth
            
            // 3. Stateless Session
            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authenticationProvider(authenticationProvider)
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Orígenes permitidos (Añadí el puerto 5174 por si Vite cambió de puerto)
        configuration.setAllowedOrigins(List.of("http://localhost:5173", "http://localhost:5174", "http://localhost:3000"));
        
        // Métodos permitidos
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        
        // Headers: Permitimos "*" para que Axios no tenga conflictos
        configuration.setAllowedHeaders(List.of("*"));
        
        // Exponer Authorization para que React pueda leer el Token
        configuration.setExposedHeaders(List.of("Authorization"));
        
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}