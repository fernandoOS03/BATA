import { useState, useCallback } from "react";

interface ModalConfig {
  title: string;
  onSave: (name: string) => Promise<void>;
}

export const useCreateCatalogModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<ModalConfig>({
    title: "",
    onSave: async () => {}, // Función vacía por defecto
  });

  // Función para abrir el modal con una configuración específica
  const openModal = useCallback(
    (title: string, onSave: (name: string) => Promise<void>) => {
      setConfig({ title, onSave });
      setIsOpen(true);
    },
    []
  );

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Objeto con las props listas para pasar al componente
  const modalProps = {
    isOpen,
    title: config.title,
    onClose: closeModal,
    onSave: config.onSave,
  };

  return {
    openModal,
    closeModal,
    modalProps, // Úsalo así: <CreateCatalogModal {...modalProps} />
  };
};
