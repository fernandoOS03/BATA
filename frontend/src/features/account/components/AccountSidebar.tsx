import { NavLink } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth'; 
import { 
  User, ShoppingBag, MapPin, Heart, LogOut, LayoutDashboard 
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Resumen', path: '/account' },
  { icon: User, label: 'Datos Personales', path: '/account/profile' },
  { icon: ShoppingBag, label: 'Mis Compras', path: '/account/orders' },
  { icon: MapPin, label: 'Direcciones', path: '/account/addresses' },
  { icon: Heart, label: 'Favoritos', path: '/account/favorites' },
];

export const AccountSidebar = () => {
  const { logout } = useAuth();

  return (
    <aside className="w-full md:w-64 bg-white p-6 border-r border-gray-100 min-h-[calc(100vh-80px)]">
      <h2 className="text-2xl font-bold mb-8 text-gray-900">Mi cuenta</h2>
      
      <nav className="flex flex-col space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/account'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium
               ${isActive 
                 ? 'text-primary bg-primary/10' 
                 : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
               }`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}

        {/* Botón de Logout separado visualmente */}
        <div className="pt-4 mt-4 border-t border-gray-100">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg text-gray-500 hover:text-primary hover:bg-primary/5 transition-colors font-medium"
          >
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};