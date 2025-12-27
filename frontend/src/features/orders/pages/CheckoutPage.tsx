import React from 'react';
import { MapPin, CreditCard, CheckCircle, Loader2, ShieldCheck } from 'lucide-react';

// Hooks
import { useCart } from '../../cart/hooks/useCart';
import { useCheckout } from '../hooks/useCheckout';

export const CheckoutPage = () => {
  const { items, totalPrice, totalQuantity } = useCart();
  
  const { 
    loading, 
    addresses, 
    selectedAddress, 
    setSelectedAddress, 
    selectedPayment, 
    setSelectedPayment, 
    handlePlaceOrder 
  } = useCheckout();

  return (
    <div className="min-h-screen bg-[#f9f9f9] font-sans py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-2xl font-black uppercase tracking-tight mb-8 text-neutral-900 border-b pb-4">
          Finalizar Compra
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-white p-6 shadow-sm border border-neutral-200">
              <h2 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2 text-neutral-800">
                <MapPin size={18} className="text-[#da291c]" /> Dirección de Envío
              </h2>
              <div className="space-y-3">
                {addresses.map((addr) => (
                  <label 
                    key={addr.id} 
                    className={`flex items-start gap-4 p-4 border cursor-pointer transition-all ${
                      selectedAddress === addr.id 
                        ? 'border-[#da291c] bg-[#fff5f5]' 
                        : 'border-neutral-200'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="address" 
                      className="mt-1 accent-[#da291c]" 
                      checked={selectedAddress === addr.id} 
                      onChange={() => setSelectedAddress(addr.id)} 
                    />
                    <div>
                      <span className="block font-bold text-sm uppercase text-neutral-900">{addr.name}</span>
                      <span className="text-sm text-neutral-500">{addr.street}, {addr.city}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Pagos */}
            <div className="bg-white p-6 shadow-sm border border-neutral-200">
              <h2 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2 text-neutral-800">
                <CreditCard size={18} className="text-[#da291c]" /> Método de Pago
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {['VISA', 'MASTERCARD', 'YAPE'].map((method) => (
                  <label 
                    key={method} 
                    className={`flex flex-col items-center justify-center gap-2 p-4 border cursor-pointer transition-all h-24 ${
                      selectedPayment === method 
                        ? 'border-[#da291c] bg-[#fff5f5] text-[#da291c]' 
                        : 'border-neutral-200 text-neutral-600'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="payment" 
                      className="hidden" 
                      checked={selectedPayment === method} 
                      onChange={() => setSelectedPayment(method)} 
                    />
                    <span className="font-bold text-xs tracking-widest">{method}</span>
                    {selectedPayment === method && <CheckCircle size={16} />}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* === DERECHA: Resumen === */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 shadow-sm border border-neutral-200 sticky top-24">
              <h2 className="text-sm font-bold uppercase tracking-widest mb-6 border-b pb-4 text-neutral-800">
                Resumen del Pedido
              </h2>
              
              {/* Lista de Items */}
              <div className="max-h-60 overflow-y-auto mb-6 pr-2 space-y-4">
                {items.map((item) => (
                  <div key={item.uniqueId} className="flex gap-4 text-sm">
                    <div className="w-16 h-16 bg-neutral-100 flex-shrink-0">
                       <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold truncate text-neutral-900">{item.name}</p>
                      <p className="text-neutral-500 text-xs mt-1">Cant: {item.quantity}</p>
                      <p className="text-neutral-400 text-[10px] uppercase">{item.color} | {item.size}</p>
                    </div>
                    <div className="font-bold text-neutral-900">
                      S/ {(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totales */}
              <div className="space-y-3 border-t pt-4 mb-6">
                <div className="flex justify-between text-sm">
                  {/* Aquí usamos totalQuantity, así que ya no saldrá el error de unused var */}
                  <span className="text-neutral-600">Subtotal ({totalQuantity} items)</span>
                  <span className="font-medium">S/ {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Envío</span>
                  <span className="text-[#da291c] font-bold text-xs uppercase">Gratis</span>
                </div>
                <div className="flex justify-between text-xl font-black mt-4 pt-4 border-t border-dashed border-neutral-300">
                  <span>TOTAL</span>
                  <span>S/ {totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handlePlaceOrder} 
                disabled={loading} 
                className="w-full bg-[#da291c] text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-black transition-colors disabled:bg-neutral-300 flex items-center justify-center gap-2 shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Procesando...
                  </>
                ) : (
                  'Confirmar y Pagar'
                )}
              </button>
              
              <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-neutral-400 uppercase tracking-wider">
                <ShieldCheck size={14} /> Pago 100% Seguro
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};