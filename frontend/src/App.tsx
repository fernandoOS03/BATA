import { BrowserRouter } from "react-router-dom"
import { Toaster } from "sonner"
import { AppRouter } from "./router/AppRouter"
import { AuthProvider } from "./features/auth/context/AuthContext"
import { CartProvider } from "./features/cart/context/CartContext"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        
        <CartProvider>
          <AppRouter />
          
          <Toaster position="top-center" richColors/>
        </CartProvider>

      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;