import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { authServices } from "../services/auth.services";
import type { RegisterRequest } from "../types/auth.types";

export const useRegister = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<RegisterRequest>({
    name: "",
    lastName: "",
    dni: "",
    birthday: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await authServices.register(formData);
      authServices.saveSession(response); // Auto-login al registrarse
      alert("¡Bienvenido a Bata! Tu cuenta ha sido creada.");
      navigate("/");
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || "Error al crear la cuenta.");
      } else {
        setError("Error al crear la cuenta.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { formData, loading, error, handleChange, handleSubmit };
};
