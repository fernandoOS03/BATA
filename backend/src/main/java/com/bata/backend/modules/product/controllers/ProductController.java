package com.bata.backend.modules.product.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bata.backend.modules.product.dto.request.ProductRequest;
import com.bata.backend.modules.product.dto.response.ProductResponse;
import com.bata.backend.modules.product.services.ProductService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
	private final ProductService productService;
	
	// ==========================================================
	//1. ENDPOINT PÚBLICO : Para ver el catálogo
	// ==========================================================
	@GetMapping
	public ResponseEntity<List<ProductResponse>> getAll(){
		 return ResponseEntity.ok(productService.getAllProducts());
	 }
	
	// ==========================================================
	//1. ENDPOINT PÚBLICO : Para ver un producto por su id
	// ==========================================================
	@GetMapping("/{id}")
	public ResponseEntity<ProductResponse> getById(@PathVariable Integer id){
		 return ResponseEntity.ok(productService.getProductById(id));
	 }
	
	
	// ==========================================================
	//1. ENDPOINT PRIVADO : Crear producto (solo admin)
	// ==========================================================
	@PostMapping
	public ResponseEntity<ProductResponse> create(@Valid @RequestBody ProductRequest request){
		return ResponseEntity.ok(productService.createProduct(request));
	}
}
