import { createContext, useContext, useEffect, useState } from 'react'
import {
  obtenerProductos,
  agregarProducto,
  actualizarProducto,
  eliminarProducto
} from '../services/productoService'

const ProductoContext = createContext(null)

export function ProductoProvider({ children }) {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)

  async function recargarProductos() {
    setCargando(true)
    try {
      const lista = await obtenerProductos()
      setProductos(Array.isArray(lista) ? lista : [])
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    recargarProductos()
  }, [])

  async function crearProducto(nuevoProducto) {
    const creado = await agregarProducto(nuevoProducto)
    await recargarProductos()
    return creado
  }

  async function editarProducto(id, datosActualizados) {
    const actualizado = await actualizarProducto(id, datosActualizados)
    await recargarProductos()
    return actualizado
  }

  async function borrarProducto(id) {
    const eliminado = await eliminarProducto(id)
    await recargarProductos()
    return eliminado
  }

  return (
    <ProductoContext.Provider
      value={{
        productos,
        cargando,
        recargarProductos,
        crearProducto,
        editarProducto,
        borrarProducto
      }}
    >
      {children}
    </ProductoContext.Provider>
  )
}

export function useProductos() {
  const context = useContext(ProductoContext)
  if (!context) {
    throw new Error('useProductos debe usarse dentro de ProductoProvider')
  }
  return context
}