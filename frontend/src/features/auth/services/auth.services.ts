import { api } from "../../../core/api/api";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "../types/auth.types";

export const authServices = {
  // Función para logearse
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    // Es buena práctica envolver en try/catch si quieres normalizar errores aquí,
    // pero dejar que burbujee al hook también es válido.
    const response = await api.post<AuthResponse>("/users/login", credentials);
    return response.data;
  },

  // Función para registrarse
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/users/register", data);
    return response.data;
  },

  // Función para guardar sesión (token + usuario)
  saveSession: (data: AuthResponse) => {
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }
  },

  // Función para cerrar sesión
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Redirige forzosamente para limpiar cualquier estado en memoria
    //window.location.href = "/auth/login";
  },

  // Función para obtener el usuario
  getUser: () => {
    const userStr = localStorage.getItem("user");
    try {
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error("Error parsing user from local storage", error);
      return null;
    }
  },

  // Función auxiliar para verificar si está autenticado
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("token");
  },
};
