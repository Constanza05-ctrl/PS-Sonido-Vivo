
import { Routes, Route } from 'react-router-dom'
import { ProductoProvider } from './context/ProductoContext'
import Inicio from './pages/Inicio'
import Catalogo from './pages/Catalogo'

function App() {
  return (
    <ProductoProvider>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/catalogo" element={<Catalogo />} />
      </Routes>
    </ProductoProvider>
  )
}

export default App
