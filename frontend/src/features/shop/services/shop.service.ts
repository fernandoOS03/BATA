import { api } from "../../../core/api/api";
import type { Product } from "../../../shared/types/product.types";

export const shopService = {
    //obtener todos los productos
    getAll: async () : Promise<Product[]> => {
        const response = await api.get<Product[]>('/products');
        return response.data;
    },
    //Obtener el detalle de un producto por su id 
    getById : async (id : number) : Promise<Product> => {
        const response = await api.get<Product>(`/products/${id}`);
        return response.data;
    }
}