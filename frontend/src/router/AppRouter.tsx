import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../shared/components/layout/MainLayout';
import { HomePage } from '../features/shop/pages/HomePage';
import { ProductListPage } from '../features/shop/pages/ProductListPage';
import { ProductDetailPage } from '../features/shop/pages/ProductDetailPage';
import { LoginPage } from '../features/auth/pages/LoginPage';

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ProductListPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        
   
        {/* En lugar de redirigir silenciosamente con <Navigate to="/" />, mostramos un error visible */}
        <Route path="*" element={
          <div className="flex flex-col items-center justify-center h-[50vh] text-red-600">
            <h1 className="text-4xl font-bold mb-4">404 - Ruta no encontrada</h1>
            <p className="text-xl text-gray-600">Revisa la URL o la configuración del Router.</p>
            <p className="text-sm text-gray-400 mt-2">Estás viendo esto porque ninguna ruta coincidió.</p>
          </div>
        } />a
      </Route>
    </Routes>
  );
};