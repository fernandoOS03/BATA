package com.bata.backend.shared.services;

import java.io.IOException;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CloudinaryService {
	private final Cloudinary cloudinary;

	public String uploadFile(MultipartFile file) {
		try {
			// Subimos el archivo a Cloudinary
			Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
			// Retornamos la URL segura (https)
			return uploadResult.get("secure_url").toString();
		} catch (IOException e) {
			throw new RuntimeException("Error al subir imagen a Cloudinary", e);
		}
	}

}
