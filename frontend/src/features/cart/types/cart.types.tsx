// 1. IMPORTAMOS DESDE TU CARPETA SHARED (Ajusta la cantidad de ../ según tu estructura)
import type { Product, Variant } from "../../../shared/types/product.types";

// 2. Definimos el ítem visual del carrito
export interface CartItem {
  uniqueId: string;
  productId: number;
  variantId: number;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
}

// 3. Definimos el Contexto (usando tus tipos de Shared)
export interface CartContextProps {
  items: CartItem[];
  // Aquí usamos 'Product' y 'Variant' que vienen de tu archivo compartido
  addToCart: (product: Product, variant: Variant) => Promise<void>;
  removeFromCart: (uniqueId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  totalQuantity: number;
  totalPrice: number;
}

// 4. Favoritos
export interface WishlistContextProps {
  favorites: number[];
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
}

// 5. Tipos de respuesta de la API (Backend)
export interface CartItemResponse {
  id: number;
  productId: number;
  productName: string;
  price: number;
  imageUrl: string;
  color: string;
  size: string;
  quantity: number;
}

export interface CartResponse {
  id: number;
  userId: number;
  items: CartItemResponse[];
  totalItems: number;
  totalAmount: number;
}
