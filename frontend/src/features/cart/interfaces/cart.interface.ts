export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  imageUrl: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  subtotal: number;
  maxStock: number;
}

export interface Cart {
  id: number;
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
}

export interface AddToCartPayload {
  variantId: number;
  quantity: number;
}
