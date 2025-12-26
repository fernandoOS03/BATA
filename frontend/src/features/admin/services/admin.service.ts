import { api } from "../../../core/api/api";
import type { Product } from "../../../shared/types/product.types";
import type {
  CreateProductRequest,
  ProductResponse,
} from "../types/admin.types";

export const adminService = {
  //Funcion para subir una imagen
  uploadImagen: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    //No se pone el ontent-type en el header porque axios lo pone automaticamente(formData)
    const response = await api.post<{ url: string }>(
      "/media/upload",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return response.data.url;
  },
  //Funcion para crear un producto
  createProduct: async (
    data: CreateProductRequest
  ): Promise<ProductResponse> => {
    const response = await api.post<ProductResponse>("/products", data);
    return response.data;
  },

  //Funcion para obtener los productos
  getProducts: async (): Promise<Product[]> => {
    const response = await api.get<Product[]>("/products");
    return response.data;
  },

  //Funcion para eliminar un producto
  deleteProduct: async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`);
  },

  // obtener un solo producto
  getProductById: async (id: number): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  // actualizar un producto
  updateProduct: async (
    id: number,
    data: CreateProductRequest
  ): Promise<Product> => {
    const response = await api.put<Product>(`/products/${id}`, data);
    return response.data;
  },
};
