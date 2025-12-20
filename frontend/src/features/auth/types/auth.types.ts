//======== Lo que se enviara al backend ========
export interface LoginRequest {
    email : string;
    password : string;
}

//======== Lo que se recibira del backend ========
export interface AuthResponse {
    token : string;
    user : User;
}

//======== El usuario que se recibira del backend ========
export interface User {
    id : string;
    name : string;
    lastName : string;
    email : string;
    role : string;
    
}
