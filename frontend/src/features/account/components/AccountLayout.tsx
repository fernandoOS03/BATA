import { Outlet } from 'react-router-dom';
import { AccountSidebar } from './AccountSidebar';

export const AccountLayout = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 bg-white shadow-sm rounded-xl overflow-hidden min-h-[600px] border border-gray-100">
        {/* Sidebar */}
        <AccountSidebar />
        
        {/* Contenido Dinámico (Las páginas) */}
        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};