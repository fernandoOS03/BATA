import { createContext, useState, useEffect, useCallback, type ReactNode } from "react"; 
import { cartService } from "../services/cart.service";
import { useAuth } from "../../auth/hooks/useAuth"; 
import type { Product, Variant } from "../../../shared/types/product.types";
import type { CartItem, CartContextProps } from "../types/cart.types";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth(); // ✅ Conexión con Auth
  
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const refreshCart = useCallback(async () => {
    try {
      const cartData = await cartService.getMyCart();
      
      // Validación defensiva
      if (!cartData || !cartData.items || !Array.isArray(cartData.items)) {
          console.warn("La API del carrito devolvió un formato inesperado:", cartData);
          setItems([]);
          setTotalQuantity(0);
          setTotalPrice(0);
          return;
      }
      
      const mappedItems: CartItem[] = cartData.items.map((item) => ({
        uniqueId: item.id.toString(),
        productId: item.productId,
        variantId: item.id, // OJO: Verificar si la API devuelve variantId separado en el futuro
        name: item.productName,
        price: item.price,
        image: item.imageUrl,
        color: item.color,
        size: item.size,
        quantity: item.quantity
      }));

      setItems(mappedItems);
      setTotalQuantity(cartData.totalItems || 0);
      setTotalPrice(cartData.totalAmount || 0);

    } catch (error) {
      console.error("Error cargando carrito:", error);
    }
  }, []);

  // Efecto que reacciona automágicamente a cambios en la autenticación
  useEffect(() => {
    if (isAuthenticated) {
        // eslint-disable-next-line
        refreshCart();
    } else {
        // Si no estamos autenticados, limpiamos el carrito
        setItems([]);
        setTotalQuantity(0);
        setTotalPrice(0);
    }
  }, [isAuthenticated, refreshCart]);

  const addToCart = async (_product: Product, variant: Variant) => {
    try {
      if (!isAuthenticated) {
          // Opcional: Redirigir a login o guardar en local storage provisional
          console.warn("Usuario no autenticado intentando agregar al carrito");
          return;
      }
      
      await cartService.addItem({
        variantId: variant.id,
        quantity: 1
      });
      await refreshCart(); // Recargar para tener totales actualizados del server
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const removeFromCart = async (uniqueId: string) => {
    try {
        // optimistically update UI could be done here, 
        // but for safety we await server
        await cartService.removeItem(uniqueId);
        await refreshCart();
    } catch (error) {
        console.error("Error eliminando item:", error);
    }
  };

  const clearCart = async () => {
    try {
        await cartService.clearCart();
        setItems([]);
        setTotalQuantity(0);
        setTotalPrice(0);
    } catch (error) {
        console.error("Error vaciando carrito:", error);
    }
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      clearCart,
      totalQuantity,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};