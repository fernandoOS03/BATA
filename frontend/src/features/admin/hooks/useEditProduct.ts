import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminService } from "../services/admin.service";
import { catalogService, type CatalogItem } from "../services/catalog.service";
import type {
  CreateProductRequest,
  ProductResponse,
} from "../types/admin.types";
export const useEditProduct = (productId: string | undefined) => {
  const navigate = useNavigate();

  // === 1. ESTADO DEL FORMULARIO ===
  const [productData, setProductData] = useState<CreateProductRequest>({
    name: "",
    description: "",
    basePrice: 0,
    brandId: 0,
    categoryId: 0,
    materialId: 0,
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

  // === 2. ESTADO DE LOS CATÁLOGOS (Listas para los Selects) ===
  const [brands, setBrands] = useState<CatalogItem[]>([]);
  const [categories, setCategories] = useState<CatalogItem[]>([]);
  const [materials, setMaterials] = useState<CatalogItem[]>([]);
  const [colors, setColors] = useState<CatalogItem[]>([]);
  const [sizes, setSizes] = useState<CatalogItem[]>([]);

  // === 3. CARGAR LISTAS DESPLEGABLES (Función reutilizable) ===
  const loadCatalogs = async () => {
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
  };

  useEffect(() => {
    loadCatalogs();
  }, []);

  // === 4. CARGAR DATOS DEL PRODUCTO (Si hay ID) ===
  useEffect(() => {
    if (!productId) return;

    const loadData = async () => {
      try {
        const product = (await adminService.getProductById(
          Number(productId)
        )) as unknown as ProductResponse;

        console.log("✅ DATA LIMPIA DEL BACKEND:", product);

        setProductData({
          name: product.name,
          description: product.description,
          basePrice: product.basePrice,
          brandId: product.brandId,
          categoryId: product.categoryId,
          materialId: product.materialId,
          variants: (product.variants || []).map((v) => ({
            colorId: v.colorId,
            sizeId: v.sizeId,
            stock: v.stock,
            imagenUrl: v.imagenUrl,
            priceModifier: v.priceModifier,
          })),
        });
      } catch (error) {
        console.error("Error al cargar producto", error);
        alert("No se pudo cargar la información del producto.");
      }
    };

    loadData();
  }, [productId]);

  // === 5. HANDLERS (Igual que antes) ===
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

  // Agregamos la función de editar variante que mencionamos antes
  const editVariant = (index: number) => {
    const variantToEdit = productData.variants[index];
    setNewVariant({
      colorId: variantToEdit.colorId,
      sizeId: variantToEdit.sizeId,
      stock: variantToEdit.stock,
      priceModifier: variantToEdit.priceModifier,
      imagenUrl: variantToEdit.imagenUrl,
    });
    // La sacamos de la lista para que al "Agregar" entre actualizada
    removeVariant(index);
  };

  const handleSubmit = async () => {
    if (!productId) return;
    if (productData.variants.length === 0) {
      return alert("El producto debe tener al menos una variante.");
    }

    try {
      await adminService.updateProduct(Number(productId), productData);
      alert("¡Producto actualizado con éxito!");
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al actualizar el producto.");
    }
  };

  return {
    productData,
    newVariant,
    uploading,
    // Listas para los selects
    brands,
    categories,
    materials,
    colors,
    sizes,
    // Funciones
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
