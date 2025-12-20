import { BrowserRouter } from "react-router-dom"
import { Toaster } from "sonner"
import { AppRouter } from "./router/AppRouter"

function App() {
  return (
    //Habilita la nagevacion sin recargar la pagina 
    <BrowserRouter>
    {/*Esto decide que paginas mostrar en la url*/}
      <AppRouter />
      {/*Toaster es un componente que muestra notificaciones*/}
      <Toaster position="top-center" richColors/>
    </BrowserRouter>
  )
}

export default App;