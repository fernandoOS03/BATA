import { Link } from "react-router-dom";
import { ArrowLeft, Save, UploadCloud, Plus, Trash2, Check } from "lucide-react"; 

// Hooks
import { useCreateProduct } from "../hooks/useCreateProduct";
import { useCatalogs } from "../hooks/useCatalogs";
import { useCreateCatalogModal } from "../hooks/useCreateCatalogModal"; 

// Componentes y Constantes
import { CreateCatalogModal } from "./CreateCatalogModal"; 
import { GENDER_OPTIONS } from "../constants/product.constsants";
import { catalogService } from "../services/catalog.service"; 

export const CreateProductPage = () => {
  const {
    productData,
    newVariant,
    uploading,
    handleChange,
    handleVariantChange,
    handleImageUpload,
    addVariant,
    removeVariant,
    handleSubmit
  } = useCreateProduct();

  // 1. Obtenemos datos Y la función de recarga
  const { brands, categories, materials, colors, sizes, loading: loadingCatalogs, loadCatalogs } = useCatalogs();
  
  // 2. Hook del Modal
  const { openModal, modalProps } = useCreateCatalogModal();

  // Clases utilitarias (Agregué addBtnClass)
  const labelClass = "block text-xs font-bold text-neutral-500 uppercase tracking-wide mb-1.5";
  const inputClass = "w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ee2a2a] focus:ring-1 focus:ring-[#ee2a2a] transition-all bg-white";
  const addBtnClass = "text-[10px] text-[#ee2a2a] hover:text-white hover:bg-[#ee2a2a] font-bold border border-[#ee2a2a] px-2 py-0.5 rounded transition-colors flex items-center gap-1 uppercase ml-auto"; // ml-auto para empujar a la derecha

  if (loadingCatalogs) return <div className="p-10 text-center">Cargando opciones...</div>;

  return (
    <div className="max-w-6xl mx-auto pb-20">
      
      {/* 3. MODAL DE CREACIÓN RÁPIDA */}
      <CreateCatalogModal {...modalProps} />

      {/* Header Page */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
            <h1 className="text-2xl font-bold text-neutral-900 font-display">Nuevo Producto</h1>
            <p className="text-neutral-500 text-sm">Ingresa los detalles para el catálogo.</p>
        </div>
        <Link
          to="/admin/products/" 
          className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 font-medium transition-colors text-sm border border-neutral-300 px-4 py-2 rounded bg-white hover:bg-neutral-50"
        >
          <ArrowLeft size={16}/> Cancelar y Volver
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* === COLUMNA IZQUIERDA: DATOS GENERALES === */}
        <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-neutral-100">
                <h2 className="text-lg font-bold text-neutral-800 mb-5 border-b border-neutral-100 pb-2">Información Básica</h2>
                
                <div className="space-y-5">
                    <div>
                        <label className={labelClass}>Nombre del Producto</label>
                        <input type="text" name="name" value={productData.name} onChange={handleChange}
                            className={inputClass} placeholder="Ej. North Star Urbanas 2024" />
                    </div>

                    <div>
                        <label className={labelClass}>Descripción</label>
                        <textarea name="description" value={productData.description} onChange={handleChange} rows={4}
                            className={inputClass} placeholder="Detalles del producto..." />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {/* MARCA + BOTÓN NUEVA */}
                         <div>
                            <div className="flex items-center justify-between mb-1">
                                <label className={labelClass.replace('mb-1.5', '')}>Marca</label>
                                <button type="button" 
                                    onClick={() => openModal("Nueva Marca", async (name) => { await catalogService.createBrand(name); await loadCatalogs(); })}
                                    className={addBtnClass}>
                                    <Plus size={10} /> Nueva
                                </button>
                            </div>
                            <select name="brandId" value={productData.brandId} onChange={handleChange} className={inputClass}>
                                <option value={0}>Seleccionar...</option>
                                {brands.map(brand => <option key={brand.id} value={brand.id}>{brand.name}</option>)}
                            </select>
                        </div>

                        {/* CATEGORÍA + BOTÓN NUEVA */}
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label className={labelClass.replace('mb-1.5', '')}>Categoría</label>
                                <button type="button" 
                                    onClick={() => openModal("Nueva Categoría", async (name) => { await catalogService.createCategory(name); await loadCatalogs(); })}
                                    className={addBtnClass}>
                                    <Plus size={10} /> Nueva
                                </button>
                            </div>
                            <select name="categoryId" value={productData.categoryId} onChange={handleChange} className={inputClass}>
                                <option value={0}>Seleccionar...</option>
                                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* MATERIAL + BOTÓN NUEVO */}
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label className={labelClass.replace('mb-1.5', '')}>Material</label>
                                <button type="button" 
                                    onClick={() => openModal("Nuevo Material", async (name) => { await catalogService.createMaterial(name); await loadCatalogs(); })}
                                    className={addBtnClass}>
                                    <Plus size={10} /> Nuevo
                                </button>
                            </div>
                            <select name="materialId" value={productData.materialId} onChange={handleChange} className={inputClass}>
                                <option value={0}>Seleccionar...</option>
                                {materials.map(mat => <option key={mat.id} value={mat.id}>{mat.name}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className={labelClass}>Género</label>
                            <select name="gender" value={productData.gender} onChange={handleChange} className={inputClass}>
                                <option value="">Seleccionar...</option>
                                {GENDER_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* === GESTIÓN DE VARIANTES === */}
            <div className="bg-white p-6 rounded shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-neutral-100">
                <h2 className="text-lg font-bold text-neutral-800 mb-5 border-b border-neutral-100 pb-2">Variantes y Stock</h2>

                <div className="bg-neutral-50 p-5 rounded border border-neutral-200 mb-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
                        
                        {/* COLOR + BOTÓN NUEVO */}
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label className={labelClass.replace('mb-1.5', '')}>Color</label>
                                <button type="button" 
                                    onClick={() => openModal("Nuevo Color", async (name) => { await catalogService.createColor(name); await loadCatalogs(); })}
                                    className={addBtnClass}>
                                    <Plus size={10} />
                                </button>
                            </div>
                            <select name="colorId" value={newVariant.colorId} onChange={handleVariantChange} className={inputClass}>
                                <option value={0}>--</option>
                                {colors.map(col => <option key={col.id} value={col.id}>{col.name}</option>)}
                            </select>
                        </div>

                        {/* TALLA + BOTÓN NUEVA */}
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label className={labelClass.replace('mb-1.5', '')}>Talla</label>
                                <button type="button" 
                                    onClick={() => openModal("Nueva Talla", async (name) => { await catalogService.createSize(name); await loadCatalogs(); })}
                                    className={addBtnClass}>
                                    <Plus size={10} />
                                </button>
                            </div>
                            <select name="sizeId" value={newVariant.sizeId} onChange={handleVariantChange} className={inputClass}>
                                <option value={0}>--</option>
                                {sizes.map(siz => <option key={siz.id} value={siz.id}>{siz.name}</option>)}
                            </select>
                        </div>
                        
                        <div>
                            <label className={labelClass}>Stock</label>
                            <input type="number" name="stock" value={newVariant.stock} onChange={handleVariantChange} className={inputClass} placeholder="0"/>
                        </div>
                         <div>
                            <label className={labelClass}>Extra (S/)</label>
                            <input type="number" name="priceModifier" value={newVariant.priceModifier} onChange={handleVariantChange} className={inputClass} placeholder="0.00"/>
                        </div>
                        
     {/* ... dentro de tu grid de variantes ... */}

<div className="col-span-2 md:col-span-4 mt-2">
    <label className={labelClass}>Imagen de Variante</label>
    
    <div className="flex gap-3 items-center">
        {/* 1. BOTÓN DE SUBIDA CON CAMBIO DE COLOR */}
        <label className={`flex-1 cursor-pointer flex items-center justify-center gap-2 border rounded py-2 transition-all text-sm h-[38px] select-none
            ${newVariant.imagenUrl 
                ? 'border-green-500 bg-green-50 text-green-700 font-bold shadow-sm' // ESTILO CUANDO YA HAY FOTO
                : 'border-dashed border-neutral-400 text-neutral-500 hover:bg-white hover:border-[#ee2a2a] hover:text-[#ee2a2a] bg-white' // ESTILO DEFAULT
            }`}>
            
            {/* Cambiamos el icono y texto según estado */}
            {uploading ? (
                <UploadCloud size={16} className="animate-bounce" />
            ) : newVariant.imagenUrl ? (
                <Check size={18} /> 
            ) : (
                <UploadCloud size={18} />
            )}
            
            <span className="truncate">
                {uploading 
                    ? "Subiendo..." 
                    : newVariant.imagenUrl 
                        ? "¡Imagen Cargada!" 
                        : "Subir Foto"
                }
            </span>
            
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </label>

        {/* 2. LA PREVISUALIZACIÓN (El cuadrito al costado) */}
        {newVariant.imagenUrl && (
            <div className="h-[38px] w-[38px] rounded border border-neutral-200 overflow-hidden shrink-0 animate-fade-in bg-white shadow-sm">
                 <img 
                    src={newVariant.imagenUrl} 
                    alt="preview" 
                    className="h-full w-full object-cover" 
                 />
            </div>
        )}
        
        {/* 3. BOTÓN AGREGAR */}
        <button 
            onClick={addVariant} 
            disabled={uploading} 
            className="bg-neutral-800 text-white px-5 h-[38px] rounded font-bold hover:bg-neutral-900 transition-colors flex items-center gap-2 text-sm shrink-0 shadow-sm"
        >
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
                            <th className="py-3 px-4 text-left">Imagen</th>
                            <th className="py-3 px-4 text-center">Color</th>
                            <th className="py-3 px-4 text-center">Talla</th>
                            <th className="py-3 px-4 text-center">Stock</th>
                            <th className="py-3 px-4 text-center">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 bg-white">
                            {productData.variants.map((v, i) => {
                                const colorName = colors.find(c => c.id == v.colorId)?.name || v.colorId;
                                const sizeName = sizes.find(s => s.id == v.sizeId)?.name || v.sizeId;
                                return (
                                <tr key={i} className="hover:bg-neutral-50 transition-colors">
                                    <td className="py-2 px-4">
                                        <img src={v.imagenUrl} alt="" className="h-10 w-10 mx-auto object-cover rounded border border-neutral-200"/>
                                    </td>
                                    <td className="py-2 px-4 text-center font-medium">{colorName}</td>
                                    <td className="py-2 px-4 text-center font-medium">{sizeName}</td>
                                    <td className="py-2 px-4 text-center">{v.stock} u.</td>
                                    <td className="py-2 px-4 text-center">
                                        <button onClick={() => removeVariant(i)} className="text-neutral-400 hover:text-red-600 p-1 rounded transition-colors">
                                            <Trash2 size={18}/>
                                        </button>
                                    </td>
                                </tr>
                                )
                            })}
                        </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-8 text-neutral-400 italic bg-neutral-50 rounded border border-dashed border-neutral-200 text-sm">
                        No has agregado variantes todavía.
                    </div>
                )}
            </div>
        </div>

        {/* === COLUMNA DERECHA: PRECIO Y ACCIÓN === */}
        <div className="space-y-6">
            <div className="bg-white p-6 rounded shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-neutral-100">
                <h2 className="text-lg font-bold text-neutral-800 mb-4">Precio</h2>
                <div>
                    <label className={labelClass}>Precio Base (S/)</label>
                    <div className="relative">
                        <span className="absolute left-3 top-2.5 text-neutral-500 font-bold">S/</span>
                        <input type="number" name="basePrice" value={productData.basePrice} onChange={handleChange}
                        className={`${inputClass} pl-8 text-lg font-bold text-neutral-800`} placeholder="0.00" />
                    </div>
                </div>
            </div>

             <button 
                onClick={handleSubmit}
                className="w-full bg-[#ee2a2a] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#d61e1e] shadow-lg shadow-red-500/20 transition-all flex justify-center items-center gap-2">
                <Save size={20} /> Guardar Producto
             </button>
        </div>

      </div>
    </div>
  );
};