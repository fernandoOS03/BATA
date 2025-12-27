import React, { useState } from 'react';
import { X } from 'lucide-react'; 
interface Props {
    isOpen: boolean;
    title: string; 
    onClose: () => void;
    onSave: (name: string) => Promise<void>; 
}

export const CreateCatalogModal = ({ isOpen, title, onClose, onSave }: Props) => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        
        try {
            setLoading(true);
            await onSave(name);
            setName("");
            onClose(); 
        } catch (error) {
            console.error(error);
            alert("Error al guardar el elemento");
        } finally {
            setLoading(false);
        }
    };

    return (
        // Overlay con backdrop-blur para efecto moderno
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300">
            
            {/* Modal Card */}
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md transform transition-all scale-100 p-0 overflow-hidden border border-neutral-100">
                
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-neutral-50">
                    <h3 className="text-lg font-bold text-neutral-800 uppercase tracking-wide">
                        Crear {title}
                    </h3>
                    <button onClick={onClose} className="text-neutral-400 hover:text-neutral-600 transition-colors">
                        <X size={20} />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-6">
                        <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">
                            Nombre
                        </label>
                        <input 
                            autoFocus
                            type="text" 
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder={`Ej. Zapatillas Deportivas...`}
                            className="w-full border border-neutral-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#ee2a2a] focus:ring-1 focus:ring-[#ee2a2a] transition-all placeholder-neutral-400"
                        />
                    </div>
                    
                    <div className="flex justify-end gap-3 pt-2">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="px-5 py-2.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100 rounded border border-transparent hover:border-neutral-200 transition-all"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            disabled={loading || !name.trim()}
                            className="px-6 py-2.5 bg-[#ee2a2a] text-white text-sm font-bold rounded shadow-sm hover:bg-[#d61e1e] active:bg-[#b81b1b] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? "Guardando..." : "Guardar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};