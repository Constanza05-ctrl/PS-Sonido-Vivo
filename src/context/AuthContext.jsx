import { createContext, useContext, useState } from 'react'
import {
  loginRequest,
  guardarSesion,
  obtenerSesionGuardada,
  limpiarSesion
} from '../services/authService'
import { actualizarUsuario } from '../services/usuarioService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [sesion, setSesion] = useState(() => obtenerSesionGuardada())

  async function iniciarSesion(email, password) {
    const data = await loginRequest(email, password)
    guardarSesion(data.token, data.usuario)
    setSesion({ token: data.token, usuario: data.usuario })
    return data.usuario
  }

  async function actualizarPerfil(datosNuevos) {
    if (!sesion.usuario) return null

    const usuarioActualizado = {
      ...sesion.usuario,
      nombre: datosNuevos.nombre.trim(),
      email: datosNuevos.email.trim()
    }

    if (import.meta.env.VITE_USE_MOCK === 'true') {
      const mockKey = 'sonido_vivo_mock_usuarios_v2'
      const lista = JSON.parse(localStorage.getItem(mockKey) || '[]')
      if (Array.isArray(lista) && lista.length > 0) {
        const actualizada = lista.map(u =>
          u.id === usuarioActualizado.id ? { ...u, ...usuarioActualizado } : u
        )
        localStorage.setItem(mockKey, JSON.stringify(actualizada))
      }
    } else if (sesion.usuario.rol === 'ADMIN' && sesion.usuario.id) {
      await actualizarUsuario(sesion.usuario.id, {
        nombre: usuarioActualizado.nombre,
        email: usuarioActualizado.email,
        rol: usuarioActualizado.rol,
        activo: usuarioActualizado.activo !== false
      })
    }

    guardarSesion(sesion.token, usuarioActualizado)
    setSesion(prev => ({ ...prev, usuario: usuarioActualizado }))
    return usuarioActualizado
  }

  function cerrarSesion() {
    limpiarSesion()
    setSesion({ token: null, usuario: null })
  }

  const valor = {
    token: sesion.token,
    usuario: sesion.usuario,
    estaAutenticado: Boolean(sesion.token && sesion.usuario),
    esAdmin: sesion.usuario?.rol === 'ADMIN',
    iniciarSesion,
    actualizarPerfil,
    cerrarSesion
  }

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    return {
      token: null,
      usuario: null,
      estaAutenticado: false,
      esAdmin: false,
      iniciarSesion: async () => {},
      actualizarPerfil: async () => null,
      cerrarSesion: () => {}
    }
  }
  return context
}