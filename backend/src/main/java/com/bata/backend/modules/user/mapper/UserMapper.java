package com.bata.backend.modules.user.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import com.bata.backend.modules.user.dto.request.UserRegisterRequest;
import com.bata.backend.modules.user.dto.response.UserResponse;
import com.bata.backend.modules.user.entities.UserEntity;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING) //genera la implementación de la interfaz automaticamente
public interface UserMapper {

	// 1. DE REQUEST (Record) A ENTITY (Clase)
	@Mapping(target = "id", ignore = true)
	@Mapping(target = "login", ignore = true)
	@Mapping(target = "address", ignore = true)
	UserEntity toEntity(UserRegisterRequest request); // esto lo que hace es evitar llena campos que no existen 

	// 2. DE ENTITY (Clase) A RESPONSE DTO (Record)
	@Mapping(source = "login.email", target = "email")
	@Mapping(source = "login.role", target = "role")
	UserResponse toDto(UserEntity entity);
}