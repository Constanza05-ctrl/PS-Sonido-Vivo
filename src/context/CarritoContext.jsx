
import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

import {
  obtenerCarritoGuardado,
  guardarCarrito,
  limpiarCarritoGuardado
} from '../services/carritoService'

import { obtenerPrecioFinal } from '../utils/precioProducto'

const CarritoContext = createContext(null)

export function CarritoProvider({ children }) {
  const [items, setItems] = useState(() => obtenerCarritoGuardado())

  useEffect(() => {
    guardarCarrito(items)
  }, [items])

  function agregarAlCarrito(producto) {
    const precioFinal = obtenerPrecioFinal(producto)

    setItems(actuales => {
      const existente = actuales.find(
        item => item.id === producto.id
      )

      if (existente) {
        return actuales.map(item =>
          item.id === producto.id
            ? {
                ...item,
                precio: precioFinal,
                enOferta: producto.enOferta,
                descuento: producto.descuento,
                cantidad: item.cantidad + 1
              }
            : item
        )
      }

      return [
        ...actuales,
        {
          ...producto,
          precio: precioFinal,
          precioOriginal: Number(producto.precio) || 0,
          cantidad: 1
        }
      ]
    })
  }

  function cambiarCantidad(id, cantidad) {
    const nuevaCantidad = Number(cantidad)

    if (!Number.isInteger(nuevaCantidad) || nuevaCantidad < 1) {
      return
    }

    setItems(actuales =>
      actuales.map(item =>
        item.id === id
          ? { ...item, cantidad: nuevaCantidad }
          : item
      )
    )
  }

  function quitarDelCarrito(id) {
    setItems(actuales =>
      actuales.filter(item => item.id !== id)
    )
  }

  function vaciarCarrito() {
    setItems([])
    limpiarCarritoGuardado()
  }

  const totalUnidades = items.reduce(
    (total, item) => total + item.cantidad,
    0
  )

  const totalCompra = items.reduce(
    (total, item) => total + (Number(item.precio) || 0) * item.cantidad,
    0
  )

  return (
    <CarritoContext.Provider
      value={{
        items,
        totalUnidades,
        totalCompra,
        agregarAlCarrito,
        cambiarCantidad,
        quitarDelCarrito,
        vaciarCarrito
      }}
    >
      {children}
    </CarritoContext.Provider>
  )
}

export function useCarrito() {
  const contexto = useContext(CarritoContext)

  if (!contexto) {
    throw new Error(
      'useCarrito debe utilizarse dentro de CarritoProvider'
    )
  }

  return contexto
}
