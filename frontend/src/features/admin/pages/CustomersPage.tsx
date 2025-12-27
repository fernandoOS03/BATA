import { Search, Mail, Calendar, CreditCard, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCustomers } from '../hooks/useCustomers';

export const CustomersPage = () => {
    const { 
        users, loading, searchTerm, setSearchTerm, getInitials,
        // Variables de paginación
        page, totalPages, totalElements, nextPage, prevPage, goToPage 
    } = useCustomers();

    if (loading) return <div className="flex h-64 items-center justify-center text-neutral-500">Cargando...</div>;

    return (
        <div className="max-w-6xl mx-auto space-y-6 pb-20">
            
            {/* Header y Buscador (Igual que antes) */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900 font-display">Cartera de Clientes</h1>
                    <p className="text-sm text-neutral-500">Gestión de usuarios registrados</p>
                </div>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-2.5 text-neutral-400" size={18} />
                    <input 
                        type="text" placeholder="Buscar en esta página..." 
                        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded text-sm focus:outline-none focus:border-[#ee2a2a] focus:ring-1 focus:ring-[#ee2a2a] transition-all bg-white"
                    />
                </div>
            </div>

            {/* Tabla Card */}
            <div className="bg-white rounded border border-neutral-200 shadow-[0_2px_10px_rgba(0,0,0,0.03)] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-neutral-50 border-b border-neutral-200">
                            <tr>
                                <th className="px-6 py-4 font-bold text-xs text-neutral-500 uppercase tracking-wider">Usuario</th>
                                <th className="px-6 py-4 font-bold text-xs text-neutral-500 uppercase tracking-wider">Documento</th>
                                <th className="px-6 py-4 font-bold text-xs text-neutral-500 uppercase tracking-wider">Contacto</th>
                                <th className="px-6 py-4 font-bold text-xs text-neutral-500 uppercase tracking-wider">Fecha Nac.</th>
                                <th className="px-6 py-4 text-right font-bold text-xs text-neutral-500 uppercase tracking-wider">Rol</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-neutral-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-[#ee2a2a] font-bold text-xs">
                                                {getInitials(user.name, user.lastName)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-neutral-800 capitalize">{user.name} {user.lastName}</p>
                                                <p className="text-[10px] text-neutral-400 uppercase">ID: #{user.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-neutral-600 font-medium"><div className="flex items-center gap-2"><CreditCard size={16} className="text-neutral-400"/> {user.dni}</div></td>
                                    <td className="px-6 py-4 text-neutral-600"><div className="flex items-center gap-2"><Mail size={16} className="text-neutral-400"/> {user.email}</div></td>
                                    <td className="px-6 py-4 text-neutral-600"><div className="flex items-center gap-2"><Calendar size={16} className="text-neutral-400"/> {user.birthday}</div></td>
                                    <td className="px-6 py-4 text-right">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${user.role === 'ADMIN' ? 'bg-red-50 text-[#ee2a2a] border-red-100' : 'bg-neutral-100 text-neutral-600 border-neutral-200'}`}>{user.role}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* === FOOTER DE PAGINACIÓN === */}
                <div className="border-t border-neutral-200 bg-neutral-50 p-4 flex items-center justify-between">
                    
                    <span className="text-xs text-neutral-500 font-medium">
                        Página <span className="text-neutral-900 font-bold">{page + 1}</span> de <span className="text-neutral-900 font-bold">{totalPages}</span> 
                        <span className="ml-1">({totalElements} registros)</span>
                    </span>

                    <div className="flex gap-2">
                        <button 
                            onClick={prevPage} disabled={page === 0}
                            className="p-2 bg-white border border-neutral-200 rounded hover:border-[#ee2a2a] hover:text-[#ee2a2a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft size={16} />
                        </button>

                        {/* Generar botones de página */}
                        {Array.from({ length: totalPages }).map((_, i) => (
                             <button
                                key={i}
                                onClick={() => goToPage(i)}
                                className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded transition-colors
                                    ${page === i 
                                        ? 'bg-[#ee2a2a] text-white shadow-sm' 
                                        : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button 
                            onClick={nextPage} disabled={page === totalPages - 1}
                            className="p-2 bg-white border border-neutral-200 rounded hover:border-[#ee2a2a] hover:text-[#ee2a2a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};