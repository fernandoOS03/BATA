import { useState, useEffect } from "react";
import { userService } from "../services/user.service";
import type { User } from "../types/user.types";

export const useCustomers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // --- ESTADOS DE PAGINACIÓN ---
  const [page, setPage] = useState(0); // Página actual (empieza en 0)
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // --- BUSCADOR ---
  const [searchTerm, setSearchTerm] = useState("");

  // Cada vez que cambie 'page', recargamos los datos
  useEffect(() => {
    loadUsers(page);
  }, [page]);

  const loadUsers = async (pageNo: number) => {
    setLoading(true);
    try {
      const data = await userService.getAllUsers(pageNo, 10); // Pedimos 10 por página

      setUsers(data.content); // La lista real
      setTotalPages(data.totalPages); // Total de hojitas
      setTotalElements(data.totalElements); // Total de usuarios
    } catch (err) {
      console.error("Error cargando usuarios:", err);
    } finally {
      setLoading(false);
    }
  };

  // Funciones para cambiar de página
  const nextPage = () => {
    if (page < totalPages - 1) setPage((p) => p + 1);
  };
  const prevPage = () => {
    if (page > 0) setPage((p) => p - 1);
  };
  const goToPage = (n: number) => setPage(n);

  // Helpers visuales
  const getInitials = (name: string, lastName: string) =>
    `${name.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  // Filtrado visual (Opcional: filtra solo lo que se ve en la página actual)
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.dni.includes(searchTerm)
  );

  return {
    // Datos
    users: filteredUsers,
    loading,
    // Buscador
    searchTerm,
    setSearchTerm,
    getInitials,
    // Paginación (Exportamos todo esto para la vista)
    page,
    totalPages,
    totalElements,
    nextPage,
    prevPage,
    goToPage,
  };
};
