import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth'; // ⚠️ Verifica esta ruta
import { User, ShoppingBag, MapPin, Heart, ChevronRight } from 'lucide-react';

export const AccountOverviewPage = () => {
  const { user } = useAuth();

  const quickLinks = [
    { icon: User, title: 'Datos Personales', path: '/account/profile', desc: 'Gestiona tu información personal' },
    { icon: ShoppingBag, title: 'Mis Compras', path: '/account/orders', desc: 'Ver historial y estado de pedidos' },
    { icon: MapPin, title: 'Direcciones', path: '/account/addresses', desc: 'Gestiona tus direcciones de envío' },
    { icon: Heart, title: 'Favoritos', path: '/account/favorites', desc: 'Tus productos guardados' },
  ];

  return (
    <div className="space-y-8 animate-fade-in"> {/* Puedes añadir una animación simple */}
      
      {/* Header del Dashboard */}
      <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900">
          Hola, <span className="text-primary">{user?.name}</span>!
        </h1>
        <p className="text-gray-500 mt-2">
          Desde aquí puedes gestionar tus pedidos y datos personales.
        </p>
      </div>

      {/* Grid de opciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {quickLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className="group flex items-center justify-between p-6 bg-white border border-gray-200 rounded-xl transition-all duration-300 hover:shadow-lg hover:border-primary/30"
          >
            <div className="flex items-center gap-5">
              {/* Círculo del icono: Gris por defecto -> Primary al hacer hover */}
              <div className="p-3 bg-gray-50 text-gray-400 rounded-full transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                <link.icon size={24} />
              </div>
              
              <div>
                <span className="block font-bold text-lg text-gray-800 group-hover:text-primary transition-colors">
                  {link.title}
                </span>
                <span className="text-sm text-gray-400 group-hover:text-gray-500">
                  {link.desc}
                </span>
              </div>
            </div>

            <ChevronRight className="text-gray-300 group-hover:text-primary transition-transform group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </div>
  );
};