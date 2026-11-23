import { Routes, Route, Navigate } from 'react-router-dom'
import { ProductoProvider } from './context/ProductoContext'
import ProtectedRoute from './components/organisms/ProtectedRoute'

import Inicio from './pages/Inicio'
import Catalogo from './pages/Catalogo'
import Carrito from './pages/Carrito'
import Checkout from './pages/Checkout'
import Nosotros from './pages/Nosotros'
import Contacto from './pages/Contacto'
import Blog from './pages/Blog'
import Perfil from './pages/Perfil'
import Login from './pages/Login'
import AccesoDenegado from './pages/AccesoDenegado'
import AdminProductos from './pages/AdminProductos'
import AdminUsuarios from './pages/AdminUsuarios'
import AdminPedidos from './pages/AdminPedidos'

function App() {
  return (
    <ProductoProvider>
      <Routes>
        {/* 1. Rutas Públicas */}
        <Route path="/" element={<Inicio />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/acceso-denegado" element={<AccesoDenegado />} />

        {/* 2. Rutas Protegidas por Sesión */}
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }
        />
        <Route path="/pedidos" element={<Navigate to="/perfil" replace />} />

        {/* 3. Rutas Protegidas por Rol CLIENTE */}
        <Route
          path="/carrito"
          element={
            <ProtectedRoute rolesPermitidos={['CLIENTE']}>
              <Carrito />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute rolesPermitidos={['CLIENTE']}>
              <Checkout />
            </ProtectedRoute>
          }
        />

        {/* 4. Rutas Protegidas por Rol ADMIN */}
        <Route
          path="/admin/usuarios"
          element={
            <ProtectedRoute rolesPermitidos={['ADMIN']}>
              <AdminUsuarios />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/productos"
          element={
            <ProtectedRoute rolesPermitidos={['ADMIN']}>
              <AdminProductos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/pedidos"
          element={
            <ProtectedRoute rolesPermitidos={['ADMIN']}>
              <AdminPedidos />
            </ProtectedRoute>
          }
        />
      </Routes>
    </ProductoProvider>
  )
}

export default App