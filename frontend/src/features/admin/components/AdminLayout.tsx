import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Users, Settings, LogOut, Package, type LucideIcon } from 'lucide-react';
import { useAuth } from '../../auth/hooks/useAuth';

interface MenuItem {
  path: string;
  icon: LucideIcon;
  label: string;
}

export const AdminLayout = () => {
  const location = useLocation();
  const { logout } = useAuth();

  // Definición de las opciones del Panel de Control
  const menuItems: MenuItem[] = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/products', icon: ShoppingBag, label: 'Productos' },
    { path: '/admin/orders', icon: Package, label: 'Pedidos' },
    { path: '/admin/customers', icon: Users, label: 'Clientes' },
    { path: '/admin/settings', icon: Settings, label: 'Configuración' },
  ];

  return (
    <div className="flex h-screen bg-neutral-50 font-sans text-neutral-800">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-neutral-200 flex flex-col shadow-card z-10 sticky top-0 h-screen">
        
        {/* Header del Sidebar */}
        <div className="h-16 flex items-center px-6 border-b border-neutral-100">
          <h2 className="text-2xl font-display font-bold text-brand-500 tracking-tighter">
            BATA <span className="text-neutral-400 text-sm font-sans font-normal ml-1">ADMIN</span>
          </h2>
        </div>

        {/* Navegación Principal */}
        <nav className="flex-1 overflow-y-auto py-6 px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.path);
              
              return (
                <li key={item.path}>
                  <Link 
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium transition-colors duration-200
                      ${isActive 
                        ? 'bg-brand-50 text-brand-600' // Estado Activo
                        : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900' // Estado Inactivo
                      }`}
                  >
                    <Icon size={18} strokeWidth={2} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer del Sidebar (Logout) */}
        <div className="p-4 border-t border-neutral-100">
          <button 
            onClick={logout}
            className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-neutral-500 hover:text-brand-600 hover:bg-brand-50 rounded transition-colors"
          >
            <LogOut size={18} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-auto bg-neutral-50">
        {/* Top Header (opcional, para perfil o breadcrumbs) */}
        <header className="h-16 bg-white border-b border-neutral-200 px-8 flex items-center justify-between sticky top-0 z-0">
           <h1 className="text-lg font-bold text-neutral-700 font-display">
             {menuItems.find(i => location.pathname.startsWith(i.path))?.label || 'Panel'}
           </h1>
           <div className="h-8 w-8 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 font-bold text-xs">
             AD
           </div>
        </header>

        {/* Inyección de vistas */}
        <div className="p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};