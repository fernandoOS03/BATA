import { createContext, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// Imports de tus tipos y servicios
import type { User, AuthContextProps, AuthResponse } from '../types/auth.types';
import { authServices } from '../services/auth.services';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  // 1. ESTADO INICIAL
  const [user, setUser] = useState<User | null>(() => authServices.getUser());

  // 2. FUNCIÓN LOGIN
  const login = (response: AuthResponse) => {
    // Delegamos al servicio el guardado en LocalStorage
    authServices.saveSession(response);
    
    // Actualizamos el estado de React
    setUser(response.user);

    // Redirección inteligente
    if (response.user.role.toUpperCase() === 'ADMIN') {
        navigate('/admin/dashboard');
    } else {
        // Redirige al perfil del usuario
        navigate('/account'); 
    }
  };

  // 3. FUNCIÓN LOGOUT
  const logout = () => {
    authServices.logout();
    setUser(null);
    navigate('/auth/login');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};