
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
    
  }

  const iniciales = [...productosIniciales]
  guardarProductos(iniciales)
  return iniciales
}


export function obtenerProductos() {
  return leerProductos()
}


export function obtenerProductoPorId(id) {
  return leerProductos().find(producto => producto.id === id)
}



export function agregarProducto(nuevoProducto) {
  const validacion = validarProducto(nuevoProducto)

  if (!validacion.valido) {
    const error = new Error('El producto contiene datos inválidos.')
    error.errores = validacion.errores
    throw error
  }

  const productos = leerProductos()

  const producto = {
    ...nuevoProducto,
    stock: Number(nuevoProducto.stock),
    precio: Number(nuevoProducto.precio),
    id: Date.now()
  }

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

  const productoActualizado = {
    ...productos[indice],
    ...datosActualizados,
    stock: Number(datosActualizados.stock ?? productos[indice].stock),
    precio: Number(datosActualizados.precio ?? productos[indice].precio),
    id: productos[indice].id
  }

  const validacion = validarProducto(productoActualizado)

  if (!validacion.valido) {
    const error = new Error('El producto contiene datos inválidos.')
    error.errores = validacion.errores
    throw error
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
