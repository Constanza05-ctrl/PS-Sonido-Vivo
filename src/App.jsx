import { Routes, Route } from 'react-router-dom'
import { ProductoProvider } from './context/ProductoContext'
import Inicio from './pages/Inicio'
import Catalogo from './pages/Catalogo'
import Carrito from './pages/Carrito'
import Checkout from './pages/Checkout'

function App() {
  return (
    <ProductoProvider>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </ProductoProvider>
  )
}

export default App
