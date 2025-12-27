import axios from "axios";

//1 creación de la instancia de axios
export const api = axios.create({
  baseURL: "http://localhost:8080/api", //url del bacjkend de spring
  timeout: 10000, //si el backend no responde en 10 segundos, se cancela la peticion
  headers: {
    "Content-Type": "application/json",
  },
});

//2 interceptores
//--- Se ejecuta antes que cualquier petición salga del navegador
api.interceptors.request.use(
  (config) => {
    //--- buscamos si hay un token en localStorage
    const token = localStorage.getItem("token");
    //--- si hay token , lo pegamos en la cabecera de la petción, para que luego el backend lpueda validar
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Interceptor de respuesta (para manejar errores globales como 401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el backend dice "No autorizado" (Token vencido o inválido)
    if (error.response && error.response.status === 401) {
      // Borramos el token "malo"
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Redirigimos al login
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);
