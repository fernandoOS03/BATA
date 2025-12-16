package com.bata.backend.security;

import com.bata.backend.modules.user.repositories.UserRepository;
import com.bata.backend.modules.user.entities.LoginEntity;
import com.bata.backend.modules.user.entities.UserEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.User;

import java.util.Collections;

/*
 * conecta la db con la seguridad*/

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    private final UserRepository userRepository;

    // ESTE BEAN ES EL TRADUCTOR:
    // Convierte tu LoginEntity en un UserDetails que Spring entiende
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            // Buscamos en TODOS los usuarios para encontrar el login
            // (Nota: Idealmente tendrías un LoginRepository, pero usaremos esto por ahora)
             LoginEntity login = userRepository.findAll().stream()
                .map(UserEntity::getLogin)
                .filter(l -> l.getEmail().equals(username))
                .findFirst()
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
             
             // Convertimos a objeto de seguridad de Spring
             return new User(
                 login.getEmail(),
                 login.getPassword(), // Ya está encriptada
                 Collections.emptyList() // Aquí irían los roles/autoridades
             );
        };
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}