import { api } from "../../../core/api/api";

export interface CatalogItem {
  id: number;
  name: string;
}
export const catalogService = {
  // --- GET (LEER) ---
  // 1. Marcas
  getBrands: async (): Promise<CatalogItem[]> => {
    const response = await api.get<CatalogItem[]>("/catalogs/brands");
    return response.data;
  },
  // 2. Categorías
  getCategories: async (): Promise<CatalogItem[]> => {
    const response = await api.get<CatalogItem[]>("/catalogs/categories");
    return response.data;
  },
  // 3. Materiales
  getMaterials: async (): Promise<CatalogItem[]> => {
    const response = await api.get<CatalogItem[]>("/catalogs/materials");
    return response.data;
  },

  // 4. Colores
  getColors: async (): Promise<CatalogItem[]> => {
    const response = await api.get<CatalogItem[]>("/catalogs/colors");
    return response.data;
  },

  // 5. Tallas
  getSizes: async (): Promise<CatalogItem[]> => {
    const response = await api.get<CatalogItem[]>("/catalogs/sizes");
    return response.data;
  },

  // --- POST (CREAR NUEVOS)  ---
  createBrand: async (name: string): Promise<CatalogItem> => {
    const response = await api.post<CatalogItem>("/catalogs/brands", { name });
    return response.data;
  },
  createCategory: async (name: string): Promise<CatalogItem> => {
    const response = await api.post<CatalogItem>("/catalogs/categories", {
      name,
    });
    return response.data;
  },
  createMaterial: async (name: string): Promise<CatalogItem> => {
    const response = await api.post<CatalogItem>("/catalogs/materials", {
      name,
    });
    return response.data;
  },
  createColor: async (name: string): Promise<CatalogItem> => {
    const response = await api.post<CatalogItem>("/catalogs/colors", { name });
    return response.data;
  },
  createSize: async (name: string): Promise<CatalogItem> => {
    const response = await api.post<CatalogItem>("/catalogs/sizes", { name });
    return response.data;
  },
};
