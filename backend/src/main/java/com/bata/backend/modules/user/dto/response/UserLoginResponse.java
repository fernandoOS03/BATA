package com.bata.backend.modules.user.dto.response;

public record UserLoginResponse(
		String token, 
		UserResponse user 
		
) {}
