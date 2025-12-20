import { api } from '../../../core/api/api'
//se pone el type porque typescript exige una distincion explicita de lo que se puede y no borrar 
//al momento de compilar a js.
import type { AuthResponse, LoginRequest } from '../types/auth.types'

export const authServices = {
    
    //función para logearse
     login : async (credentials : LoginRequest): Promise<AuthResponse> => {
        const response = await api.post('users/login', credentials);
        return response.data
     },
     //funcion para guardar sesion( token + usuario)
     saveSession : (data:AuthResponse) =>{
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
     },
     
     //funcion para cerrar sesion
     logout :() =>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href ='/auth/login'
     },

     //funcion para obtener el usuario
     getUser : () =>{
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
     } 
};
