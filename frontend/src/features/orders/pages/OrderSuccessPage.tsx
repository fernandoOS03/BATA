import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom'; 
import { CheckCircle, ShoppingBag, Package } from 'lucide-react';

export const OrderSuccessPage = () => {
  const location = useLocation();
  
  // Recuperamos el ID que enviamos desde el Checkout
  // El ?. evita que explote si state es null
  const orderId = location.state?.orderId; 

  // OPCIONAL: Si alguien intenta entrar directo a /checkout/success escribiendo la URL
  // sin haber comprado, no tendrá ID. Lo redirigimos a la tienda.
  if (!orderId) {
      return <Navigate to="/shop" replace />;
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-neutral-50 font-sans px-4 py-12">
      
      <div className="bg-white p-8 md:p-12 shadow-sm border border-neutral-100 max-w-lg w-full text-center rounded-2xl">
        
        <div className="mb-8 inline-flex p-4 rounded-full bg-green-50 animate-in zoom-in duration-500">
          <CheckCircle size={64} className="text-green-600" strokeWidth={1.5} />
        </div>

        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-neutral-900 mb-4 italic">
          ¡Gracias por tu compra!
        </h1>
        
        <p className="text-neutral-500 mb-8 leading-relaxed text-sm md:text-base">
          Tu pedido ha sido procesado exitosamente. En breves momentos recibirás un correo electrónico con tu boleta y los detalles de entrega.
        </p>

        <div className="flex flex-col gap-3">
          <Link 
            to="/shop" 
            className="group flex items-center justify-center gap-2 bg-[#da291c] text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-black transition-all shadow-md active:scale-95 rounded-lg"
          >
            <ShoppingBag size={16} className="group-hover:-translate-y-0.5 transition-transform" /> 
            Seguir Comprando
          </Link>

          <Link 
            to="/account/orders" 
            className="flex items-center justify-center gap-2 border border-neutral-200 text-neutral-600 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:border-neutral-900 hover:text-neutral-900 transition-colors bg-white active:scale-95 rounded-lg"
          >
            <Package size={16} />
            Ver mis pedidos
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-100">
          <p className="text-[10px] text-neutral-400 uppercase tracking-wider">
            {/*  AQUI HAY QE CAMBIAR POR EL ID REAL */}
            Orden ID: #{orderId} 
          </p>
        </div>

      </div>

    </div>
  );
};