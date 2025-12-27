import { 
    TrendingUp, 
    ShoppingBag, 
    Users, 
    Package, 
    ArrowRight, 
    AlertCircle, 
    Clock,  
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const DashboardView = () => {

    // --- DATOS MOCK (Simulando Backend) ---
    const stats = [
        { label: 'Ventas del Día', value: 'S/ 2,540.00', icon: TrendingUp, change: '+15% vs ayer', positive: true },
        { label: 'Pedidos Pendientes', value: '12', icon: Clock, change: '4 urgentes', positive: false },
        { label: 'Total Productos', value: '345', icon: Package, change: '+12 nuevos', positive: true },
        { label: 'Clientes Nuevos', value: '28', icon: Users, change: 'Este mes', positive: true },
    ];

    const recentOrders = [
        { id: 'ORD-001', customer: 'Carlos Perez', total: 'S/ 249.90', status: 'PENDING', items: 2 },
        { id: 'ORD-002', customer: 'Maria Rodriguez', total: 'S/ 129.00', status: 'COMPLETED', items: 1 },
        { id: 'ORD-003', customer: 'Jorge Luis', total: 'S/ 89.90', status: 'SHIPPED', items: 1 },
        { id: 'ORD-004', customer: 'Ana Torres', total: 'S/ 450.00', status: 'PENDING', items: 3 },
    ];

    const lowStockProducts = [
        { name: 'North Star Urbanas', size: '40', stock: 2 },
        { name: 'Power Running Pro', size: '42', stock: 1 },
        { name: 'Bata Comfit Sandalias', size: '38', stock: 0 },
    ];

    // --- ESTILOS REUTILIZABLES ---
    const cardClass = "bg-white p-6 rounded border border-neutral-200 shadow-[0_2px_10px_rgba(0,0,0,0.03)]";

    return (
        <div className="max-w-6xl mx-auto pb-20 space-y-8">
            
            {/* 1. HEADER */}
            <div>
                <h1 className="text-2xl font-bold text-neutral-900 font-display">Dashboard</h1>
                <p className="text-sm text-neutral-500">Resumen de actividad de la tienda</p>
            </div>

            {/* 2. KPI CARDS (Métricas Clave) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className={cardClass}>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs font-bold text-neutral-500 uppercase tracking-wide">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-neutral-900 mt-1">{stat.value}</h3>
                            </div>
                            <div className="p-2.5 bg-red-50 rounded-full text-[#ee2a2a]">
                                <stat.icon size={20} />
                            </div>
                        </div>
                        <div className={`mt-3 text-xs font-medium flex items-center gap-1 
                            ${stat.positive ? 'text-green-600' : 'text-amber-600'}`}>
                            {stat.positive ? '↑' : '•'} {stat.change}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* 3. PEDIDOS RECIENTES (Tabla Principal) */}
                <div className={`lg:col-span-2 ${cardClass} p-0 overflow-hidden`}>
                    <div className="p-6 border-b border-neutral-100 flex justify-between items-center">
                        <h2 className="font-bold text-neutral-800">Pedidos Recientes</h2>
                        <Link to="/admin/orders" className="text-xs font-bold text-[#ee2a2a] hover:underline flex items-center gap-1">
                            Ver Todo <ArrowRight size={12}/>
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left">
                            <thead className="bg-neutral-50 text-neutral-500 text-xs uppercase font-bold">
                                <tr>
                                    <th className="px-6 py-3">Pedido</th>
                                    <th className="px-6 py-3">Cliente</th>
                                    <th className="px-6 py-3">Estado</th>
                                    <th className="px-6 py-3 text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100">
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-neutral-50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-neutral-700">{order.id}</td>
                                        <td className="px-6 py-4 text-neutral-600">
                                            {order.customer}
                                            <span className="block text-[10px] text-neutral-400">{order.items} artículos</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border 
                                                ${order.status === 'COMPLETED' ? 'bg-green-50 text-green-700 border-green-100' : 
                                                  order.status === 'PENDING' ? 'bg-amber-50 text-amber-700 border-amber-100' : 
                                                  'bg-blue-50 text-blue-700 border-blue-100'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-medium text-neutral-800">{order.total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 4. COLUMNA DERECHA (Alertas y Accesos) */}
                <div className="space-y-8">
                    
                    {/* Alerta de Stock Bajo */}
                    <div className={cardClass}>
                        <div className="flex items-center gap-2 mb-4 text-amber-600">
                            <AlertCircle size={20} />
                            <h3 className="font-bold text-neutral-900">Stock Bajo</h3>
                        </div>
                        <ul className="space-y-3">
                            {lowStockProducts.map((prod, i) => (
                                <li key={i} className="flex justify-between items-center text-sm border-b border-neutral-50 last:border-0 pb-2 last:pb-0">
                                    <div>
                                        <p className="font-medium text-neutral-700">{prod.name}</p>
                                        <p className="text-xs text-neutral-400">Talla: {prod.size}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`font-bold ${prod.stock === 0 ? 'text-red-600' : 'text-amber-600'}`}>
                                            {prod.stock} u.
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <Link to="/admin/products" className="block mt-4 text-center text-xs text-neutral-500 hover:text-[#ee2a2a] transition-colors">
                            Gestionar Inventario →
                        </Link>
                    </div>

                    {/* Accesos Rápidos */}
                    <div className={cardClass}>
                        <h3 className="font-bold text-neutral-900 mb-4">Accesos Rápidos</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <Link to="/admin/products/create" className="p-3 bg-neutral-50 border border-neutral-100 rounded text-center hover:bg-red-50 hover:border-red-100 hover:text-[#ee2a2a] transition-all group">
                                <Package className="mx-auto mb-2 text-neutral-400 group-hover:text-[#ee2a2a]" size={20}/>
                                <span className="text-xs font-bold block">Nuevo Producto</span>
                            </Link>
                            <Link to="/admin/customers" className="p-3 bg-neutral-50 border border-neutral-100 rounded text-center hover:bg-red-50 hover:border-red-100 hover:text-[#ee2a2a] transition-all group">
                                <Users className="mx-auto mb-2 text-neutral-400 group-hover:text-[#ee2a2a]" size={20}/>
                                <span className="text-xs font-bold block">Ver Clientes</span>
                            </Link>
                            <Link to="/admin/orders" className="col-span-2 p-3 bg-[#ee2a2a] text-white rounded text-center shadow-button hover:bg-[#d61e1e] transition-all flex items-center justify-center gap-2">
                                <ShoppingBag size={18}/>
                                <span className="text-sm font-bold">Gestionar Pedidos</span>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};