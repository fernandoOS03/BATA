package com.bata.backend.modules.user.services;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bata.backend.exceptions.BadRequestException;
import com.bata.backend.exceptions.ResourceNotFoundException;
import com.bata.backend.modules.product.entities.ProductEntity;
import com.bata.backend.modules.product.repositories.ProductRepository;
import com.bata.backend.modules.user.dto.request.UserLoginRequest;
import com.bata.backend.modules.user.dto.request.UserRegisterRequest;
import com.bata.backend.modules.user.dto.response.UserLoginResponse;
import com.bata.backend.modules.user.dto.response.UserResponse;
import com.bata.backend.modules.user.entities.LoginEntity;
import com.bata.backend.modules.user.entities.UserEntity;
import com.bata.backend.modules.user.mapper.UserMapper;
import com.bata.backend.modules.user.repositories.UserRepository;
import com.bata.backend.security.jwt.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;
	private final UserMapper userMapper;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;

	public Page<UserResponse> getAllUsers(Pageable pageable) {
		Page<UserEntity> usersPage = userRepository.findAll(pageable);
		return usersPage.map(userMapper::toDto);
	}

	public UserResponse createUser(UserRegisterRequest request) {

		// En este paso convertimos el request a entidad usando el mapper
		UserEntity userEntity = userMapper.toEntity(request);

		LoginEntity login = new LoginEntity();
		login.setEmail(request.email());
		login.setPassword(passwordEncoder.encode(request.password())); // encriptamos la contraseña
		login.setRole("USER"); // Por defecto aquí todos seran user

		// relacionamos los objetos de manera bidireccional
		userEntity.setLogin(login);
		login.setUser(userEntity);

		// guardamos en la base de datos
		UserEntity userSaved = userRepository.save(userEntity);

		return userMapper.toDto(userSaved);
	}

	public UserLoginResponse login(UserLoginRequest request) {
		// 1. Buscar el usuario por su email en la tabla LOGIN (usando stream para
		// filtrar rápido)
		// Nota: Lo ideal sería tener un método findByEmail en el repositorio, pero
		// usaremos esto por ahora
		LoginEntity loginEncontrado = userRepository.findAll().stream().map(UserEntity::getLogin) 
																																																	
				.filter(login -> login.getEmail().equals(request.email())).findFirst()
				.orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

		// 2. Verificar si la contraseña coincide (Raw vs Encriptada)
		if (!passwordEncoder.matches(request.password(), loginEncontrado.getPassword())) {
			throw new BadRequestException("Contraseña incorrecta");
		}

		// 3. Si todo sale bien, preparamos la respuesta
		UserResponse userDto = userMapper.toDto(loginEncontrado.getUser());

		HashMap<String, Object> extraData = new HashMap<>();
		extraData.put("role", loginEncontrado.getRole());
		extraData.put("userId", userDto.id());
		
		String token = jwtService.generateToken(loginEncontrado.getEmail(),extraData);

		return new UserLoginResponse(token, userDto);
	}

}
