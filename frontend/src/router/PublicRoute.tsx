import { Navigate ,Outlet} from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';

export const PublicRoute = () => {
  const { user, isAuthenticated } = useAuth();

  if (isAuthenticated && user) {
    // Si ya está logueado, redirigir según su rol
    if (user.role.toUpperCase() === 'ADMIN') {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/account" replace />;
    }
  }

  return <Outlet />;
};