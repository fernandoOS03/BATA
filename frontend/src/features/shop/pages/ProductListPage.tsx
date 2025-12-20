import { ProductCard } from '../components/ProductCard';
import type { Product } from '../../../shared/types/product.types';

// Datos de prueba (luego vendrán de una API o servicio)
// Puedes mover esto a un archivo separado si prefieres
const dummyProducts: Product[] = [
  {
    id: 1,
    name: "Zapatilla Urbana",
    description: "Zapatilla cómoda para el día a día",
    basePrice: 150.00,
    brand: "Bata",
    category: "Urbano",
    material: "Cuero sintético",
    variants: [
      {
        id: 101,
        color: "Negro",
        size: "40",
        stock: 10,
        imagenUrl: "https://via.placeholder.com/200",
        finalPrice: 150.00
      }
    ]
  },
   {
    id: 2,
    name: "Zapato Formal",
    description: "Elegancia y confort",
    basePrice: 280.00,
    brand: "Bata",
    category: "Formal",
    material: "Cuero",
    variants: [
      {
        id: 201,
        color: "Marron",
        size: "42",
        stock: 0, // Agotado
        imagenUrl: "",
        finalPrice: 280.00
      }
    ]
  }
];

export const ProductListPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Nuestros Productos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dummyProducts.map(product => (
            <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};