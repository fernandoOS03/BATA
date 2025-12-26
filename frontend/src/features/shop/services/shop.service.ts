import { api } from "../../../core/api/api";
import type { Product } from "../../../shared/types/product.types";

export const productService = {
  //obtener todos los productos
  getAllProducts: async (): Promise<Product[]> => {
    try {
      const response = await api.get<Product[]>("/products");
      return response.data;
    } catch (error) {
      console.log("Error al obtener los productos", error);
      throw error;
    }
  },
  //Obtener el detalle de un producto por su id
  getProductById: async (id: number): Promise<Product> => {
    try {
      const response = await api.get<Product>(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.log("Error al obtener el producto", error);
      throw error;
    }
  },
};
