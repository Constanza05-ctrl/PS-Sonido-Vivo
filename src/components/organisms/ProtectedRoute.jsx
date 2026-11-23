import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function ProtectedRoute({ children, rolesPermitidos }) {
  const { estaAutenticado, usuario } = useAuth()
  const location = useLocation()

  if (!estaAutenticado) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (rolesPermitidos && !rolesPermitidos.includes(usuario?.rol)) {
    return <Navigate to="/acceso-denegado" replace />
  }

  return children
}

export default ProtectedRoute