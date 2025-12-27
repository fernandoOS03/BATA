import { useNavigate } from 'react-router-dom';

interface Props {
  subtotal: number;
  shipping: number;
  total: number;
}

export const OrderSummary = ({ subtotal, shipping, total }: Props) => {
  const navigate = useNavigate(); 

  return (
    <div className="bg-white">
      <h2 className="text-xl font-black uppercase italic tracking-tighter mb-8">
        Resumen del pedido
      </h2>

      <div className="space-y-4 mb-8">
        <div className="flex justify-between text-[13px] font-medium text-neutral-600 uppercase tracking-tighter">
          <span>Subtotal</span>
          <span className="text-neutral-900 font-bold">S/ {subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-[13px] font-medium text-neutral-600 uppercase tracking-tighter">
          <span>Costo de envío</span>
          <span className={`${shipping === 0 ? 'text-green-600 font-bold' : 'text-neutral-900 font-bold'}`}>
            {shipping === 0 ? 'GRATIS' : `S/ ${shipping.toFixed(2)}`}
          </span>
        </div>

        <div className="pt-4 border-t border-neutral-100 flex justify-between items-baseline">
          <div className="flex flex-col">
            <span className="text-lg font-black uppercase italic tracking-tighter text-neutral-900">Total</span>
            <span className="text-[10px] text-neutral-400 font-bold uppercase -mt-1 tracking-widest">IGV incluido</span>
          </div>
          <span className="text-2xl font-black text-neutral-900 tracking-tighter">
            S/ {total.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <button 
          onClick={() => navigate('/checkout')}
          className="w-full bg-black text-white py-5 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all shadow-xl active:scale-95"
        >
          Continuar compra
        </button>
        
        <button 
          onClick={() => navigate('/shop')} 
          className="w-full border-2 border-black text-black py-5 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-neutral-50 transition-all active:scale-95"
        >
          Seguir comprando
        </button>
      </div>
    </div>
  );
};