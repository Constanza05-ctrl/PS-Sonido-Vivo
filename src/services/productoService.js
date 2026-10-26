
import { productos as productosIniciales } from '../data/productos'
import { validarProducto } from '../utils/validarProducto'

const STORAGE_KEY = 'sonido-vivo-productos'

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

export function obtenerProductos() {
  return leerProductos()
}

export function obtenerProductoPorId(id) {
  return leerProductos().find(producto => producto.id === id)
}

export function agregarProducto(nuevoProducto) {
  const producto = {
    ...nuevoProducto,
    stock: Number(nuevoProducto.stock),
    precio: Number(nuevoProducto.precio),
    ...normalizarOferta(nuevoProducto),
    id: Date.now()
  }

  const validacion = validarProducto(producto)

  if (!validacion.valido) {
    lanzarErrorValidacion(validacion.errores)
  }

  const productos = leerProductos()
  productos.push(producto)
  guardarProductos(productos)

  return producto
}

export function actualizarProducto(id, datosActualizados) {
  const productos = leerProductos()
  const indice = productos.findIndex(producto => producto.id === id)

  if (indice === -1) {
    return null
  }

  const anterior = productos[indice]

  const productoActualizado = {
    ...anterior,
    ...datosActualizados,
    stock: Number(datosActualizados.stock ?? anterior.stock),
    precio: Number(datosActualizados.precio ?? anterior.precio),
    ...normalizarOferta({
      enOferta: datosActualizados.enOferta ?? anterior.enOferta ?? false,
      descuento: datosActualizados.descuento ?? anterior.descuento ?? 0
    }),
    id: anterior.id
  }

  const validacion = validarProducto(productoActualizado)

  if (!validacion.valido) {
    lanzarErrorValidacion(validacion.errores)
  }

  productos[indice] = productoActualizado
  guardarProductos(productos)

  return productos[indice]
}

export function eliminarProducto(id) {
  const productos = leerProductos()
  const productosActualizados = productos.filter(
    producto => producto.id !== id
  )

  if (productosActualizados.length === productos.length) {
    return false
  }

  guardarProductos(productosActualizados)
  return true
}
