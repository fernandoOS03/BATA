import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Check, AlertCircle, ChevronRight } from 'lucide-react';
// Asegúrate de que la ruta al hook sea la correcta según tu estructura
import { useProductDetail } from '../hooks/useProductDetail';
export const ProductDetailPage = () => {
  // 1. Obtenemos el ID de la URL (definido como /product/:id en el router)
  const { id } = useParams();

  // 2. LLAMADA ÚNICA AL HOOK: Traemos todo el cerebro del componente aquí
  const {
    product,
    loading,
    error,
    selectedColor,
    handleColorSelect, 
    selectedSize,
    setSelectedSize,
    selectedVariant,
    uniqueColors,
    allSizes,
    isSizeAvailableForColor,
    currentImage,
    currentPrice,
    handleAddToCart,
  } = useProductDetail(id);

  // 3. Estados de Carga y Error
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-neutral-500 font-bold uppercase tracking-widest">
        Cargando...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#ee2a2a] gap-2">
        <AlertCircle /> {error || "Producto no encontrado"}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* === 1. BREADCRUMBS (MIGAS DE PAN) === */}
      <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-neutral-400 uppercase tracking-widest mb-8">
          <Link to="/" className="hover:text-black transition-colors">HOMBRE</Link>
          <ChevronRight size={10} />
          <Link to="/" className="hover:text-black transition-colors">ZAPATOS</Link>
          <ChevronRight size={10} />
          {/* Categoría dinámica del producto */}
          <span className="text-[#ee2a2a]">{product.category}</span> 
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* === COLUMNA IZQUIERDA: IMAGEN PRINCIPAL === */}
        <div className="relative">
            <div className="bg-[#f6f6f6] rounded-sm overflow-hidden aspect-square flex items-center justify-center group">
                <img 
                    src={currentImage} 
                    alt={product.name}
                    className="object-cover w-full h-full mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/600?text=No+Image"; }}
                />
            </div>
        </div>

        {/* === COLUMNA DERECHA: INFORMACIÓN Y ACCIONES === */}
        <div className="flex flex-col">
          
          {/* Encabezado del Producto */}
          <div className="mb-4">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1 block">
                  {product.brand}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2 leading-tight">
                  {product.name}
              </h1>
              <div className="text-2xl font-bold text-neutral-900">
                 S/ {currentPrice.toFixed(2)}
              </div>
          </div>

          <div className="h-px w-full bg-neutral-200 my-6"></div>

          {/* === 2. SELECTOR DE COLOR === */}
          <div className="mb-8">
            <span className="text-xs font-bold text-neutral-900 uppercase tracking-widest mb-3 block">
                Color: <span className="text-neutral-500 font-medium">{selectedColor}</span>
            </span>
            <div className="flex flex-wrap gap-3">
              {uniqueColors.map((option) => (
                <button
                  key={option.name}
                  onClick={() => handleColorSelect(option.name)} // ✅ Usamos la función que limpia la talla
                  className={`w-16 h-16 p-1 border rounded transition-all
                    ${selectedColor === option.name 
                      ? 'border-neutral-900 ring-1 ring-neutral-900' // Seleccionado: Borde negro
                      : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  title={option.name}
                >
                    <img 
                        src={option.thumbnail} 
                        alt={option.name} 
                        className="w-full h-full object-cover bg-neutral-100"
                    />
                </button>
              ))}
            </div>
          </div>

          {/* === 3. SELECTOR DE TALLAS === */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-neutral-900 uppercase tracking-widest">
                    Talla
                </span>
                <button className="text-[10px] font-bold text-neutral-500 underline hover:text-black flex items-center gap-1">
                    GUÍA DE TALLAS
                </button>
            </div>
            
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
               {allSizes.map((size) => {
                   const isAvailable = isSizeAvailableForColor(size);
                   const isSelected = selectedSize === size;

                   return (
                    <button
                      key={size}
                      disabled={!isAvailable}
                      onClick={() => setSelectedSize(size)}
                      className={`h-12 flex items-center justify-center border text-sm font-bold transition-all relative
                        ${isSelected
                          ? 'border-[#ee2a2a] text-[#ee2a2a] ring-1 ring-[#ee2a2a]' // Seleccionado: Rojo
                          : isAvailable 
                            ? 'border-neutral-200 text-neutral-700 hover:border-neutral-400' // Disponible
                            : 'border-neutral-100 text-neutral-300 bg-neutral-50 cursor-not-allowed decoration-slice line-through' // Agotado
                        }`}
                    >
                      {size}
                      {/* Indicador visual de selección */}
                      {isSelected && (
                          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#ee2a2a] rounded-full"></span>
                      )}
                    </button>
                  );
               })}
            </div>
            {/* Mensaje de ayuda si no hay color seleccionado */}
            {!selectedColor && (
                <p className="text-[10px] text-neutral-400 mt-2">* Selecciona un color para ver la disponibilidad real.</p>
            )}
          </div>

          {/* === BOTÓN DE ACCIÓN (AGREGAR AL CARRITO) === */}
          <button
            disabled={!selectedVariant} // Se desactiva si no hay variante válida (color+talla+stock)
            onClick={handleAddToCart}   // Llama a la función del hook
            className={`w-full py-4 px-8 text-sm font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 group
              ${selectedVariant 
                ? 'bg-black text-white hover:bg-neutral-800 shadow-lg cursor-pointer' 
                : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
              }`}
          >
            {selectedVariant ? (
                <>
                  <ShoppingBag size={18} className="group-hover:-translate-y-0.5 transition-transform"/>
                  AGREGAR AL CARRITO
                </>
            ) : (
                'SELECCIONA TUS OPCIONES'
            )}
          </button>

          {/* Información Adicional (Beneficios) */}
          <div className="mt-6 flex flex-col gap-3 text-xs text-neutral-500">
             <div className="flex items-center gap-2">
                 <Check size={14} className="text-green-600"/>
                 <span>Devoluciones gratis en tiendas Bata</span>
             </div>
             <div className="flex items-center gap-2">
                 <ShoppingBag size={14} />
                 <span>Recíbelo en 2-5 días hábiles</span>
             </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};