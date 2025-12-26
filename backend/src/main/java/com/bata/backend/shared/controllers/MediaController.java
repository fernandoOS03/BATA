package com.bata.backend.shared.controllers;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bata.backend.shared.services.CloudinaryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/media")
@RequiredArgsConstructor
public class MediaController {
	private final CloudinaryService cloudinaryService;
	
	@PostMapping("/upload")
	public ResponseEntity<Map<String, String>> upload(@RequestParam("file") MultipartFile file){
		String url = cloudinaryService.uploadFile(file);
		return ResponseEntity.ok(Map.of("url", url));
		
	}

}
