import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  User, 
  Menu, 
  Search, 
  Heart, 
  Facebook, 
  Instagram, 
  Youtube, 
  Music2 
} from 'lucide-react';
import { useCart } from '../../../features/cart/hooks/useCart';
import { useAuth } from '../../../features/auth/hooks/useAuth';

export const MainLayout: React.FC = () => {
  const { totalQuantity } = useCart();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-neutral-900">
      
      {/* ================= HEADER / NAVBAR ================= */}
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-100">
        {/* Banner Superior */}
        <div className="bg-neutral-100 py-2 text-center text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-600">
          Envíos gratis por compras mayores a S/ 199
        </div>

        <nav className="container-main h-20 flex items-center justify-between relative">
          
          {/* Lado Izquierdo: Navegación (Desktop) */}
          <div className="hidden lg:flex items-center gap-4 text-[12px] font-bold text-neutral-800 tracking-wide">
            {['Mujer', 'Hombre', 'Infantil', 'Marcas'].map((item) => (
              <Link 
                key={item} 
                to="/shop" 
                className="hover:text-[#ee2a2a] transition-colors py-2"
              >
                {item}
              </Link>
            ))}
      
          </div>

          {/* Menú Móvil Toggle (Solo móvil) */}
          <button className="lg:hidden p-2 hover:bg-neutral-50 rounded-full transition-colors">
            <Menu size={26} strokeWidth={1.5} />
          </button>

          {/* Centro: Logo Bata */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 transition-transform hover:scale-105">
            <img src="/bata-logo.png" alt="Bata Logo" className="h-7 md:h-9 object-contain" />
          </Link>

          {/* Lado Derecho: Buscador y Acciones */}
          <div className="flex items-center">
            
            {/* Buscador Estilo Bata (A la derecha) */}
            <div className="hidden md:flex items-center bg-neutral-50 border border-transparent focus-within:border-neutral-200 px-4 py-2 rounded-sm w-44 lg:w-56 transition-all">
              <Search size={15} className="text-neutral-400" />
              <input 
                type="text" 
                placeholder="Buscar" 
                className="bg-transparent border-none focus:ring-0 text-[12px] ml-2 w-full placeholder:text-neutral-400 font-normal"
              />
            </div>

            {/* Icono de Usuario */}
            <Link 
              to={isAuthenticated ? "/account" : "/auth/login"} 
              className="p-2 hover:text-[#ee2a2a] transition-colors"
            >
              <User size={24} strokeWidth={1.2} />
            </Link>

            {/* Favoritos */}
            <button className="p-2 hover:text-[#ee2a2a] transition-colors relative group">
              <Heart size={24} strokeWidth={1.2} />
              <span className="absolute top-1.5 right-1.5 bg-[#ee2a2a] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                1
              </span>
            </button>

            {/* Carrito de Compras */}
            <Link to="/cart" className="p-2 hover:text-[#ee2a2a] transition-colors relative group">
              <ShoppingBag size={24} strokeWidth={1.2} />
              {totalQuantity > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-black text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                  {totalQuantity}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </header>

      {/* ================= CONTENIDO DINÁMICO ================= */}
      <main className="flex-1 container-main py-10">
        <Outlet />
      </main>

      {/* ================= FOOTER COMPLETO ================= */}
      <footer className="bg-white border-t border-neutral-100 pt-20 pb-10">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-20">
            
            <div className="lg:col-span-2 pr-0 lg:pr-10">
              <h2 className="text-4xl lg:text-[42px] font-display font-medium text-[#ee2a2a] mb-6 tracking-tighter uppercase leading-[0.9]">
                BATA CLUB <br /> TE SORPRENDERÁ
              </h2>
              <p className="text-[13px] text-neutral-600 mb-8 leading-relaxed max-w-xs  tracking-tight">
                ¡Te esperan muchos beneficios y sorpresas! Regístrate, acumula puntos y úsalos en todas tus compras.
              </p>
              <button className="bg-[#ee2a2a] text-white px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all shadow-lg active:scale-95">
                Descubre más
              </button>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.1em] text-neutral-400">Corporativo</h4>
              <ul className="space-y-3 text-[13px] text-neutral-800 tracking-tighter">
                {['¿Quiénes Somos?', 'The Bata Company', 'Bata en el Mundo'].map(item => (
                  <li key={item}><Link to="#" className="hover:text-[#ee2a2a] transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.1em] text-neutral-400">Términos y Condiciones</h4>
              <ul className="space-y-3 text-[13px] text-neutral-800 tracking-tighter ">
                {[
                  'Términos y Condiciones', 
                  'Términos y Condiciones Bata Club', 
                  'Términos y Condiciones beneficio cuotas sin intereses', 
                  'Cambios y Devoluciones', 
                  'Políticas de recojo en tiendas', 
                  'Legal de promociones tiendas Físicas',
                  'Legales de promociones online',
                  'Legales de promociones tiendas especializadas'
                ].map(item => (
                  <li key={item}><Link to="#" className="hover:text-[#ee2a2a] transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.1em] text-neutral-400">Servicio al Cliente</h4>
              <ul className="space-y-3 text-[13px] text-neutral-800 tracking-tighter ">
                {['Contáctanos', 'Localiza tu pedido', 'Preguntas Frecuentes'].map(item => (
                  <li key={item}><Link to="#" className="hover:text-[#ee2a2a] transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.1em] text-neutral-400">Legal</h4>
              <ul className="space-y-3 text-[13px] text-neutral-800 tracking-tighter ">
                {[
                  'Comunicado pedidos con Modalidad Retiro en Tienda',
                  'Política de Privacidad y Seguridad',
                  'Comunicado Libro de Reclamaciones',
                  'Atención a tus derechos ARCO',
                  'Comprobantes Electrónicos',
                  'Comprobantes electrónicos - Región Loreto',
                  'Comunicado Tienda Falsa',
                  'Libro de reclamaciones '
                ].map(item => (
                  <li key={item}><Link to="#" className="hover:text-[#ee2a2a] transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-100 pt-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-10 text-[10px] tracking-[0.2em] text-neutral-400 font-bold">
               <button className="hover:text-black transition-colors flex items-center gap-2 uppercase">
                 <Search size={14}/> Tiendas
               </button>
               <button className="flex items-center gap-2 hover:text-black transition-colors uppercase">
                 <span className="w-5 h-3.5 bg-neutral-200 block rounded-[1px]"></span> PERÚ | ESPAÑOL
               </button>
            </div>

            <div className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.4em]">
              © 2025 BATA BRANDING
            </div>

            <div className="flex gap-6 text-neutral-900">
              <Facebook size={18} className="hover:text-[#ee2a2a] cursor-pointer transition-transform hover:-translate-y-1" />
              <Instagram size={18} className="hover:text-[#ee2a2a] cursor-pointer transition-transform hover:-translate-y-1" />
              <Youtube size={18} className="hover:text-[#ee2a2a] cursor-pointer transition-transform hover:-translate-y-1" />
              <Music2 size={18} className="hover:text-[#ee2a2a] cursor-pointer transition-transform hover:-translate-y-1" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};