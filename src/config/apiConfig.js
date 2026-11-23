export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

export const ENDPOINTS = {
  AUTH_LOGIN: import.meta.env.VITE_ENDPOINT_LOGIN || '/auth/login',
  USUARIOS: import.meta.env.VITE_ENDPOINT_USUARIOS || '/usuarios',
  PRODUCTOS: import.meta.env.VITE_ENDPOINT_PRODUCTOS || '/productos',
  PEDIDOS: import.meta.env.VITE_ENDPOINT_PEDIDOS || '/pedidos'
}

export const STORAGE_KEYS = {
  TOKEN: 'sonido_vivo_token',
  USUARIO: 'sonido_vivo_usuario'
}