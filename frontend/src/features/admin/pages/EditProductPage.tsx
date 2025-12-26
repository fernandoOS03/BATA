import { Link, useParams } from "react-router-dom";
// Icons
import { ArrowLeft, Save, Plus, Trash2, Edit, UploadCloud, ChevronRight } from "lucide-react";
// Hooks
import { useEditProduct } from "../hooks/useEditProduct";
import { useCreateCatalogModal } from "../hooks/useCreateCatalogModal";
// Componentes
import { CreateCatalogModal } from "./CreateCatalogModal";
// Servicios
import { catalogService } from "../services/catalog.service";

export const EditProductPage = () => {
  const { id } = useParams();

  // 1. Hook Principal (Lógica del Producto)
  const {
    productData,
    newVariant,
    uploading,
    // Listas
    brands,
    categories,
    materials,
    colors,
    sizes,
    // Funciones
    loadCatalogs,
    handleChange,
    handleVariantChange,
    handleImageUpload,
    addVariant,
    removeVariant,
    editVariant,
    handleSubmit,
  } = useEditProduct(id);

  // 2. Hook del Modal
  const { openModal, modalProps } = useCreateCatalogModal();

  // Estilos reutilizables
  const labelClass = "block text-xs font-bold text-neutral-500 uppercase tracking-wide mb-1.5";
  const inputClass = "w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ee2a2a] focus:ring-1 focus:ring-[#ee2a2a] transition-all bg-white text-neutral-700";
  const sectionClass = "bg-white p-6 rounded shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-neutral-100";
  const addBtnClass = "text-[10px] text-[#ee2a2a] hover:text-white hover:bg-[#ee2a2a] font-bold border border-[#ee2a2a] px-2 py-0.5 rounded transition-colors flex items-center gap-1 uppercase";

  return (
    <div className="max-w-6xl mx-auto pb-20">
      
      {/* 3. Renderizamos el Modal */}
      <CreateCatalogModal {...modalProps} />

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
           <div className="flex items-center gap-2 text-sm text-neutral-400 mb-1">
              <span>Productos</span>
              <ChevronRight size={14} />
              <span className="text-[#ee2a2a] font-medium">Editar</span>
           </div>
           <h1 className="text-2xl font-bold text-neutral-900 font-display">
             Editar Producto <span className="text-neutral-400 text-lg font-normal">#{id}</span>
           </h1>
        </div>
        <Link
          to="/admin/products"
          className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 font-medium transition-colors text-sm border border-neutral-300 px-4 py-2 rounded bg-white hover:bg-neutral-50"
        >
          <ArrowLeft size={16} /> Volver al listado
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* === COLUMNA IZQUIERDA: DATOS === */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* SECCIÓN 1: DATOS GENERALES */}
            <div className={sectionClass}>
                <h2 className="text-lg font-bold text-neutral-800 mb-5 border-b border-neutral-100 pb-2">Información General</h2>
                
                <div className="space-y-5">
                    <div>
                        <label className={labelClass}>Nombre</label>
                        <input type="text" name="name" value={productData.name} onChange={handleChange} className={inputClass} />
                    </div>
                    
                    <div>
                        <label className={labelClass}>Descripción</label>
                        <textarea name="description" rows={3} value={productData.description} onChange={handleChange} className={inputClass} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Marca */}
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className={labelClass}>Marca</label>
                                <button type="button" 
                                    onClick={() => openModal("Nueva Marca", async (name) => { await catalogService.createBrand(name); await loadCatalogs(); })}
                                    className={addBtnClass}>
                                    <Plus size={10} /> Nueva
                                </button>
                            </div>
                            <select name="brandId" value={productData.brandId} onChange={handleChange} className={inputClass}>
                                <option value={0}>Seleccione...</option>
                                {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
                            </select>
                        </div>

                        {/* Categoría */}
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className={labelClass}>Categoría</label>
                                <button type="button"
                                    onClick={() => openModal("Nueva Categoría", async (name) => { await catalogService.createCategory(name); await loadCatalogs(); })}
                                    className={addBtnClass}>
                                    <Plus size={10} /> Nueva
                                </button>
                            </div>
                            <select name="categoryId" value={productData.categoryId} onChange={handleChange} className={inputClass}>
                                <option value={0}>Seleccione...</option>
                                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>

                        {/* Material */}
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className={labelClass}>Material</label>
                                <button type="button"
                                    onClick={() => openModal("Nuevo Material", async (name) => { await catalogService.createMaterial(name); await loadCatalogs(); })}
                                    className={addBtnClass}>
                                    <Plus size={10} /> Nuevo
                                </button>
                            </div>
                            <select name="materialId" value={productData.materialId} onChange={handleChange} className={inputClass}>
                                <option value={0}>Seleccione...</option>
                                {materials.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECCIÓN 2: VARIANTES */}
            <div className={sectionClass}>
                <h2 className="text-lg font-bold text-neutral-800 mb-5 border-b border-neutral-100 pb-2">Gestión de Variantes</h2>

                {/* Formulario Agregar Variante */}
                <div className="bg-neutral-50 p-5 rounded border border-neutral-200 mb-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
                        
                        {/* Color */}
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className={labelClass}>Color</label>
                                <button type="button"
                                    onClick={() => openModal("Nuevo Color", async (name) => { await catalogService.createColor(name); await loadCatalogs(); })}
                                    className={addBtnClass}>
                                    <Plus size={10} />
                                </button>
                            </div>
                            <select name="colorId" value={newVariant.colorId} onChange={handleVariantChange} className={inputClass}>
                                <option value={0}>...</option>
                                {colors.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>

                        {/* Talla */}
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className={labelClass}>Talla</label>
                                <button type="button"
                                    onClick={() => openModal("Nueva Talla", async (name) => { await catalogService.createSize(name); await loadCatalogs(); })}
                                    className={addBtnClass}>
                                    <Plus size={10} />
                                </button>
                            </div>
                            <select name="sizeId" value={newVariant.sizeId} onChange={handleVariantChange} className={inputClass}>
                                <option value={0}>...</option>
                                {sizes.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>

                        {/* Stock */}
                        <div>
                            <label className={labelClass}>Stock</label>
                            <input type="number" name="stock" value={newVariant.stock} onChange={handleVariantChange} className={inputClass} />
                        </div>

                         {/* Extra Price */}
                        <div>
                            <label className={labelClass}>Extra (S/)</label>
                            <input type="number" name="priceModifier" value={newVariant.priceModifier} onChange={handleVariantChange} className={inputClass} />
                        </div>

                         {/* Image Upload */}
                        <div className="col-span-2 md:col-span-4 mt-2">
                             <label className={labelClass}>Imagen Variante</label>
                             <div className="flex gap-3 items-center">
                                <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 border border-dashed border-neutral-400 rounded py-2 hover:bg-white hover:border-[#ee2a2a] hover:text-[#ee2a2a] transition-all text-neutral-500 text-sm bg-white h-[38px]">
                                    <UploadCloud size={16}/>
                                    <span className="truncate">{uploading ? "Subiendo..." : "Subir Foto"}</span>
                                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                </label>

                                {newVariant.imagenUrl && (
                                    <div className="h-[38px] w-[38px] rounded border border-neutral-200 overflow-hidden shrink-0">
                                         <img src={newVariant.imagenUrl} alt="preview" className="h-full w-full object-cover" />
                                    </div>
                                )}
                                
                                <button onClick={addVariant} disabled={uploading} className="bg-neutral-800 text-white px-5 h-[38px] rounded font-bold hover:bg-neutral-900 transition-colors flex items-center gap-2 text-sm shrink-0">
                                    <Plus size={16} /> Agregar
                                </button>
                             </div>
                        </div>
                    </div>
                </div>

                {/* Tabla de Variantes */}
                {productData.variants.length > 0 ? (
                    <div className="overflow-hidden border border-neutral-200 rounded">
                        <table className="min-w-full text-sm">
                            <thead className="bg-neutral-100 text-neutral-600 uppercase text-xs font-bold">
                                <tr>
                                    <th className="py-3 px-4 text-left">Img</th>
                                    <th className="py-3 px-4 text-center">Color ID</th>
                                    <th className="py-3 px-4 text-center">Talla ID</th>
                                    <th className="py-3 px-4 text-center">Stock</th>
                                    <th className="py-3 px-4 text-center">Precio Extra</th>
                                    <th className="py-3 px-4 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100 bg-white">
                                {productData.variants.map((variant, index) => (
                                <tr key={index} className="hover:bg-neutral-50 transition-colors">
                                    <td className="py-2 px-4">
                                    {variant.imagenUrl ? 
                                        <img src={variant.imagenUrl} alt="Var" className="h-9 w-9 object-cover rounded border border-neutral-200" /> 
                                        : <div className="h-9 w-9 bg-neutral-100 rounded flex items-center justify-center text-[10px] text-neutral-400">N/A</div>
                                    }
                                    </td>
                                    <td className="py-2 px-4 text-center text-neutral-600">{variant.colorId}</td>
                                    <td className="py-2 px-4 text-center text-neutral-600">{variant.sizeId}</td>
                                    <td className="py-2 px-4 text-center font-bold text-neutral-800">{variant.stock}</td>
                                    <td className="py-2 px-4 text-center text-green-600 font-medium">
                                        {variant.priceModifier > 0 ? `+ S/${variant.priceModifier}` : '-'}
                                    </td>
                                    <td className="py-2 px-4 text-right">
                                        <div className="flex justify-end gap-1">
                                            <button onClick={() => editVariant(index)} className="text-neutral-400 hover:text-amber-600 p-1.5 rounded hover:bg-amber-50 transition-colors" title="Editar">
                                                <Edit size={16} />
                                            </button>
                                            <button onClick={() => removeVariant(index)} className="text-neutral-400 hover:text-red-600 p-1.5 rounded hover:bg-red-50 transition-colors" title="Eliminar">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-10 text-neutral-400 italic bg-neutral-50 rounded border border-dashed border-neutral-200 text-sm">
                        No hay variantes asignadas a este producto.
                    </div>
                )}
            </div>
        </div>

        {/* === COLUMNA DERECHA: ACCIONES Y PRECIO BASE === */}
        <div className="space-y-6">
            <div className={sectionClass}>
                <h2 className="text-lg font-bold text-neutral-800 mb-4">Precio Base</h2>
                <div>
                    <label className={labelClass}>Monto (S/)</label>
                     <div className="relative">
                        <span className="absolute left-3 top-2.5 text-neutral-500 font-bold">S/</span>
                        <input type="number" name="basePrice" value={productData.basePrice} onChange={handleChange} 
                            className={`${inputClass} pl-8 text-lg font-bold text-neutral-800`} />
                    </div>
                </div>
            </div>

            <button onClick={handleSubmit} className="w-full bg-[#ee2a2a] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#d61e1e] shadow-lg shadow-red-500/20 transition-all flex justify-center items-center gap-2">
                <Save size={20} /> Guardar Cambios
            </button>
        </div>

      </div>
    </div>
  );
};