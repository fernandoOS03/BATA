package com.bata.backend.shared.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bata.backend.modules.product.entities.BrandEntity;
import com.bata.backend.modules.product.entities.CategoryEntity;
import com.bata.backend.modules.product.entities.ColorEntity;
import com.bata.backend.modules.product.entities.MaterialEntity;
import com.bata.backend.modules.product.entities.SizeEntity;
import com.bata.backend.modules.product.repositories.BrandRepository;
import com.bata.backend.modules.product.repositories.CategoryRepository;
import com.bata.backend.modules.product.repositories.ColorRepository;
import com.bata.backend.modules.product.repositories.MaterialRepository;
import com.bata.backend.modules.product.repositories.SizeRepository;
import com.bata.backend.modules.user.controllers.UserController;
import com.bata.backend.shared.dto.request.CatalogRequest;
import com.bata.backend.shared.dto.response.CatalogResponse;

import org.springframework.web.bind.annotation.RequestBody;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/catalogs")
public class CatalogController {

    private final UserController userController;
    private final BrandRepository brandRepository;
    private final CategoryRepository categoryRepository;
    private final MaterialRepository materialRepository;
    private final ColorRepository colorRepository;
    private final SizeRepository sizeRepository;

    // =================================================================
    // 1. ENDPOINTS GET (LEER LISTAS)
    // =================================================================

    @GetMapping("/brands")
    public ResponseEntity<List<CatalogResponse>> getAllBrands() {
        var list = brandRepository.findAll().stream()
                .map(item -> new CatalogResponse(item.getId(), item.getName()))
                .toList();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<CatalogResponse>> getAllCategories() {
        var list = categoryRepository.findAll().stream()
                .map(item -> new CatalogResponse(item.getId(), item.getName()))
                .toList();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/materials")
    public ResponseEntity<List<CatalogResponse>> getAllMaterials() {
        var list = materialRepository.findAll().stream()
                .map(item -> new CatalogResponse(item.getId(), item.getName()))
                .toList();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/colors")
    public ResponseEntity<List<CatalogResponse>> getAllColors() {
        var list = colorRepository.findAll().stream()
                .map(item -> new CatalogResponse(item.getId(), item.getName()))
                .toList();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/sizes")
    public ResponseEntity<List<CatalogResponse>> getAllSizes() {
        var list = sizeRepository.findAll().stream()
                .map(item -> new CatalogResponse(item.getId(), item.getName()))
                .toList();
        return ResponseEntity.ok(list);
    }

    // =================================================================
    // 1. ENDPOINTS POST (CREAR NUEVOS)
    // =================================================================

    @PostMapping("/brands")
    public ResponseEntity<CatalogResponse> createBrand(@RequestBody CatalogRequest request) {
        BrandEntity entity = new BrandEntity();
        entity.setName(request.name());
        BrandEntity saved = brandRepository.save(entity);
        return ResponseEntity.ok(new CatalogResponse(saved.getId(), saved.getName()));
    }

    @PostMapping("/categories")
    public ResponseEntity<CatalogResponse> createCategory(@RequestBody CatalogRequest request) {
        CategoryEntity entity = new CategoryEntity();
        entity.setName(request.name());
        CategoryEntity saved = categoryRepository.save(entity);
        return ResponseEntity.ok(new CatalogResponse(saved.getId(), saved.getName()));
    }

    @PostMapping("/materials")
    public ResponseEntity<CatalogResponse> createMaterial(@RequestBody CatalogRequest request) {
        MaterialEntity entity = new MaterialEntity();
        entity.setName(request.name());
        MaterialEntity saved = materialRepository.save(entity);
        return ResponseEntity.ok(new CatalogResponse(saved.getId(), saved.getName()));
    }

    @PostMapping("/colors")
    public ResponseEntity<CatalogResponse> createColor(@RequestBody CatalogRequest request) {
        ColorEntity entity = new ColorEntity();
        entity.setName(request.name());
        ColorEntity saved = colorRepository.save(entity);
        return ResponseEntity.ok(new CatalogResponse(saved.getId(), saved.getName()));
    }

    @PostMapping("/sizes")
    public ResponseEntity<CatalogResponse> createSize(@RequestBody CatalogRequest request) {
        SizeEntity entity = new SizeEntity();
        entity.setName(request.name());
        SizeEntity saved = sizeRepository.save(entity);
        return ResponseEntity.ok(new CatalogResponse(saved.getId(), saved.getName()));
    }

}
