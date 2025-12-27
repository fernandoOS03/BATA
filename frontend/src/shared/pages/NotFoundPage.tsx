import { useNavigate } from "react-router-dom";
import { Hammer, HardHat, ChevronLeft, Construction } from "lucide-react";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      {/* Contenedor de Iconos */}
      <div className="relative mb-8">
        <div className="bg-neutral-100 p-8 rounded-full">
          <HardHat size={64} className="text-black" />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-[#ee2a2a] p-3 rounded-full border-4 border-white">
          <Hammer size={24} className="text-white animate-bounce" />
        </div>
      </div>

      {/* Texto Informativo */}
      <div className="text-center max-w-lg">
        <div className="flex items-center justify-center gap-2 mb-2">
            <Construction size={18} className="text-yellow-500" />
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-neutral-400">
                Área en Construcción
            </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black text-neutral-900 mb-4 leading-none">
          INGENIERO <br /> TRABAJANDO
        </h1>
        
        <p className="text-neutral-500 text-sm md:text-base mb-10 leading-relaxed uppercase tracking-widest px-6">
          Estamos remodelando esta sección para ofrecerte la mejor experiencia Bata. 
          Vuelve pronto o sigue explorando nuestro catálogo.
        </p>

        {/* Botón de Acción */}
        <button
          onClick={() => navigate("/")}
          className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-black font-pj rounded-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-neutral-800 tracking-widest text-xs"
        >
          <ChevronLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          VOLVER AL INICIO
        </button>
      </div>

      {/* Detalle decorativo inferior */}
      <div className="fixed bottom-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-black to-yellow-400"></div>
    </div>
  );
};