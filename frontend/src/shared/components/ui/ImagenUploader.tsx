import { useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '../../../core/api/api';

interface Props {
  onImageUploaded: (url: string) => void; // Callback para devolver la URL al padre
  initialImage?: string; // Por si queremos editar y ya hay foto
}

export const ImageUploader = ({ onImageUploaded, initialImage }: Props) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(initialImage || null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Validaciones básicas
    if (!file.type.startsWith('image/')) {
      toast.error('El archivo debe ser una imagen');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB
      toast.error('La imagen no puede pesar más de 5MB');
      return;
    }

    try {
      setUploading(true);
      
      // 2. Preparar el envío (FormData es necesario para archivos)
      const formData = new FormData();
      formData.append('file', file);

      // 3. Enviar al Backend
      const response = await api.post<{ url: string }>('/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const url = response.data.url;
      
      // 4. Actualizar estado y avisar al padre
      setPreview(url);
      onImageUploaded(url); 
      toast.success('Imagen subida con éxito');

    } catch (error) {
      console.error(error);
      toast.error('Error al subir la imagen');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onImageUploaded(''); // Limpiamos la URL en el formulario padre
  };

  return (
    <div className="w-full">
      {preview ? (
        // --- ESTADO: IMAGEN CARGADA ---
        <div className="relative w-full h-48 bg-gray-100 rounded-lg border border-gray-200 overflow-hidden group">
          <img 
            src={preview} 
            alt="Vista previa" 
            className="w-full h-full object-contain" 
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
            title="Eliminar imagen"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        // --- ESTADO: SUBIR ---
        <label className={`
          flex flex-col items-center justify-center w-full h-48 
          border-2 border-dashed rounded-lg cursor-pointer transition-colors
          ${uploading ? 'bg-gray-50 border-gray-300' : 'bg-white border-gray-300 hover:border-brand-500 hover:bg-brand-50'}
        `}>
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploading ? (
              <>
                <Loader2 className="w-8 h-8 text-brand-500 animate-spin mb-3" />
                <p className="text-sm text-gray-500">Subiendo a la nube...</p>
              </>
            ) : (
              <>
                <Upload className="w-8 h-8 text-gray-400 mb-3" />
                <p className="text-sm text-gray-500 font-medium">Click para subir imagen</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG (Max. 5MB)</p>
              </>
            )}
          </div>
          <input 
            type="file" 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      )}
    </div>
  );
};