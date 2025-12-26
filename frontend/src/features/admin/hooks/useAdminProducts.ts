import { useEffect, useState } from "react";
import { adminService } from "../services/admin.service";
import type { Product } from "../../../shared/types/product.types";

export const useAdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  //Funcion para cargar los productos
  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await adminService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error cargando productos", error);
    } finally {
      setLoading(false);
    }
  };

  //carga al montar el hook
  useEffect(() => {
    loadProducts();
  }, []);

  // Lógica para eliminar
  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;

    try {
      await adminService.deleteProduct(id);
      // Actualizamos el estado local filtrando el eliminado
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      alert("Error al eliminar el producto");
      console.error(error);
    }
  };
  return {
    products,
    loading,
    handleDelete,
    refresh: loadProducts, // Opcional: por si quieres poner un botón de "Recargar" manual
  };
};
