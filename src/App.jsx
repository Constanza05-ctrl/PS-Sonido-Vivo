import { Routes, Route } from 'react-router-dom'
import { ProductoProvider } from './context/ProductoContext'

import Inicio from './pages/Inicio'
import Catalogo from './pages/Catalogo'
import Carrito from './pages/Carrito'
import Checkout from './pages/Checkout'

import Nosotros from './pages/Nosotros'
import Contacto from './pages/Contacto'
import Blog from './pages/Blog'
import Perfil from './pages/Perfil'

function App() {
  return (
    <ProductoProvider>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* Rutas de tu asignación */}
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </ProductoProvider>
  )
}

export default App