

import { Outlet, Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, Search } from 'lucide-react';

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      
      {/* ================= NAVBAR ================= */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container-main h-20 flex items-center justify-between gap-4">
          
          {/* 1. Logo */}
          <Link to="/" className="flex items-center gap-1 group">
            <span className="text-3xl font-bold text-brand-600 tracking-tighter group-hover:text-brand-700 transition-colors">
              BATA
            </span>
            <span className="text-3xl font-bold text-gray-900 tracking-tighter">
              SHOES
            </span>
          </Link>

          {/* 2. Menú de Navegación (Desktop) */}
          <div className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-600">
            <Link to="/shop" className="hover:text-brand-600 transition-colors uppercase tracking-wide">
              Hombres
            </Link>
            <Link to="/shop" className="hover:text-brand-600 transition-colors uppercase tracking-wide">
              Mujeres
            </Link>
            <Link to="/shop" className="hover:text-brand-600 transition-colors uppercase tracking-wide">
              Niños
            </Link>
            <Link to="/shop" className="hover:text-brand-600 transition-colors uppercase tracking-wide text-brand-600 font-bold">
              Ofertas
            </Link>
          </div>

          {/* 3. Acciones (Buscar, Carrito, Login) */}
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* Buscador (Solo Icono por ahora) */}
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
              <Search className="w-5 h-5" />
            </button>

            {/* Carrito de Compras */}
            <Link to="/cart" className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors group">
              <ShoppingCart className="w-6 h-6 group-hover:text-brand-600 transition-colors" />
              {/* Badge de cantidad */}
              <span className="absolute top-0 right-0 bg-brand-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white transform translate-x-1 -translate-y-1">
                2
              </span>
            </Link>
            
            <div className="w-px h-6 bg-gray-300 hidden md:block mx-1"></div>

            {/* Botón Login */}
            <Link 
              to="/auth/login" 
              className="hidden md:flex items-center gap-2 btn btn-primary text-sm px-5 py-2 shadow-none hover:shadow-md"
            >
              <User className="w-4 h-4" />
              <span>Ingresar</span>
            </Link>

            {/* Menú Móvil (Hamburguesa) */}
            <button className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </nav>

      {/* ================= CONTENIDO DINÁMICO ================= */}
      {/* Aquí React Router renderizará HomePage, ProductPage, etc. */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800">
        <div className="container-main">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Columna 1: Marca */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white tracking-tighter">
                BATA<span className="text-brand-500">SHOES</span>
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Caminando contigo desde hace décadas. Calidad, estilo y confort para cada paso de tu vida.
              </p>
            </div>

            {/* Columna 2: Enlaces Rápidos */}
            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Tienda</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/shop" className="hover:text-brand-400 transition-colors">Novedades</Link></li>
                <li><Link to="/shop" className="hover:text-brand-400 transition-colors">Hombres</Link></li>
                <li><Link to="/shop" className="hover:text-brand-400 transition-colors">Mujeres</Link></li>
                <li><Link to="/shop" className="hover:text-brand-400 transition-colors">Niños</Link></li>
              </ul>
            </div>

            {/* Columna 3: Ayuda */}
            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Ayuda</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-brand-400 transition-colors">Seguimiento de pedido</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Envíos y devoluciones</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Preguntas frecuentes</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Contacto</a></li>
              </ul>
            </div>

            {/* Columna 4: Newsletter */}
            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Suscríbete</h4>
              <p className="text-xs text-gray-400 mb-4">Recibe ofertas exclusivas y novedades.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Tu correo" 
                  className="bg-gray-800 border-none text-sm text-white px-3 py-2 rounded-lg w-full focus:ring-1 focus:ring-brand-500 placeholder-gray-500"
                />
                <button className="bg-brand-600 hover:bg-brand-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                  OK
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">
              © 2025 Bata Shoes. Todos los derechos reservados.
            </p>
            <div className="flex gap-4">
              {/* Iconos sociales (placeholders) */}
              <div className="w-8 h-8 bg-gray-800 rounded-full hover:bg-brand-600 transition-colors cursor-pointer"></div>
              <div className="w-8 h-8 bg-gray-800 rounded-full hover:bg-brand-600 transition-colors cursor-pointer"></div>
              <div className="w-8 h-8 bg-gray-800 rounded-full hover:bg-brand-600 transition-colors cursor-pointer"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};