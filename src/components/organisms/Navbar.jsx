import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Navbar() {
  const { estaAutenticado, esAdmin, usuario, cerrarSesion } = useAuth()
  const navigate = useNavigate()

  function manejarLogout() {
    cerrarSesion()
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          🎵 Sonido Vivo
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Inicio
              </NavLink>
            </li>

            {!esAdmin && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/catalogo">
                  Catálogo
                </NavLink>
              </li>
            )}

            {estaAutenticado && !esAdmin && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/carrito">
                  Carrito
                </NavLink>
              </li>
            )}

            {estaAutenticado && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/perfil">
                  Mi Perfil
                </NavLink>
              </li>
            )}

            {esAdmin && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/usuarios">
                    Usuarios
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/productos">
                    Productos
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/pedidos">
                    Pedidos
                  </NavLink>
                </li>
              </>
            )}

            {estaAutenticado ? (
              <li className="nav-item d-flex align-items-center gap-2 ms-lg-2">
                <span className="badge bg-info text-dark">
                  {usuario?.nombre} ({usuario?.rol})
                </span>
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm"
                  onClick={manejarLogout}
                >
                  Cerrar sesión
                </button>
              </li>
            ) : (
              <li className="nav-item ms-lg-2">
                <NavLink className="btn btn-primary btn-sm" to="/login">
                  Iniciar sesión
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar