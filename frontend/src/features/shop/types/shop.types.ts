import type { Product, Variant } from "../../../shared/types/product.types";

// ==========================================
// TIPOS DEL CARRITO
// ==========================================

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

export interface CartContextProps {
  items: CartItem[];
  addToCart: (product: Product, variant: Variant) => void;
  removeFromCart: (uniqueId: string) => void;
  clearCart: () => void;
  totalQuantity: number;
  totalPrice: number;
}

// ==========================================
// TIPOS DE FAVORITOS (WISHLIST)
// ==========================================

export interface WishlistContextProps {
  favorites: number[]; // Array de IDs de productos
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
}
