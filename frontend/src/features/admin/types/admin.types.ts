export interface CreateProductRequest {
  name: string;
  description: string;
  basePrice: number;
  brandId: number;
  categoryId: number;
  materialId: number;
  gender: string;
  variants: {
    colorId: number;
    sizeId: number;
    stock: number;
    imagenUrl: string;
    priceModifier: number;
  }[];
}

export interface ProductResponse {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  brandId: number;
  categoryId: number;
  materialId: number;
  variants: {
    id: number;
    colorId: number;
    sizeId: number;
    stock: number;
    imagenUrl: string;
    priceModifier: number;
  }[];
}
