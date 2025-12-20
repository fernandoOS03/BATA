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
	// METODO PARA LISTAR TODOS (Para el catálogo público)
	// =============================================================
	public List<ProductResponse> getAllProducts() {
		return productRepository.findAll().stream().map(productMapper::toDto).collect(Collectors.toList());
	}
	
	// =============================================================
		// METODO PARA MOSTAR UN PRODUCTO POR SU ID
		// =============================================================
    public ProductResponse getProductById(Integer id) {
        ProductEntity product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con ID: " + id));
        
        return productMapper.toDto(product);
    }

	// =============================================================
	// METODO PARA CREAR UN PRODUCTO CON SUS ENTIDADES
	// =============================================================
	@Transactional // si algo falla no guarda nada(Rooback)
	public ProductResponse createProduct(ProductRequest request) {
		// PASO 1: Convertir el request a Entidad base
		ProductEntity product = productMapper.toEntity(request);

		// PASO 2: Buscar y asignar las relaciones "Padre" (Marca, Categoría, Material)
		// Si no existen, lanzamos error para avisar al admin.
		BrandEntity brand = brandRepository.findById(request.brandId())
				.orElseThrow(() -> new ResourceNotFoundException("Marca no encontrada con ID: " + request.brandId()));

		CategoryEntity category = categoryRepository.findById(request.categoryId())
				.orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada con ID: " + request.categoryId()));

		MaterialEntity material = materialRepository.findById(request.materialId())
				.orElseThrow(() -> new ResourceNotFoundException("Material no encontrado con ID: " + request.materialId()));

		product.setBrand(brand);
		product.setCategory(category);
		product.setMaterial(material);

		// PASO 3: Procesar la lista de Variantes (Hijos)
		// Creamos la lista vacía donde guardaremos las variantes procesadas
		List<ProductVariantEntity> variantsList = new ArrayList<>();

		// Recorremos cada variante que envió el usuario
		for (ProductRequest.ProductVariantRequest variantReq : request.variants()) {

			ProductVariantEntity variantEntity = new ProductVariantEntity();

			// a) Copiar datos simples
			variantEntity.setStock(variantReq.stock());
			variantEntity.setPriceModifier(variantReq.priceModifier());
			variantEntity.setImagenUrl(variantReq.imageUrl()); // Asumiendo que agregaste este campo

			// b) Buscar Color y Talla
			ColorEntity color = colorRepository.findById(variantReq.colorId())
					.orElseThrow(() -> new ResourceNotFoundException("Color no encontrado ID: " + variantReq.colorId()));

			SizeEntity size = sizeRepository.findById(variantReq.sizeId())
					.orElseThrow(() -> new ResourceNotFoundException("Talla no encontrada ID: " + variantReq.sizeId()));

			variantEntity.setColor(color);
			variantEntity.setSize(size);

			// c) VINCULACIÓN BIDIRECCIONAL (Clave para que funcione el Cascade)
			//Esto es obligatorio en JPA porque obliga a que las llaves foraneas se guarden correctamente
			// Le decimos al hijo quién es su padre
			variantEntity.setProduct(product);

			// Agregamos a la lista temporal
			variantsList.add(variantEntity);
		}

		// Le decimos al padre quiénes son sus hijos
		product.setProductsVariants(variantsList);

		// PASO 4: Guardar todo de un golpe
		// Gracias a CascadeType.ALL, al guardar 'product' se guardan solas las
		// variantes
		ProductEntity savedProduct = productRepository.save(product);

		// PASO 5: Convertir a DTO de respuesta y retornar
		return productMapper.toDto(savedProduct);

	}

}
