import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCart } from "../../cart/hooks/useCart";
import { createOrder } from "../services/order.services";

export const useCheckout = () => {
  const navigate = useNavigate();
  // Traemos items y clearCart para validar y limpiar
  const { items, clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string>("VISA");

  // MOCK de direcciones (Esto iría mejor en un hook useAddresses, pero por ahora aquí)
  const addresses = [
    { id: 1, name: "Casa", street: "Av. Larco 123", city: "Lima" },
    {
      id: 2,
      name: "Oficina",
      street: "Calle Begonias 450",
      city: "San Isidro",
    },
  ];

  // Efecto: Redireccionar si el carrito está vacío
  useEffect(() => {
    if (!items || items.length === 0) {
      navigate("/cart");
    }
  }, [items, navigate]);

  // ✅ FUNCIÓN UNIFICADA Y CORREGIDA
  const handlePlaceOrder = async () => {
    // 1. Validaciones previas
    if (!selectedAddress) {
      toast.error("Selecciona una dirección de envío");
      return;
    }

    setLoading(true);

    try {
      // 2. Llamada al Backend
      // Guardamos la respuesta en 'orderResponse' para obtener el ID
      const orderResponse = await createOrder({
        addressId: selectedAddress,
        paymentMethod: selectedPayment,
        items: [], // Enviamos vacío, el backend lee de la BD
      });

      // 3. Limpiamos carrito visualmente
      clearCart();

      // 4. Navegamos pasando el ID real en el estado
      navigate("/checkout/success", {
        state: { orderId: orderResponse.id },
      });
    } catch (error) {
      console.error(error);
      toast.error("Error al procesar el pago.");
    } finally {
      setLoading(false);
    }
  };

  return {
    // Estados
    loading,
    selectedAddress,
    selectedPayment,
    addresses,
    // Setters
    setSelectedAddress,
    setSelectedPayment,
    // Funciones
    handlePlaceOrder,
  };
};
