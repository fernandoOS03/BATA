import { Link, useNavigate } from 'react-router-dom';
import { useAdminProducts } from '../hooks/useAdminProducts';
import { Edit, Trash2, Plus, Loader2 } from 'lucide-react';

export const AdminProductListPage = () => {
  const { products, loading, handleDelete } = useAdminProducts();
  const navigate = useNavigate();

  if (loading) return (
      <div className="flex h-64 items-center justify-center text-neutral-500 gap-2">
          <Loader2 className="animate-spin" /> Cargando inventario... 
      </div>
  );

  return (
    <div className="space-y-6">
      
      {/* Encabezado */}
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-2xl font-bold text-neutral-900 font-display">Mis Productos</h1>
            <p className="text-sm text-neutral-500">Gestión del catálogo actual</p>
        </div>
        <Link 
          to="/admin/products/create" 
          className="bg-[#ee2a2a] text-white px-5 py-2.5 rounded shadow-button hover:bg-[#d61e1e] transition-all font-bold text-sm flex items-center gap-2"
        >
          <Plus size={18} /> Nuevo Producto
        </Link>
      </div>

      {/* Tabla Card */}
      <div className="bg-white rounded border border-neutral-200 shadow-[0_2px_10px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-4 font-bold text-xs text-neutral-500 uppercase tracking-wider">Imagen</th>
                <th className="px-6 py-4 font-bold text-xs text-neutral-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-4 font-bold text-xs text-neutral-500 uppercase tracking-wider">Precio</th>
                <th className="px-6 py-4 font-bold text-xs text-neutral-500 uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-neutral-50 transition-colors group">
                    <td className="px-6 py-3">
                      {product.variants?.[0]?.imagenUrl ? (
                         <div className="h-12 w-12 rounded border border-neutral-200 bg-white p-0.5">
                            <img 
                                src={product.variants[0].imagenUrl} 
                                alt={product.name}
                                className="w-full h-full object-cover rounded-sm"
                            />
                         </div>
                      ) : ( 
                         <div className="h-12 w-12 rounded bg-neutral-100 flex items-center justify-center text-xs text-neutral-400 italic">
                             N/A
                         </div> 
                      )}
                    </td>
                    <td className="px-6 py-3 font-medium text-neutral-800">{product.name}</td>
                    <td className="px-6 py-3 font-bold text-neutral-600">S/ {product.basePrice.toFixed(2)}</td>
                    <td className="px-6 py-3 text-right">
                        <div className="flex justify-end items-center gap-2">
                            <button 
                                onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                                className="text-neutral-400 hover:text-[#ee2a2a] hover:bg-red-50 p-2 rounded transition-colors"
                                title="Editar"
                            >
                                <Edit size={18} />
                            </button>
                            <button 
                                onClick={() => handleDelete(product.id)} 
                                className="text-neutral-400 hover:text-red-700 hover:bg-red-50 p-2 rounded transition-colors"
                                title="Eliminar"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-12">
                    <div className="flex flex-col items-center justify-center text-neutral-400">
                        <div className="bg-neutral-100 p-4 rounded-full mb-3">
                            <Plus size={24} className="text-neutral-300"/>
                        </div>
                        <p className="font-medium">No hay productos registrados.</p>
                        <p className="text-xs">Crea el primero para comenzar a vender.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};