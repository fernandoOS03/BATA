// src/features/admin/hooks/useCatalogs.ts
import { useState, useEffect, useCallback } from "react";
import { catalogService } from "../services/catalog.service";

export interface CatalogItem {
  id: number;
  name: string;
}

export const useCatalogs = () => {
  const [brands, setBrands] = useState<CatalogItem[]>([]);
  const [categories, setCategories] = useState<CatalogItem[]>([]);
  const [materials, setMaterials] = useState<CatalogItem[]>([]);
  const [colors, setColors] = useState<CatalogItem[]>([]);
  const [sizes, setSizes] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Envolvemos en useCallback para poder exportarla y reusarla
  const loadCatalogs = useCallback(async () => {
    try {
      setLoading(true);
      const [b, c, m, col, siz] = await Promise.all([
        catalogService.getBrands(),
        catalogService.getCategories(),
        catalogService.getMaterials(),
        catalogService.getColors(),
        catalogService.getSizes(),
      ]);
      setBrands(b);
      setCategories(c);
      setMaterials(m);
      setColors(col);
      setSizes(siz);
    } catch (error) {
      console.error("Error cargando catálogos", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCatalogs();
  }, [loadCatalogs]);

  // ¡EXPORTAMOS loadCatalogs!
  return {
    brands,
    categories,
    materials,
    colors,
    sizes,
    loading,
    loadCatalogs,
  };
};
