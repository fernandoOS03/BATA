import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { productService } from '../services/shop.service';
import { useCart } from '../../cart/hooks/useCart';
import type { Product } from '../../../shared/types/product.types';

export const useProductDetail = (productId: string | undefined) => {
    const navigate = useNavigate();
    const { addToCart } = useCart(); 
    // Estados principales
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Estados de selección del usuario
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    
    // Estado local para UI loading
    const [addingToCart, setAddingToCart] = useState(false); 

    // 1. CARGAR DATOS
    useEffect(() => {
        if (!productId) return;
        
        const fetchProduct = async () => {
            try {
                setLoading(true);
                // Convertimos el ID a número porque el servicio lo espera así
                const data = await productService.getProductById(Number(productId));
                setProduct(data);
                
                if (data.variants.length > 0) {
                    const firstColor = data.variants[0].color;
                    setSelectedColor(firstColor);
                }
            } catch (err) {
                console.error(err);
                setError('No se pudo cargar el producto');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    // 2. LÓGICA DERIVADA
    const uniqueColors = useMemo(() => {
        if (!product) return [];
        const map = new Map();
        product.variants.forEach(v => {
            if (!map.has(v.color)) {
                map.set(v.color, {
                    name: v.color,
                    thumbnail: v.imagenUrl // || product.imageUrl (Product no tiene imageUrl segun type)
                });
            }
        });
        return Array.from(map.values());
    }, [product]);

    const allSizes = useMemo(() => {
        if (!product) return [];
        const sizes = new Set(product.variants.map(v => v.size));
        return Array.from(sizes).sort((a, b) => Number(a) - Number(b));
    }, [product]);

    const selectedVariant = useMemo(() => {
        if (!product || !selectedColor || !selectedSize) return null;
        return product.variants.find(v => 
            v.color === selectedColor && 
            v.size === selectedSize
        );
    }, [product, selectedColor, selectedSize]);

    const currentPrice = useMemo(() => {
        if (!product) return 0;
        let price = product.basePrice;
        if (selectedVariant && selectedVariant.priceModifier) {
            price += selectedVariant.priceModifier;
        }
        return price;
    }, [product, selectedVariant]);

    const currentImage = useMemo(() => {
        if (!product) return '';
        if (selectedVariant?.imagenUrl) return selectedVariant.imagenUrl;
        if (selectedColor) {
            const variantWithColor = product.variants.find(v => v.color === selectedColor);
            if (variantWithColor?.imagenUrl) return variantWithColor.imagenUrl;
        }
        return ''; // product.imageUrl no existe en el tipo
    }, [product, selectedVariant, selectedColor]);

    // 3. FUNCIONES DE ACCIÓN
    const isSizeAvailableForColor = (sizeName: string) => {
        if (!product || !selectedColor) return false;
        const variant = product.variants.find(v => 
            v.color === selectedColor && 
            v.size === sizeName
        );
        return variant ? variant.stock > 0 : false;
    };

    const handleColorSelect = (colorName: string) => {
        setSelectedColor(colorName);
        setSelectedSize(null); 
    };

   const handleAddToCart = async () => {
    if (!selectedVariant || !product) return false;

    const token = localStorage.getItem('token');
    if (!token) {
        navigate('/auth/login');
        return false;
    }

    try {
        setAddingToCart(true);
        await addToCart(product, selectedVariant);
        return true; 
    } catch (err) {
        console.error(err);
        return false;
    } finally {
        setAddingToCart(false);
    }
};
    return {
        product,
        loading,
        error,
        selectedColor,
        handleColorSelect,
        selectedSize,
        setSelectedSize,
        selectedVariant,
        uniqueColors,
        allSizes,
        isSizeAvailableForColor,
        currentImage,
        currentPrice,
        handleAddToCart,
        addingToCart // <--- ESTO ES LO QUE TE FALTA EN EL RETURN
    };
};