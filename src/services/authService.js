import { API_BASE_URL, ENDPOINTS, STORAGE_KEYS } from '../config/apiConfig'
import { apiRequest } from './api'

const URL_LOGIN = `${API_BASE_URL}${ENDPOINTS.AUTH_LOGIN}`

export async function loginRequest(email, password) {
  const data = await apiRequest(URL_LOGIN, {
    method: 'POST',
    body: JSON.stringify({
      email: email.trim(),
      password
    })
  })

  return {
    token: data.token || data.accessToken,
    usuario: data.usuario
  }
}

export function guardarSesion(token, usuario) {
  localStorage.setItem(STORAGE_KEYS.TOKEN, token)
  localStorage.setItem(STORAGE_KEYS.USUARIO, JSON.stringify(usuario))
}

export function obtenerSesionGuardada() {
  try {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
    const usuarioRaw = localStorage.getItem(STORAGE_KEYS.USUARIO)
    const usuario = usuarioRaw ? JSON.parse(usuarioRaw) : null

    if (!token || !usuario) {
      return { token: null, usuario: null }
    }

    return { token, usuario }
  } catch {
    return { token: null, usuario: null }
  }
}

export function limpiarSesion() {
  localStorage.removeItem(STORAGE_KEYS.TOKEN)
  localStorage.removeItem(STORAGE_KEYS.USUARIO)
}