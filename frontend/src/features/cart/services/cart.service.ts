import { api } from "../../../core/api/api";
import type { CartResponse } from "../types/cart.types";

export const cartService = {
  getMyCart: async (): Promise<CartResponse> => {
    // Es vital que el interceptor de Axios ya incluya el token
    const response = await api.get<CartResponse>("/cart");
    return response.data;
  },

  addItem: async (payload: { variantId: number; quantity: number }) => {
    const response = await api.post<CartResponse>("/cart/items", payload);
    return response.data;
  },

  removeItem: async (uniqueId: string) => {
    // Convertimos a número si el backend espera un Long/Integer
    const itemId = parseInt(uniqueId);
    const response = await api.delete(`/cart/items/${itemId}`);
    return response.data;
  },

  clearCart: async () => {
    const response = await api.delete("/cart");
    return response.data;
  },
};
