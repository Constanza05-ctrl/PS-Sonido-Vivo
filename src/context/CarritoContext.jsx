
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

const CarritoContext = createContext(null)

export function CarritoProvider({ children }) {
  const [items, setItems] = useState(() => obtenerCarritoGuardado())

  useEffect(() => {
    guardarCarrito(items)
  }, [items])

  function agregarAlCarrito(producto) {
    setItems(actuales => {
      const existente = actuales.find(
        item => item.id === producto.id
      )

      if (existente) {
        return actuales.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      }

      return [...actuales, { ...producto, cantidad: 1 }]
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
    (total, item) => total + item.precio * item.cantidad,
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
