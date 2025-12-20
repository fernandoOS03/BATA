import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { ShoppingCart } from 'lucide-react';
import { shopService } from '../services/shop.service';
import type { Product, Variant } from '../../../shared/types/product.types';

export const ProductDetailPage = () => {
  const { id } = useParams(); // Obtenemos el ID de la URL (ej: /product/1)
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // Estados para la selección del usuario
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  useEffect(() => {
    if (id) loadProduct(Number(id));
  }, [id]);

  // Cada vez que cambie la selección, buscamos si existe esa variante exacta
  useEffect(() => {
    if (product && selectedColor && selectedSize) {
      const found = product.variants.find(
        v => v.color === selectedColor && v.size === selectedSize
      );
      setSelectedVariant(found || null);
    }
  }, [selectedColor, selectedSize, product]);

  const loadProduct = async (productId: number) => {
    try {
      setLoading(true);
      const data = await shopService.getById(productId);
      setProduct(data);
    } catch (error) {
      console.error(error);
      toast.error('Error al cargar el producto');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    toast.success(`Agregado: ${product?.name} (${selectedColor}, ${selectedSize})`);
    // AQUÍ CONECTAREMOS EL CARRITO MÁS ADELANTE
    console.log("Agregando variante ID:", selectedVariant.id);
  };

  if (loading) return <div>Cargando...</div>;
  if (!product) return <div>Producto no encontrado</div>;

  // Extraemos listas únicas de colores y tallas disponibles para los botones
  const colors = Array.from(new Set(product.variants.map(v => v.color)));
  const sizes = Array.from(new Set(product.variants.map(v => v.size)));

  return (
    <div className="container-main py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* 1. IMAGEN */}
        <div className="bg-gray-100 rounded-xl aspect-square flex items-center justify-center overflow-hidden">
          {/* Mostramos la foto de la variante seleccionada, o la primera por defecto */}
          <img 
            src={selectedVariant?.imagenUrl || product.variants[0].imagenUrl} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 2. DETALLES Y SELECCIÓN */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-lg text-gray-500 mb-4">{product.description}</p>
          
          <div className="text-3xl font-bold text-brand-600 mb-6">
            S/ {product.basePrice.toFixed(2)}
          </div>

          {/* Selector de Color */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
            <div className="flex gap-2">
              {colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors
                    ${selectedColor === color 
                      ? 'border-brand-500 text-brand-600 bg-brand-50' 
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Selector de Talla */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Talla</h3>
            <div className="flex gap-2">
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors
                    ${selectedSize === size 
                      ? 'border-brand-500 text-brand-600 bg-brand-50' 
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Botón de Acción */}
          <button 
            onClick={handleAddToCart}
            disabled={!selectedVariant || selectedVariant.stock === 0}
            className="btn btn-primary w-full py-4 text-lg"
          >
            <ShoppingCart className="w-6 h-6" />
            {selectedVariant 
              ? (selectedVariant.stock > 0 ? 'Añadir al Carrito' : 'Sin Stock') 
              : 'Selecciona color y talla'}
          </button>
          
          {selectedVariant && (
            <p className="mt-2 text-sm text-gray-500">
              Stock disponible: {selectedVariant.stock} unidades
            </p>
          )}
        </div>
      </div>
    </div>
  );
};