package com.bata.backend.security.jwt;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

/*
 * Este archivo se encargara de intercepatar cda petición, buscar el token y validarlo  en mi jwtService, y si todo esta bien dejar pasar al usuario.
 * 
 * */

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService; // <--- OJO: Spring buscará esto

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        // 1. Validar que el header tenga el Token
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 2. Extraer el token (quitar "Bearer ")
        jwt = authHeader.substring(7);
        
        // 3. Extraer el email del token
        userEmail = jwtService.extractUsername(jwt);

        // 4. Si hay email y el usuario no está autenticado todavía...
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            
            // Cargar datos del usuario desde la DB
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);

            // 5. Validar token
            if (jwtService.isTokenValid(jwt, userDetails)) {
                // Crear la sesión de seguridad
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                
                // 6. ¡Pase usted! (Guardar usuario en el contexto)
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        
        // Continuar con la petición
        filterChain.doFilter(request, response);
    }
}