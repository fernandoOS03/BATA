export interface Product {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  price: number;
  stock: number;
  sku: string;
  images: string[];
  brand: string;
  category: string;
  material: string;
  gender: string;
  variants: Variant[];
}

export interface Variant {
  id: number;
  color: string;
  size: string;
  stock: number;
  imagenUrl: string;
  priceModifier: number;
  finalPrice: number;
}
