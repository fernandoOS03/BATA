import { useState, useEffect, useMemo } from "react";
import { productService } from "../services/shop.service";
import type { Product, Variant } from "../../../shared/types/product.types";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { CartNotification } from "../components/CartNotification";

export const useProductDetail = (idString?: string) => {
  // === 1. ESTADOS ===
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  const { addToCart } = useCart();

  // === 2. EFECTOS (CARGA DE DATOS) ===
  useEffect(() => {
    if (!idString) return;
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductById(Number(idString));
        setProduct(data);

        // Pre-selección: Primer color disponible
        if (data.variants?.length > 0) {
          setSelectedColor(data.variants[0].color);
        }
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el producto.");
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [idString]);

  // === 3. LÓGICA DE NEGOCIO (MEMOS Y HELPERS) ===

  // Colores Únicos
  const uniqueColors = useMemo(() => {
    if (!product?.variants) return [];
    const seen = new Set<string>();
    const options: { name: string; thumbnail: string }[] = [];

    product.variants.forEach((v) => {
      if (!seen.has(v.color)) {
        seen.add(v.color);
        options.push({
          name: v.color,
          thumbnail: v.imagenUrl,
        });
      }
    });
    return options;
  }, [product]);

  // Tallas Únicas
  const allSizes = useMemo(() => {
    if (!product?.variants) return [];
    const sizes = Array.from(new Set(product.variants.map((v) => v.size)));
    return sizes.sort((a, b) => Number(a) - Number(b));
  }, [product]);

  // Verificar Disponibilidad
  const isSizeAvailableForColor = (size: string) => {
    if (!selectedColor || !product) return false;
    return product.variants.some(
      (v) => v.color === selectedColor && v.size === size && v.stock > 0
    );
  };

  // Detectar Variante Exacta
  useEffect(() => {
    if (product && selectedColor && selectedSize) {
      const variant = product.variants.find(
        (v) => v.color === selectedColor && v.size === selectedSize
      );
      setSelectedVariant(variant || null);
    } else {
      setSelectedVariant(null);
    }
  }, [selectedColor, selectedSize, product]);

  // Helper para cambiar color y limpiar talla
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setSelectedSize(null);
  };

  // Datos Visuales Actuales
  const currentImage =
    selectedVariant?.imagenUrl ||
    product?.variants.find((v) => v.color === selectedColor)?.imagenUrl ||
    product?.variants?.[0]?.imagenUrl ||
    "";

  const currentPrice = selectedVariant?.finalPrice || product?.basePrice || 0;

  // === 4. MANEJADORES DE EVENTOS (HANDLERS) ===

  const handleAddToCart = () => {
    // A. Validaciones
    if (!product) return;

    if (!selectedVariant) {
      toast.error("Por favor, selecciona una talla.", {
        position: "top-right",
      });
      return;
    }

    if (selectedVariant.stock <= 0) {
      toast.error("Lo sentimos, este producto está agotado.", {
        position: "top-right",
      });
      return;
    }

    // B. Acción (Contexto)
    addToCart(product, selectedVariant);

    // C. Feedback (Notificación Personalizada)
    toast.custom(
      (t) => (
        <CartNotification
          product={product}
          variant={selectedVariant}
          onDismiss={() => toast.dismiss(t)}
        />
      ),
      {
        duration: 5000,
        position: "top-right",
      }
    );
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
  };
};
