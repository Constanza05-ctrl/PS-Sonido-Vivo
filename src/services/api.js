import { STORAGE_KEYS } from '../config/apiConfig'

export async function apiRequest(url, opciones = {}) {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 6000)

  try {
    const respuesta = await fetch(url, {
      ...opciones,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...opciones.headers
      }
    })

    if (respuesta.status === 204) return null

    const datos = await respuesta.json().catch(() => null)

    if (!respuesta.ok) {
      throw new Error(datos?.mensaje || `Error HTTP ${respuesta.status}`)
    }

    return datos
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('No se pudo conectar con el servidor (puerto 8080 sin respuesta).')
    }
    throw error
  } finally {
    clearTimeout(timeoutId)
  }
}