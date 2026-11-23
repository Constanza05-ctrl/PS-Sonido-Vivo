import { API_BASE_URL, ENDPOINTS } from '../config/apiConfig'
import { apiRequest } from './api'

const URL_USUARIOS = `${API_BASE_URL}${ENDPOINTS.USUARIOS}`

export async function obtenerUsuarios() {
  return apiRequest(URL_USUARIOS, {
    method: 'GET'
  })
}

export async function crearUsuario(datosUsuario) {
  return apiRequest(URL_USUARIOS, {
    method: 'POST',
    body: JSON.stringify(datosUsuario)
  })
}

export async function actualizarUsuario(id, datosUsuario) {
  return apiRequest(`${URL_USUARIOS}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(datosUsuario)
  })
}

export async function eliminarUsuario(id) {
  return apiRequest(`${URL_USUARIOS}/${id}`, {
    method: 'DELETE'
  })
}