import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../shared/components/layout/MainLayout';

// Features Shop
import { HomePage } from '../features/shop/pages/HomePage';
import { ProductListPage } from '../features/shop/pages/ProductListPage';
import { ProductDetailPage } from '../features/shop/pages/ProductDetailPage';
import { CartPage } from '../features/cart/pages/CartPage';

// Features Orders (NUEVO)
import { CheckoutPage } from '../features/orders/pages/CheckoutPage';
import { OrderSuccessPage } from '../features/orders/pages/OrderSuccessPage';

// Features Auth
import { AuthPage } from '../features/auth/pages/AuthPage';

// Shared
import { NotFoundPage } from '../shared/pages/NotFoundPage';

// Features Account
import { AccountLayout } from '../features/account/components/AccountLayout';
import { AccountOverviewPage } from '../features/account/pages/AccountOverviewPage';

// Features Admin
import { AdminLayout } from '../features/admin/components/AdminLayout';
import { CreateProductPage } from '../features/admin/pages/CreateProductpage';
import { CustomersPage } from '../features/admin/pages/CustomersPage';
import { AdminProductListPage } from '../features/admin/pages/AdminProductListPage';
import { EditProductPage } from '../features/admin/pages/EditProductPage';
import { DashboardView } from '../features/admin/pages/DashboardView';

// Guards
import { PublicRoute } from './PublicRoute';
import { ProtectedRoute } from './ProtectedRoute';

export const AppRouter = () => {
  return (
    <Routes>
      
      {/* ======================================================= */}
      {/* ZONA PÚBLICA Y DE CLIENTE (Con Navbar y Footer)    */}
      {/* ======================================================= */}
      <Route element={<MainLayout />}>
        
        {/* Rutas Públicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ProductListPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        
        {/* ✅ RUTAS DE CHECKOUT */}
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkout/success" element={<OrderSuccessPage />} />

        {/* Rutas Protegidas de Usuario (Mi Cuenta) */}
        <Route element={<ProtectedRoute />}>
           <Route path="/account" element={<AccountLayout />}>
              <Route index element={<AccountOverviewPage />} />
              {/* Aquí agregarás profile, orders, etc. en el futuro */}
           </Route>
        </Route>

        {/* Gestión de Errores 404 (Dentro del Layout para mantener Header/Footer) */}
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />

      </Route> 


      {/* ======================================================= */}
      {/* ZONA DE AUTENTICACIÓN (Sin Navbar, solo Login)     */}
      {/* ======================================================= */}
      <Route element={<PublicRoute />}>
        <Route path="/auth/login" element={<AuthPage />} />
        <Route path="/auth/register" element={<AuthPage />} />
      </Route>


      {/* ======================================================= */}
      {/* ZONA DE ADMIN (Layout diferente, sin Footer usual)  */}
      {/* ======================================================= */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard"  element={<DashboardView />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="products/create" element={<CreateProductPage />} /> 
          <Route path="products" element={<AdminProductListPage />} /> 
          <Route path="products/edit/:id" element={<EditProductPage />} /> 
        </Route>
      </Route>

    </Routes>
  );
};