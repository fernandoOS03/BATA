import { Link } from 'react-router-dom';
import { Plus, Heart, X, Check } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '../../../shared/types/product.types';

interface Props {
    product: Product;
}

export const ProductCard = ({ product }: Props) => {
    // Estado para mostrar el selector de tallas DENTRO de la card
    const [showQuickAdd, setShowQuickAdd] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [addedSuccess, setAddedSuccess] = useState(false);

    // Formateador de precio
    const formatPrice = (value: number) => 
        new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(value);

    // Datos principales
    const mainImage = product.variants?.[0]?.imagenUrl || "https://via.placeholder.com/400x400";
    
    // Obtenemos tallas únicas y ordenadas
    const sizes = Array.from(new Set(product.variants.map(v => v.size))).sort((a, b) => Number(a) - Number(b));
    const totalStock = product.variants?.reduce((acc, curr) => acc + curr.stock, 0) || 0;
    const isOutOfStock = totalStock === 0;

    // --- MANEJADORES ---

    const handlePlusClick = (e: React.MouseEvent) => {
        e.preventDefault(); // Evita ir al detalle
        e.stopPropagation();
        // Alternar visibilidad del panel de tallas
        if (!isOutOfStock) setShowQuickAdd(!showQuickAdd);
    };

    const handleLikeClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLiked(!isLiked);
        // Aquí podrías disparar un Toast de "Añadido a favoritos"
    };

    const handleSizeSelect = (e: React.MouseEvent, size: string) => {
        e.preventDefault();
        e.stopPropagation();
        
        console.log(`Añadiendo talla ${size} del producto ${product.name}`);
        
        // Simulación de éxito visual
        setAddedSuccess(true);
        setTimeout(() => {
            setAddedSuccess(false);
            setShowQuickAdd(false); // Cerramos el panel después de añadir
        }, 1500);
    };

    return (
        <div 
            className="group relative flex flex-col h-full bg-white transition-all duration-300"
            onMouseLeave={() => setShowQuickAdd(false)} // Opcional: Cerrar si el mouse sale
        >
            
            {/* === 1. ZONA DE IMAGEN Y OVERLAYS === */}
            <Link to={`/product/${product.id}`} className="block relative overflow-hidden bg-[#f6f6f6] mb-3 aspect-square rounded-sm">
                
                {/* Imagen Principal */}
                <img 
                    src={mainImage} 
                    alt={product.name} 
                    className={`w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 
                        ${isOutOfStock ? 'opacity-50 grayscale' : ''}
                    `}
                />
                
                {/* Badge Agotado */}
                {isOutOfStock && (
                    <span className="absolute top-2 left-2 bg-neutral-900 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wide z-10">
                        Agotado
                    </span>
                )}

                {/* Botón Corazón (Favoritos) */}
                <button 
                    onClick={handleLikeClick}
                    className={`absolute top-2 right-2 p-1.5 rounded-full transition-all z-20 
                        ${isLiked 
                            ? 'text-[#ee2a2a] opacity-100 scale-110' 
                            : 'text-neutral-400 opacity-0 group-hover:opacity-100 hover:text-[#ee2a2a]'
                        }`}
                >
                    {/* Usamos fill para rellenarlo si está activo */}
                    <Heart size={20} strokeWidth={2} fill={isLiked ? "currentColor" : "none"} />
                </button>

                {/* === PANEL DE TALLAS "QUICK ADD" (Overlay) === */}
                {/* Se muestra solo si showQuickAdd es true */}
                <div className={`absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-4 transition-transform duration-300 ease-out z-30 border-t border-neutral-100
                    ${showQuickAdd ? 'translate-y-0' : 'translate-y-full'}
                `}>
                    {/* Header del Panel */}
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold uppercase text-neutral-500 tracking-widest">
                            {addedSuccess ? '¡Agregado!' : 'Seleccione Talla'}
                        </span>
                        <button 
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowQuickAdd(false); }}
                            className="text-neutral-400 hover:text-black"
                        >
                            <X size={14} />
                        </button>
                    </div>

                    {/* Feedback de Éxito o Grid de Tallas */}
                    {addedSuccess ? (
                        <div className="flex items-center justify-center h-16 text-green-600 font-bold text-xs uppercase gap-2 animate-fade-in">
                            <Check size={18} /> Producto en carrito
                        </div>
                    ) : (
                        <div className="grid grid-cols-4 gap-2">
                            {sizes.map(size => (
                                <button
                                    key={size}
                                    onClick={(e) => handleSizeSelect(e, size)}
                                    className="h-8 flex items-center justify-center border border-neutral-200 text-xs font-bold text-neutral-600 hover:border-[#ee2a2a] hover:text-[#ee2a2a] transition-colors bg-white"
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

            </Link>

            {/* === 2. INFO DEL PRODUCTO === */}
            <div className="flex flex-col flex-1 px-1 relative">
                
                {/* Marca */}
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-900 mb-1">
                    {product.brand}
                </span>

                {/* Nombre */}
                <Link to={`/product/${product.id}`} className="mb-1 block">
                    <h3 className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors line-clamp-2 leading-snug">
                        {product.name}
                    </h3>
                </Link>

                {/* Precio y Botón + */}
                <div className="mt-auto flex items-center justify-between pt-1">
                    <span className="text-sm font-bold text-neutral-900">
                        {formatPrice(product.basePrice)}
                    </span>

                    {/* Botón (+) que activa el panel */}
                    <button 
                        onClick={handlePlusClick}
                        disabled={isOutOfStock}
                        className={`transition-colors p-1 ${
                            showQuickAdd ? 'text-[#ee2a2a] rotate-45 transform' : 'text-neutral-900 hover:text-[#ee2a2a]'
                        }`}
                        title="Seleccionar Talla"
                    >
                        {/* Usamos Plus, que rota a X visualmente si quieres, o mantenemos Plus */}
                        <Plus size={22} strokeWidth={2.5} />
                    </button>
                </div>
            </div>
        </div>
    );
};