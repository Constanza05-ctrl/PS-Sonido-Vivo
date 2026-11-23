import { productos as productosIniciales } from '../data/productos'
import { validarProducto } from '../utils/validarProducto'
import { API_BASE_URL, ENDPOINTS } from '../config/apiConfig'
import { apiRequest } from './api'

const STORAGE_KEY = 'sonido-vivo-productos'
const USAR_MOCK = import.meta.env.VITE_USE_MOCK === 'true'
const URL_PRODUCTOS = `${API_BASE_URL}${ENDPOINTS.PRODUCTOS}`

function guardarProductos(productos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(productos))
}

function leerProductos() {
  const datosGuardados = localStorage.getItem(STORAGE_KEY)

  if (datosGuardados === null) {
    const iniciales = [...productosIniciales]
    guardarProductos(iniciales)
    return iniciales
  }

  try {
    const productosGuardados = JSON.parse(datosGuardados)
    if (Array.isArray(productosGuardados)) {
      return productosGuardados
    }
  } catch {
    // Si los datos guardados están dañados, se recuperan los iniciales.
  }

  const iniciales = [...productosIniciales]
  guardarProductos(iniciales)
  return iniciales
}

function normalizarOferta(producto) {
  const enOferta = producto.enOferta === true
  const descuento = enOferta ? Number(producto.descuento) : 0

  return {
    enOferta,
    descuento: Number.isFinite(descuento) ? descuento : 0
  }
}

function lanzarErrorValidacion(errores) {
  const error = new Error('El producto contiene datos inválidos.')
  error.errores = errores
  throw error
}

export async function obtenerProductos() {
  if (USAR_MOCK) {
    return leerProductos()
  }
  return apiRequest(URL_PRODUCTOS, { method: 'GET' })
}

export async function obtenerProductoPorId(id) {
  if (USAR_MOCK) {
    return leerProductos().find(producto => producto.id === id)
  }
  return apiRequest(`${URL_PRODUCTOS}/${id}`, { method: 'GET' })
}

export async function agregarProducto(nuevoProducto) {
  const productoValidar = {
    ...nuevoProducto,
    stock: Number(nuevoProducto.stock),
    precio: Number(nuevoProducto.precio),
    ...normalizarOferta(nuevoProducto),
    id: Date.now()
  }

  const validacion = validarProducto(productoValidar)
  if (!validacion.valido) {
    lanzarErrorValidacion(validacion.errores)
  }

  if (USAR_MOCK) {
    const productos = leerProductos()
    productos.push(productoValidar)
    guardarProductos(productos)
    return productoValidar
  }

  const { id: _ignorarId, ...payloadApi } = productoValidar
  return apiRequest(URL_PRODUCTOS, {
    method: 'POST',
    body: JSON.stringify(payloadApi)
  })
}

export async function actualizarProducto(id, datosActualizados) {
  const productoPreparado = {
    ...datosActualizados,
    stock: Number(datosActualizados.stock ?? 0),
    precio: Number(datosActualizados.precio ?? 0),
    ...normalizarOferta({
      enOferta: datosActualizados.enOferta ?? false,
      descuento: datosActualizados.descuento ?? 0
    }),
    id
  }

  const validacion = validarProducto(productoPreparado)
  if (!validacion.valido) {
    lanzarErrorValidacion(validacion.errores)
  }

  if (USAR_MOCK) {
    const productos = leerProductos()
    const indice = productos.findIndex(producto => producto.id === id)
    if (indice === -1) return null

    productos[indice] = { ...productos[indice], ...productoPreparado, id }
    guardarProductos(productos)
    return productos[indice]
  }

  return apiRequest(`${URL_PRODUCTOS}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productoPreparado)
  })
}

export async function eliminarProducto(id) {
  if (USAR_MOCK) {
    const productos = leerProductos()
    const productosActualizados = productos.filter(producto => producto.id !== id)
    if (productosActualizados.length === productos.length) return false

    guardarProductos(productosActualizados)
    return true
  }

  await apiRequest(`${URL_PRODUCTOS}/${id}`, { method: 'DELETE' })
  return true
}