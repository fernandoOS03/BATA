"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Product, Variant } from "../../../shared/types/product.types";
import type { CartItem, CartContextProps } from "../types/shop.types";

// Creamos el contexto pero NO lo exportamos para evitar conflictos
const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // 1. Inicializar estado (con comprobación de window para evitar errores en servidor)
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("bata_cart");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  });

  // 2. Persistir cambios en LocalStorage (solo en el cliente)
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("bata_cart", JSON.stringify(items));
    }
  }, [items]);

  // 3. Lógica para agregar
  const addToCart = (product: Product, variant: Variant) => {
    setItems((prev) => {
      const uniqueId = `${product.id}-${variant.id}`;
      const existingItem = prev.find((item) => item.uniqueId === uniqueId);

      if (existingItem) {
        return prev.map((item) =>
          item.uniqueId === uniqueId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      const newItem: CartItem = {
        uniqueId,
        productId: product.id,
        variantId: variant.id,
        name: product.name,
        price: product.basePrice + (variant.priceModifier || 0),
        image: variant.imagenUrl || "", 
        color: variant.color.toString(),
        size: variant.size.toString(),
        quantity: 1,
      };

      return [...prev, newItem];
    });
  };

  const removeFromCart = (uniqueId: string) => {
    setItems((prev) => prev.filter((item) => item.uniqueId !== uniqueId));
  };

  const clearCart = () => setItems([]);

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        totalQuantity,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Eesta linea Desactiva la advertencia solo para esta exportación
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart debe usarse dentro de un CartProvider");
  return context;
};