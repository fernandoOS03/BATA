//======== Lo que se enviara al backend ========
export interface LoginRequest {
  email: string;
  password: string;
}

//======== Lo que se recibira del backend ========
export interface AuthResponse {
  token: string;
  user: User;
}

//======== El usuario que se recibira del backend ========
export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: string;
}

export interface RegisterRequest {
  name: string;
  lastName: string;
  dni: string;
  birthday: string;
  email: string;
  password: string;
}

export interface AuthContextProps {
  user: User | null;
  login: (response: AuthResponse) => void;
  logout: () => void;
  isAuthenticated: boolean;
}
