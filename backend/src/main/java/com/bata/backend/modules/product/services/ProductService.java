package com.bata.backend.modules.product.services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.bata.backend.exceptions.ResourceNotFoundException;
import com.bata.backend.modules.product.dto.request.ProductRequest;
import com.bata.backend.modules.product.dto.response.ProductResponse;
import com.bata.backend.modules.product.entities.BrandEntity;
import com.bata.backend.modules.product.entities.CategoryEntity;
import com.bata.backend.modules.product.entities.ColorEntity;
import com.bata.backend.modules.product.entities.MaterialEntity;
import com.bata.backend.modules.product.entities.ProductEntity;
import com.bata.backend.modules.product.entities.ProductVariantEntity;
import com.bata.backend.modules.product.entities.SizeEntity;
import com.bata.backend.modules.product.mapper.ProductMapper;
import com.bata.backend.modules.product.repositories.BrandRepository;
import com.bata.backend.modules.product.repositories.CategoryRepository;
import com.bata.backend.modules.product.repositories.ColorRepository;
import com.bata.backend.modules.product.repositories.MaterialRepository;
import com.bata.backend.modules.product.repositories.ProductRepository;
import com.bata.backend.modules.product.repositories.SizeRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final BrandRepository brandRepository;
    private final CategoryRepository categoryRepository;
    private final MaterialRepository materialRepository;
    private final ColorRepository colorRepository;
    private final SizeRepository sizeRepository;

    private final ProductMapper productMapper;

    // =============================================================
    // METODO PARA LISTAR TODOS (SOLO LOS ACTIVOS)
    // =============================================================
    public List<ProductResponse> getAllProducts() {
        return productRepository.findByActiveTrue().stream()
                .map(productMapper::toDto)
                .collect(Collectors.toList());

    }
    
    // =============================================================
    // METODO PARA OBTENER POR ID
    // =============================================================
    public ProductResponse getProductById(Integer id) {
        ProductEntity product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con ID: " + id));
        
        return productMapper.toDto(product);
    }

    // =============================================================
    // METODO PARA CREAR (Versión Limpia)
    // =============================================================
    @Transactional 
    public ProductResponse createProduct(ProductRequest request) {
        ProductEntity product = productMapper.toEntity(request);
        
        // Aseguramos que nazca activo (Soft Delete)
        product.setActive(true); 
        
        // Usamos el método ayudante para no repetir código
        assignRelationships(product, request);

        List<ProductVariantEntity> variantsList = new ArrayList<>();
        for (ProductRequest.ProductVariantRequest variantReq : request.variants()) {
            // Usamos el método ayudante para crear cada variante
            variantsList.add(createVariantEntity(variantReq, product));
        }
        product.setProductsVariants(variantsList);

        ProductEntity savedProduct = productRepository.save(product);
        return productMapper.toDto(savedProduct);
    }

    // =============================================================
    // METODO PARA ACTUALIZAR
    // =============================================================
    @Transactional
    public ProductResponse updateProduct(Integer id, ProductRequest request) {
        ProductEntity product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con ID: " + id));

        // Actualizamos datos básicos
        product.setName(request.name());
        product.setDescription(request.description());
        product.setBasePrice(request.basePrice());

        // Reutilizamos la lógica de asignar relaciones
        assignRelationships(product, request);

        // Lógica de reemplazo de variantes
        if (product.getProductsVariants() != null) {
            product.getProductsVariants().clear();
        } else {
            product.setProductsVariants(new ArrayList<>());
        }
        
        for (ProductRequest.ProductVariantRequest variantReq : request.variants()) {
            // Reutilizamos la lógica de crear variante
            product.getProductsVariants().add(createVariantEntity(variantReq, product));
        }

        ProductEntity updatedProduct = productRepository.save(product);
        return productMapper.toDto(updatedProduct);
    }

    // =============================================================
    // METODO PARA ELIMINAR (SOFT DELETE)
    // =============================================================
    public void deleteProduct(Integer id) {
        ProductEntity product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con ID: " + id));
        
        // Apagamos el producto en lugar de borrarlo
        product.setActive(false);
        productRepository.save(product);
    }

    // =============================================================
    // MÉTODOS PRIVADOS DE AYUDA (Para evitar repetir código)
    // =============================================================
    
    private void assignRelationships(ProductEntity product, ProductRequest request) {
        BrandEntity brand = brandRepository.findById(request.brandId())
                .orElseThrow(() -> new ResourceNotFoundException("Marca no encontrada ID: " + request.brandId()));
        CategoryEntity category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada ID: " + request.categoryId()));
        MaterialEntity material = materialRepository.findById(request.materialId())
                .orElseThrow(() -> new ResourceNotFoundException("Material no encontrado ID: " + request.materialId()));

        product.setBrand(brand);
        product.setCategory(category);
        product.setMaterial(material);
    }

    private ProductVariantEntity createVariantEntity(ProductRequest.ProductVariantRequest variantReq, ProductEntity parentProduct) {
        ProductVariantEntity variantEntity = new ProductVariantEntity();
        
        variantEntity.setStock(variantReq.stock());
        variantEntity.setPriceModifier(variantReq.priceModifier());
        // Asegúrate de usar el nombre correcto según tu Request (imagenUrl o imageUrl)
        variantEntity.setImagenUrl(variantReq.imagenUrl()); 

        ColorEntity color = colorRepository.findById(variantReq.colorId())
                .orElseThrow(() -> new ResourceNotFoundException("Color no encontrado ID: " + variantReq.colorId()));
        SizeEntity size = sizeRepository.findById(variantReq.sizeId())
                .orElseThrow(() -> new ResourceNotFoundException("Talla no encontrada ID: " + variantReq.sizeId()));

        variantEntity.setColor(color);
        variantEntity.setSize(size);
        variantEntity.setProduct(parentProduct);

        return variantEntity;
    }
}