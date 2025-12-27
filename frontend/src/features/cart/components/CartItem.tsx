import { Heart, Trash2, Minus, Plus } from 'lucide-react';
import type { CartItem as CartItemType } from '../types/cart.types';

interface Props {
  item: CartItemType;
  onRemove: (id: string) => void;
}

export const CartItem = ({ item, onRemove }: Props) => {
  return (
    <div className="flex gap-6 py-8 border-b border-neutral-100 group">
      {/* Imagen */}
      <div className="w-32 h-40 bg-neutral-50 overflow-hidden flex-shrink-0">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info Detallada */}
      <div className="flex-1 flex flex-col relative">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1 block">
              BATA
            </span>
            <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-tight mb-2 max-w-[280px]">
              {item.name}
            </h3>
            <p className="text-sm font-black text-neutral-900 mb-4">
              S/ {item.price.toFixed(2)}
            </p>
          </div>

          {/* Acciones Derecha */}
          <div className="flex gap-4">
            <button className="text-neutral-300 hover:text-black transition-colors">
              <Heart size={20} strokeWidth={1.5} />
            </button>
            <button 
              onClick={() => onRemove(item.uniqueId)}
              className="text-neutral-300 hover:text-[#ee2a2a] transition-colors"
            >
              <Trash2 size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Metadatos */}
        <div className="space-y-1 mt-1 text-[11px] text-neutral-500 font-medium uppercase tracking-tighter">
          <p>ID del producto: <span className="text-neutral-900 font-bold">{item.productId}</span></p>
          <p>Color: <span className="text-neutral-900 font-bold">{item.color}</span></p>
          <p>Talla: <span className="text-neutral-900 font-bold">{item.size}</span></p>
        </div>

        <span className="mt-4 text-[10px] font-black text-green-600 uppercase tracking-widest">
          Disponible
        </span>

        {/* Selector de Cantidad */}
        <div className="mt-auto flex items-center border border-neutral-200 w-fit">
          <button className="p-2 hover:bg-neutral-50 border-r border-neutral-200">
            <Minus size={14} />
          </button>
          <span className="px-4 text-xs font-bold">{item.quantity}</span>
          <button className="p-2 hover:bg-neutral-50 border-l border-neutral-200">
            <Plus size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};