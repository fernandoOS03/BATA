import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 1. Importamos el hook
import type { Product } from '../../../shared/types/product.types';

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate(); // 2. Inicializamos el hook
  const mainVariant = product.variants[0];
  const hasStock = product.variants.some((v) => v.stock > 0);

  // Función para ir al detalle
  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  // Función para el botón de carrito (evita que se dispare el click de la tarjeta)
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    console.log("Añadir al carrito:", product.name);
  };

  return (
    <div 
      onClick={handleCardClick} // 3. Asignamos el evento de clic a TODA la tarjeta
      style={{ 
        border: '1px solid #ccc', 
        padding: '10px', 
        margin: '10px', 
        borderRadius: '8px',
        cursor: 'pointer' // 4. Cambiamos el cursor para que parezca un enlace
      }}
    >
      {/* Imagen */}
      <div>
        {mainVariant?.imagenUrl ? (
          <img 
            src={mainVariant.imagenUrl} 
            alt={product.name} 
            style={{ width: '100%', height: '200px', objectFit: 'contain' }}
          />
        ) : (
          <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>
            Sin imagen
          </div>
        )}
        
        {/* Badge de marca */}
        <div style={{ marginTop: '5px' }}>
          <strong>{product.brand}</strong>
        </div>

        {!hasStock && (
          <div style={{ color: 'red', fontWeight: 'bold' }}>
            Agotado
          </div>
        )}
      </div>

      {/* Información del producto */}
      <div style={{ marginTop: '10px' }}>
        <h3 style={{ margin: '0 0 5px 0' }}>{product.name}</h3>
        <p style={{ margin: '0 0 10px 0', color: '#666' }}>{product.category}</p>
        
        {/* Precio y botón */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.8em', display: 'block' }}>Desde</span>
            <span style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
              S/. {product.basePrice.toFixed(2)}
            </span>
          </div>

          <button 
            disabled={!hasStock} 
            onClick={handleAddToCart} // Asignamos el evento con stopPropagation
            title={!hasStock ? "Agotado" : "Agregar al carrito"}
            style={{ cursor: !hasStock ? 'not-allowed' : 'pointer' }}
          >
            <ShoppingCart className="w-5 h-5"/>
          </button>
        </div>
      </div>
    </div>
  );
};