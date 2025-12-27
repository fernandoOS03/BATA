import React, { useState } from 'react';
import { Eye, EyeOff, Clock, MessageSquare, ShoppingBag, Gift, ArrowRight } from 'lucide-react';
import { useLogin } from '../hooks/useLogin';
import { useRegister } from '../hooks/useRegister';

export const AuthPage = () => {
  // Estado para alternar vistas: true = Login, false = Registro
  const [isLoginView, setIsLoginView] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Hooks de lógica
  const login = useLogin();
  const register = useRegister();

  // Estilos reutilizables (Estilo Bata)
  const inputClass = "w-full border border-neutral-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder-neutral-400";
  const labelClass = "block text-xs font-bold text-neutral-600 mb-1.5 uppercase";
  const buttonPrimaryClass = "w-full py-3.5 px-4 bg-black text-white text-sm font-bold uppercase tracking-wide rounded hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const buttonOutlineClass = "w-full py-3.5 px-4 border border-black text-black text-sm font-bold uppercase tracking-wide rounded hover:bg-neutral-50 transition-colors";

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      
      {/* Contenedor Principal (Blanco, Sombra Suave) */}
      <div className="bg-white max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 shadow-[0_2px_15px_rgba(0,0,0,0.05)] rounded-lg overflow-hidden border border-neutral-100 min-h-[600px]">
        
        {/* === COLUMNA IZQUIERDA: LOGIN === */}
        {/* Si estamos en Login, se muestra el form. Si estamos en Registro, mostramos mensaje de "Ya tengo cuenta" */}
        <div className={`p-8 md:p-12 md:border-r border-neutral-100 transition-all duration-300 ${!isLoginView ? 'bg-neutral-50 flex flex-col justify-center' : ''}`}>
          
          {isLoginView ? (
            // VISTA: FORMULARIO DE LOGIN
            <>
              <h2 className="text-2xl font-bold text-neutral-900 uppercase font-display mb-2">Ingresa a tu cuenta</h2>
              <p className="text-sm text-neutral-500 mb-8 leading-relaxed">
                ¡Bienvenido! <br></br>
Si ingresas por primera vez a tu cuenta debes crear una contraseña. Si ya has ingresado y no recuerdas la contraseña haz clic en "¿Has olvidado la contraseña?" y sigue las instrucciones.
              </p>

              <form className="space-y-5" onSubmit={login.handleSubmit}>
                {login.error && (
                  <div className="bg-red-50 text-[#ee2a2a] text-sm p-3 rounded border border-red-100 text-center font-medium">
                    {login.error}
                  </div>
                )}

                <div>
                  <label className={labelClass}>E-mail *</label>
                  <input name="email" type="email" required value={login.credentials.email} onChange={login.handleChange} className={inputClass} placeholder="ejemplo@correo.com" />
                </div>

                <div className="relative">
                  <label className={labelClass}>Contraseña *</label>
                  <div className="relative">
                    <input name="password" type={showPassword ? "text" : "password"} required value={login.credentials.password} onChange={login.handleChange} className={inputClass} placeholder="••••••••" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-600">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm mt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-neutral-600 hover:text-neutral-900">
                    <input type="checkbox" className="w-4 h-4 border-neutral-300 rounded text-black focus:ring-black" />
                    <span>Recuérdame</span>
                  </label>
                  <a href="#" className="font-bold underline text-neutral-800 hover:text-black">¿Has olvidado la contraseña?</a>
                </div>

                <button type="submit" disabled={login.loading} className={buttonPrimaryClass}>
                  {login.loading ? 'Ingresando...' : 'Iniciar Sesión'}
                </button>
              </form>
            </>
          ) : (
            // VISTA: INVITACIÓN AL LOGIN (Cuando estás en modo registro)
            <div className="text-center">
               <h2 className="text-2xl font-bold text-neutral-900 uppercase font-display mb-4">¿Ya tienes cuenta?</h2>
               <p className="text-sm text-neutral-500 mb-8">
                 Inicia sesión para acceder a tu historial de pedidos y gestionar tu perfil.
               </p>
               <button onClick={() => setIsLoginView(true)} className={buttonOutlineClass}>
                 <span className="flex items-center justify-center gap-2">
                   <ArrowRight className="rotate-180" size={18} /> Volver al Login
                 </span>
               </button>
            </div>
          )}
        </div>

        {/* === COLUMNA DERECHA: REGISTRO O BENEFICIOS === */}
        <div className={`p-8 md:p-12 transition-all duration-300 ${isLoginView ? 'bg-white flex flex-col justify-center' : ''}`}>
          
          {isLoginView ? (
             // VISTA: BENEFICIOS + BOTÓN IR A REGISTRO
             <>
                <h2 className="text-2xl font-bold text-neutral-900 uppercase font-display mb-2">¿No tienes una cuenta?</h2>
                <p className="text-sm text-neutral-500 mb-8">Regístrate ahora y ahorrarás tiempo en tus próximas compras.</p>

                <ul className="space-y-6 mb-10">
                    {[
                        { icon: Clock, text: "Pedidos rápidos sin volver a diligenciar tu dirección." },
                        { icon: MessageSquare, text: "Comunicación más eficiente con atención al cliente." },
                        { icon: ShoppingBag, text: "Consultar tus pedidos actuales y anteriores." },
                        { icon: Gift, text: "Ser parte de nuestro programa de fidelización Bata Club." }
                    ].map((item, i) => (
                        <li key={i} className="flex items-start gap-4">
                        <div className="p-2 rounded-full border border-[#ee2a2a] text-[#ee2a2a] shrink-0">
                            <item.icon size={20} />
                        </div>
                        <span className="text-sm text-neutral-600 mt-1">{item.text}</span>
                        </li>
                    ))}
                </ul>

                <button onClick={() => setIsLoginView(false)} className={buttonOutlineClass}>
                  Regístrate
                </button>
             </>
          ) : (
             // VISTA: FORMULARIO DE REGISTRO
             <>
               <h2 className="text-2xl font-bold text-neutral-900 uppercase font-display mb-6">Crear Cuenta Nueva</h2>
               
               <form className="space-y-4" onSubmit={register.handleSubmit}>
                  {register.error && <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{register.error}</div>}
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Nombre *</label>
                      <input name="name" type="text" required value={register.formData.name} onChange={register.handleChange} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Apellido *</label>
                      <input name="lastName" type="text" required value={register.formData.lastName} onChange={register.handleChange} className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>E-mail *</label>
                    <input name="email" type="email" required value={register.formData.email} onChange={register.handleChange} className={inputClass} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className={labelClass}>DNI</label>
                       <input name="dni" type="text" value={register.formData.dni} onChange={register.handleChange} className={inputClass} />
                    </div>
                    <div>
                       <label className={labelClass}>Cumpleaños</label>
                       <input name="birthday" type="date" value={register.formData.birthday} onChange={register.handleChange} className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Contraseña *</label>
                    <input name="password" type="password" required value={register.formData.password} onChange={register.handleChange} className={inputClass} />
                  </div>

                  <button type="submit" disabled={register.loading} className={buttonPrimaryClass}>
                     {register.loading ? 'Creando cuenta...' : 'Registrarme'}
                  </button>
                  
                  <button type="button" onClick={() => setIsLoginView(true)} className="w-full text-center text-xs text-neutral-500 underline mt-2 hover:text-black md:hidden">
                      Ya tengo cuenta, volver al login
                  </button>
               </form>
             </>
          )}
        </div>
        
      </div>
    </div>
  );
};