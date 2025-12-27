import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';
// ⚠️ Importante: Ajusta esta ruta para que apunte a tu servicio real 
import { authServices } from '../features/auth/services/auth.services';

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user } = useAuth(); // Estado de React (puede tardar unos ms)

  // 👇 CORRECCIÓN DEL BUG DE REFRESCO:
  // Leemos directamente del LocalStorage como respaldo.
  // Si React aún no cargó el usuario, usamos el que está guardado en el disco.
  const storedUser = authServices.getUser();
  const currentUser = user || storedUser; 
  
  const isAuthenticated = !!currentUser;

  // 1. Verificación de Login
  if (!isAuthenticated) {
    // Si no hay usuario ni en memoria ni en disco, al Login.
    return <Navigate to="/auth/login" replace />;
  }

  // 2. Verificación de Rol (Solo si se especificó allowedRoles)
  if (allowedRoles && currentUser) {
    const userRole = currentUser.role.toLowerCase();
    const allowed = allowedRoles.map(r => r.toLowerCase());

    // Si el rol del usuario no está en la lista permitida, lo mandamos al Home
    if (!allowed.includes(userRole)) {
      return <Navigate to="/" replace />;
    }
  }

  // Si pasa todas las validaciones, renderiza la ruta hija
  return <Outlet />;
};