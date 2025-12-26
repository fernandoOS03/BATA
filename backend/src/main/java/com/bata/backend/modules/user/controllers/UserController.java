package com.bata.backend.modules.user.controllers;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bata.backend.modules.user.dto.request.UserLoginRequest;
import com.bata.backend.modules.user.dto.request.UserRegisterRequest;
import com.bata.backend.modules.user.dto.response.UserLoginResponse;
import com.bata.backend.modules.user.dto.response.UserResponse;
import com.bata.backend.modules.user.services.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

//http://localhost:8080/swagger-ui.html

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
	private final UserService userService;

	@PostMapping("/register")
	public ResponseEntity<UserResponse> register(@RequestBody @Valid UserRegisterRequest request) {
		return ResponseEntity.ok(userService.createUser(request));
	}

	@GetMapping
	public ResponseEntity<Page<UserResponse>> getAll(@PageableDefault(page = 0, size = 10) Pageable pageable) {
		return ResponseEntity.ok(userService.getAllUsers(pageable));
	}

	@PostMapping("/login")
	public ResponseEntity<UserLoginResponse> login(@RequestBody @Valid UserLoginRequest request) {
		return ResponseEntity.ok(userService.login(request));
	}

}
