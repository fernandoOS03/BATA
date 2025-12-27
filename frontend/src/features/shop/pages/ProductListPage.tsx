import { ProductCard } from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';

export const ProductListPage = () => {
  const { products, loading, error } = useProducts();

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em]">
      Cargando catálogo...
    </div>
  );

  if (error) return <div className="p-10 text-center text-[#ee2a2a] font-bold uppercase text-xs">{error}</div>;

  return (
    /* USAMOS w-full para que ocupe el 100% del espacio disponible.
       El padding lateral (px-2) evita que las cards toquen el borde físico del celular.
    */
    <div className="w-full py-6 px-2 md:px-4 lg:px-0">
      
      {/* Título alineado al inicio del grid */}
      <h1 className="text-xl md:text-2xl font-black text-neutral-900 uppercase tracking-tighter mb-8 italic">
        Nuevos Lanzamientos
      </h1>
      
      {/* GRID FLUIDO: 
          - 2 columnas fijas en móvil (grid-cols-2)
          - 4 columnas fijas desde tablets/escritorio (lg:grid-cols-4)
          - gap-px y bg-neutral-100 crea esas líneas divisorias finas estilo catálogo premium
      */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center py-20 text-neutral-400 uppercase text-[10px] font-bold tracking-widest">
            No se encontraron productos.
          </p>
        )}
      </div>
    </div>
  );
};