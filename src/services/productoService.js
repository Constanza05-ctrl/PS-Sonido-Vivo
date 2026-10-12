
import { productos as productosIniciales } from '../data/productos'

let productos = [...productosIniciales]

// Obtener todos los productos
export function obtenerProductos() {
  return productos
}

// Obtener un producto por su ID
export function obtenerProductoPorId(id) {
  return productos.find(producto => producto.id === id)
}

// Agregar un producto
export function agregarProducto(nuevoProducto) {
  const producto = {
    ...nuevoProducto,
    id: Date.now()
  }

  productos.push(producto)

  return producto
}

// Modificar un producto
export function actualizarProducto(id, datosActualizados) {
  const indice = productos.findIndex(producto => producto.id === id)

  if (indice === -1) {
    return null
  }

  productos[indice] = {
    ...productos[indice],
    ...datosActualizados,
    id: productos[indice].id
  }

  return productos[indice]
}

// Eliminar un producto
export function eliminarProducto(id) {
  const cantidadInicial = productos.length

  productos = productos.filter(producto => producto.id !== id)

  return productos.length < cantidadInicial
}
