import { Link } from "react-router-dom";
import { X } from "lucide-react";
import type { Product, Variant } from "../../../shared/types/product.types";

interface CartNotificationProps {
  product: Product;
  variant: Variant;
  onDismiss: () => void; // Función para cerrar el toast
}

export const CartNotification = ({ product, variant, onDismiss }: CartNotificationProps) => {
  return (
    <div className="w-full max-w-sm bg-white rounded-md shadow-2xl border border-neutral-200 overflow-hidden font-sans">
      
      {/* Botón Cerrar */}
      <button 
        onClick={onDismiss}
        className="absolute top-2 right-2 text-neutral-400 hover:text-black transition-colors z-20 bg-white/80 rounded-full p-1"
      >
        <X size={16} />
      </button>

      <div className="p-4 flex gap-4 bg-white relative">
        {/* Imagen */}
        <div className="w-20 h-20 bg-neutral-100 flex-shrink-0 rounded-sm border border-neutral-100">
          <img 
            src={variant.imagenUrl || product.variants?.[0].imagenUrl || ""} 
            alt={product.name} 
            className="w-full h-full object-cover mix-blend-multiply"
          />
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col justify-center">
          <h4 className="text-sm font-bold text-neutral-900 leading-tight mb-1 line-clamp-2">
            {product.name}
          </h4>
          
          <div className="text-xs text-neutral-500 mb-2">
            <p>Color: <span className="font-medium text-neutral-800">{variant.color}</span></p>
            <p>Talla: <span className="font-medium text-neutral-800">{variant.size}</span></p>
          </div>

          <div className="text-sm font-bold text-[#ee2a2a]">
             S/ {variant.finalPrice?.toFixed(2) || product.basePrice.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="px-4 pb-4 pt-0 flex flex-col gap-2">
        <Link 
          to="/checkout" 
          onClick={onDismiss}
          className="w-full bg-[#3e0e0e] hover:bg-[#2a0909] text-white text-xs font-bold uppercase tracking-widest py-3 text-center transition-colors rounded-sm"
        >
          Ir al Pago
        </Link>
        
        <Link 
           to="/cart" 
           onClick={onDismiss}
           className="w-full text-center text-[10px] font-bold text-neutral-600 uppercase tracking-widest hover:text-[#ee2a2a] hover:underline transition-colors py-1"
        >
           Ver Carro de Compras
        </Link>
      </div>
    </div>
  );
};