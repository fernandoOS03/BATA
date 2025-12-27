import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    image: string;
    price: number;
    originalPrice?: number;
    color: string;
    size: string;
    quantity: number;
  } | null;
}

export const AddedToCartModal = ({ isOpen, onClose, product }: Props) => {
  const navigate = useNavigate();

  if (!isOpen || !product) return null;

  return (
    // Fondo oscuro (Overlay)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      
      {/* Caja del Modal */}
      <div className="bg-white w-full max-w-md shadow-2xl relative animate-in zoom-in-95 duration-200 p-6 md:p-8">
        
        {/* Botón Cerrar (X) */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-neutral-400 hover:text-black transition-colors"
        >
          <X size={24} />
        </button>

        {/* Contenido */}
        <div className="flex gap-6 mt-2">
          
          {/* Imagen del Producto */}
          <div className="w-24 h-24 bg-neutral-100 flex-shrink-0">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover mix-blend-multiply" 
            />
          </div>

          {/* Detalles */}
          <div className="flex-1 space-y-1">
            <h3 className="font-bold text-sm text-neutral-900 leading-tight">
              {product.name}
            </h3>
            
            {/* Precios (Simulamos el precio anterior para que se vea como en la foto) */}
            <div className="flex items-center gap-3 text-sm mt-2">
              <span className="text-neutral-400 line-through">
                S/ {(product.originalPrice || product.price * 1.2).toFixed(2)}
              </span>
              <span className="text-[#da291c] font-bold text-lg">
                S/ {product.price.toFixed(2)}
              </span>
            </div>

            <p className="text-xs text-neutral-500 uppercase mt-1">
              Color: {product.color}
            </p>
            <p className="text-xs text-neutral-500 uppercase">
              Talla: {product.size}
            </p>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="mt-8 space-y-3">
          <button 
            onClick={() => navigate('/checkout')}
            className="w-full bg-black text-white py-4 text-xs font-black uppercase tracking-[0.15em] hover:bg-neutral-800 transition-colors"
          >
            Ir al pago
          </button>

          <div className="text-center">
            <button 
              onClick={() => {
                navigate('/cart');
                onClose(); // Cerramos el modal
              }}
              className="text-[10px] font-bold uppercase tracking-widest text-neutral-800 border-b border-neutral-300 hover:border-black transition-all pb-0.5"
            >
              Ver carro de compras ver carrito [{product.quantity}]
            </button>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
             <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest flex items-center gap-1">
                Guía de tallas
             </span>
        </div>

      </div>
    </div>
  );
};