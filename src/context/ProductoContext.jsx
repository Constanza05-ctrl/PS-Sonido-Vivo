
import { createContext, useContext, useState } from 'react'
import {
  obtenerProductos,
  agregarProducto as agregarProductoService,
  actualizarProducto as actualizarProductoService,
  eliminarProducto as eliminarProductoService
} from '../services/productoService'

const ProductoContext = createContext()

export function ProductoProvider({ children }) {
  const [productos, setProductos] = useState(() => obtenerProductos())

  function agregarProducto(nuevoProducto) {
    const producto = agregarProductoService(nuevoProducto)

    setProductos(obtenerProductos())

    return producto
  }

  function actualizarProducto(id, datosActualizados) {
    const producto = actualizarProductoService(id, datosActualizados)

    if (producto !== null) {
      setProductos(obtenerProductos())
    }

    return producto
  }

  function eliminarProducto(id) {
    const eliminado = eliminarProductoService(id)

    if (eliminado) {
      setProductos(obtenerProductos())
    }

    return eliminado
  }

  return (
    <ProductoContext.Provider
      value={{
        productos,
        agregarProducto,
        actualizarProducto,
        eliminarProducto
      }}
    >
      {children}
    </ProductoContext.Provider>
  )
}

export function useProductos() {
  return useContext(ProductoContext)
}
