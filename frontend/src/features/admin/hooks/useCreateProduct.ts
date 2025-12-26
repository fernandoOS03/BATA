import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminService } from "../services/admin.service";
import { catalogService, type CatalogItem } from "../services/catalog.service";
import type { CreateProductRequest } from "../types/admin.types";

export const useCreateProduct = () => {
  const navigate = useNavigate();

  // === 1. ESTADO DEL FORMULARIO ===
  const [productData, setProductData] = useState<CreateProductRequest>({
    name: "",
    description: "",
    basePrice: 0,
    brandId: 0,
    categoryId: 0,
    materialId: 0,
    gender: "",
    variants: [],
  });

  const [uploading, setUploading] = useState(false);
  const [newVariant, setNewVariant] = useState({
    colorId: 0,
    sizeId: 0,
    stock: 0,
    priceModifier: 0,
    imagenUrl: "",
  });

  // === 2. ESTADO DE LOS CATÁLOGOS ===
  const [brands, setBrands] = useState<CatalogItem[]>([]);
  const [categories, setCategories] = useState<CatalogItem[]>([]);
  const [materials, setMaterials] = useState<CatalogItem[]>([]);
  const [colors, setColors] = useState<CatalogItem[]>([]);
  const [sizes, setSizes] = useState<CatalogItem[]>([]);

  // === 3. CARGAR LISTAS (Función reutilizable) ===
  const loadCatalogs = useCallback(async () => {
    try {
      const [brandsData, categoriesData, materialsData, colorsData, sizesData] =
        await Promise.all([
          catalogService.getBrands(),
          catalogService.getCategories(),
          catalogService.getMaterials(),
          catalogService.getColors(),
          catalogService.getSizes(),
        ]);

      setBrands(brandsData);
      setCategories(categoriesData);
      setMaterials(materialsData);
      setColors(colorsData);
      setSizes(sizesData);
    } catch (error) {
      console.error("Error al cargar los catálogos:", error);
    }
  }, []);

  // Cargar catálogos al montar
  useEffect(() => {
    loadCatalogs();
  }, [loadCatalogs]);

  // === 4. HANDLERS ===
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const numericFields = ["basePrice", "brandId", "categoryId", "materialId"];

    setProductData({
      ...productData,
      [name]: numericFields.includes(name) ? Number(value) : value,
    });
  };

  const handleVariantChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewVariant({ ...newVariant, [name]: Number(value) });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await adminService.uploadImagen(file);
      setNewVariant((prev) => ({ ...prev, imagenUrl: url }));
    } catch (error) {
      console.error(error);
      alert("Error al subir la imagen");
    } finally {
      setUploading(false);
    }
  };

  const addVariant = () => {
    if (newVariant.stock <= 0) return alert("El stock debe ser mayor a 0");
    if (!newVariant.imagenUrl)
      return alert("Debes subir una imagen para la variante");
    if (newVariant.colorId === 0 || newVariant.sizeId === 0)
      return alert("Selecciona color y talla");

    setProductData({
      ...productData,
      variants: [...productData.variants, newVariant],
    });

    setNewVariant({
      colorId: 0,
      sizeId: 0,
      stock: 0,
      priceModifier: 0,
      imagenUrl: "",
    });
  };

  const removeVariant = (index: number) => {
    setProductData({
      ...productData,
      variants: productData.variants.filter((_, i) => i !== index),
    });
  };

  // Permitimos subir una variante al form para editarla antes de guardarla finalmente en la lista
  const editVariant = (index: number) => {
    const variantToEdit = productData.variants[index];
    setNewVariant({
      colorId: variantToEdit.colorId,
      sizeId: variantToEdit.sizeId,
      stock: variantToEdit.stock,
      priceModifier: variantToEdit.priceModifier,
      imagenUrl: variantToEdit.imagenUrl,
    });
    removeVariant(index);
  };

  const handleSubmit = async () => {
    if (productData.variants.length === 0) {
      return alert("El producto debe tener al menos una variante.");
    }

    try {
      await adminService.createProduct(productData);
      alert("¡Producto creado con éxito! ");
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al crear el producto.");
    }
  };

  return {
    productData,
    newVariant,
    uploading,
    brands,
    categories,
    materials,
    colors,
    sizes,
    loadCatalogs,
    handleChange,
    handleVariantChange,
    handleImageUpload,
    addVariant,
    removeVariant,
    editVariant,
    handleSubmit,
  };
};
