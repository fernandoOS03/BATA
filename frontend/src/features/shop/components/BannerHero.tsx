import { Link } from "react-router-dom";
import type { BannerData } from "../types/banner.types";

interface Props {
    data: BannerData;
    isFullHeight?: boolean; // Nueva prop opcional
}

export const BannerHero = ({ data, isFullHeight = false }: Props) => {
  return (
    <div className={`relative overflow-hidden group ${
        isFullHeight ? 'h-[500px] md:h-[800px]' : 'h-[600px] md:h-[700px]'
    }`}>
      {/* Imagen de Fondo */}
      <img 
        src={data.backgroundImage} 
        alt={data.categoryName}
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />

      {/* Contenido Central */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
        
        {/* Etiqueta Roja (Categoría) */}
        <span className="bg-[#ee2a2a] text-white px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] mb-4">
          {data.categoryName}
        </span>

        {/* Texto de Oferta */}
        <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter text-center mb-8 drop-shadow-2xl uppercase">
          {data.offerText}
        </h2>

        {/* Botones de Acción */}
        <div className="flex flex-wrap justify-center gap-2 max-w-md">
          {data.actions.map((action, index) => (
            <Link
              key={index}
              to={action.route}
              className="bg-[#ee2a2a] hover:bg-black text-white px-8 py-3.5 text-[11px] font-black uppercase tracking-widest transition-all min-w-[150px] text-center shadow-lg"
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};