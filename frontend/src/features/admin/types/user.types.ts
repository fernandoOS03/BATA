export interface User {
  id: number;
  name: string;
  lastName: string;
  dni: string;
  birthday: string; // Formato "YYYY-MM-DD"
  email: string;
  role: string; // "USER", "ADMIN", etc.
}
