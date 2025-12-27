import { useCart } from '../hooks/useCart';
import { CartItem } from '../components/CartItem';
import { OrderSummary } from '../components/OrderSummary';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export const CartPage = () => {
  const { items, totalPrice, totalQuantity, removeFromCart } = useCart();

  // Cálculos dinámicos
  const shipping = totalPrice > 199 ? 0 : 7.90;
  const total = totalPrice + shipping;

  // --- MODO: CARRITO VACÍO (Estilo Bata Exacto) ---
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white font-sans"> {/* Usamos tu fuente global */}
        <div className="container mx-auto py-10 px-4 lg:px-8">
          
          {/* 1. Título Principal */}
          {/* Bata usa títulos muy negros y "apretados" (tracking-tight) */}
          <h1 className="text-3xl font-bold text-neutral-900 mb-8 tracking-tight">
            Tu carrito de compras
          </h1>

          {/* 2. Bloque de Mensaje */}
          <div className="mb-8">
            <h2 className="font-bold text-base text-neutral-900 mb-2">
              Tu carrito de compras está vacío.
            </h2>
            <p className="text-sm text-neutral-600 font-normal leading-relaxed">
              Permítenos ayudarte a llenarlo con lo que más te gusta.
            </p>
          </div>

          {/* 3. Botones de Acción */}
          {/* CLAVE: Botones rectangulares (rounded-none), texto pequeño pero muy separado (tracking-[0.2em]) */}
          <div className="flex flex-col sm:flex-row gap-5 mb-20 max-w-3xl">
            <Link 
              to="/mujer" 
              className="bg-[#240e0e] text-white px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-center hover:bg-neutral-800 transition-colors rounded-none shadow-button"
            >
              Compra mujer
            </Link>
            
            <Link 
              to="/" 
              className="bg-[#240e0e] text-white px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-center hover:bg-neutral-800 transition-colors rounded-none shadow-button"
            >
              Visita la página de inicio
            </Link>
          </div>

          {/* 4. Sección "Podría gustarte" */}
          <div>
            <h3 className="text-xl font-bold text-neutral-900 mb-6 tracking-tight">
              Podría gustarte
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="group cursor-pointer">
                  {/* Imagen */}
                  <div className="aspect-square bg-neutral-100 relative mb-4 overflow-hidden rounded-sm">
                     <div className="w-full h-full flex items-center justify-center text-neutral-300 bg-neutral-50 group-hover:scale-105 transition-transform duration-500">
                        {/* Placeholder de imagen */}
                        <img 
                          src={`https://placehold.co/400x400/f5f5f5/a3a3a3?text=Zapatilla+${i}`} 
                          alt="Producto" 
                          className="w-full h-full object-cover mix-blend-multiply"
                        />
                     </div>
                     
                     {/* Wishlist Heart */}
                     <button className="absolute top-2 right-2 p-1.5 rounded-full hover:bg-white text-neutral-400 hover:text-brand-500 transition-colors">
                       <Heart size={18} />
                     </button>
                  </div>

                  {/* Info del producto - Tipografía Bata */}
                  <div>
                    {/* Bata usa UPPERCASE en títulos de productos */}
                    <h4 className="font-bold text-sm uppercase text-neutral-800 mb-1 group-hover:underline decoration-neutral-400 underline-offset-4">
                      Zapatilla Power Urbana
                    </h4>
                    <p className="text-xs text-neutral-500 mb-2 font-medium">Power</p>
                    <span className="font-bold text-sm text-neutral-900">S/ 149.90</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    );
  }

  // --- MODO CON PRODUCTOS (Sin cambios, mantiene tu lógica) ---
  return (
    <div className="min-h-screen bg-white pb-20 font-sans">
      <div className="container mx-auto py-12 px-4">
        
        <h1 className="text-3xl font-black uppercase italic tracking-tighter text-neutral-900 mb-10 font-display">
          Mi carrito de compras <span className="text-neutral-300 ml-2">[{totalQuantity}]</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            <div className="border-t border-neutral-100">
              {items.map((item) => (
                <CartItem 
                  key={item.uniqueId} 
                  item={item} 
                  onRemove={() => removeFromCart(item.uniqueId)}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <OrderSummary 
                subtotal={totalPrice} 
                shipping={shipping} 
                total={total} 
              />
              <div className="mt-6 p-4 bg-neutral-50 border border-neutral-100 rounded-sm">
                <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-tight leading-relaxed">
                  ¡Hasta 6 cuotas sin interés con BCP, BBVA e IBK! 
                  <br />
                  <span className="text-brand-500">Envío gratis por compras mayores a S/ 199</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};