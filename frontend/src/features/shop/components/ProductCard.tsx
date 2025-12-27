import { Link } from 'react-router-dom';
import { Plus, Heart, X } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '../../../shared/types/product.types';

interface Props {
    product: Product;
}

export const ProductCard = ({ product }: Props) => {
    const [showQuickAdd, setShowQuickAdd] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const formatPrice = (value: number) => `S/ ${value.toFixed(2)}`;

    // Obtenemos datos de las variantes reales
    const mainImage = product.variants?.[0]?.imagenUrl || "";
    const sizes = Array.from(new Set(product.variants.map(v => v.size))).sort((a, b) => Number(a) - Number(b));
    const isOutOfStock = !product.variants?.some(v => v.stock > 0);

    return (
        <div 
            className="group relative flex flex-col h-full bg-white border-r border-b border-neutral-100"
            onMouseLeave={() => setShowQuickAdd(false)}
        >
            {/* === ÁREA DE IMAGEN === */}
            <Link to={`/product/${product.id}`} className="block relative overflow-hidden bg-[#f3f3f3] aspect-square">
                <img 
                    src={mainImage} 
                    alt={product.name} 
                    className={`w-full h-full object-cover transition-opacity duration-500 ${isOutOfStock ? 'opacity-40' : 'opacity-100'}`}
                />
                
                {/* Corazón (Favoritos) */}
                <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsLiked(!isLiked); }}
                    className={`absolute top-3 right-3 transition-opacity duration-300 z-20 ${isLiked ? 'text-black opacity-100' : 'text-neutral-400 opacity-0 group-hover:opacity-100'}`}
                >
                    <Heart size={18} fill={isLiked ? "black" : "none"} strokeWidth={1.5} />
                </button>

                {/* Panel de Tallas (Quick Add) */}
                <div className={`absolute bottom-0 left-0 right-0 bg-white/95 p-4 transition-transform duration-300 z-30 ${showQuickAdd ? 'translate-y-0' : 'translate-y-full'}`}>
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400">Tallas</span>
                        <X size={14} className="cursor-pointer text-neutral-400 hover:text-black" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowQuickAdd(false); }} />
                    </div>
                    <div className="grid grid-cols-4 gap-1">
                        {sizes.map(size => (
                            <button
                                key={size}
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                className="h-8 border border-neutral-100 text-[10px] font-bold hover:border-black hover:bg-black hover:text-white transition-all"
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
            </Link>

            {/* === ÁREA DE TEXTO === */}
            <div className="flex flex-col flex-1 p-4">
                {/* MARCA: font-black y tracking alto */}
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black mb-1">
                    {product.brand}
                </span>

                {/* NOMBRE: leading-tight para que las líneas estén juntas */}
                <Link to={`/product/${product.id}`} className="mb-4">
                    <h3 className="text-[13px] font-medium leading-[1.2] text-neutral-800 line-clamp-2">
                        {product.name}
                    </h3>
                </Link>

                {/* PRECIO Y PLUS: Alineados a la derecha e izquierda respectivamente */}
                <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-[#ee2a2a] tracking-tight">
                            {formatPrice(product.basePrice)}
                        </span>
                    </div>

                    {/* El Icono PLUS: Grande y grueso sin círculo */}
                    <button 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); if(!isOutOfStock) setShowQuickAdd(true); }}
                        className="text-black hover:text-[#ee2a2a] transition-colors"
                    >
                        <Plus size={24} strokeWidth={3} />
                    </button>
                </div>
            </div>
        </div>
    );
};