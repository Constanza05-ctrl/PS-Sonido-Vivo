
const CLAVE_CARRITO = 'sonido-vivo-carrito'
const CLAVE_PEDIDOS = 'sonido-vivo-pedidos'

// Recuperar el carrito guardado.
export function obtenerCarritoGuardado() {
  try {
    const guardado = localStorage.getItem(CLAVE_CARRITO)
    const carrito = guardado ? JSON.parse(guardado) : []

    return Array.isArray(carrito) ? carrito : []
  } catch {
    return []
  }
}

// Guardar el carrito actualizado.
export function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito))
}

// Limpiar el carrito guardado.
export function limpiarCarritoGuardado() {
  localStorage.removeItem(CLAVE_CARRITO)
}

// Recuperar los pedidos realizados.
export function obtenerPedidosGuardados() {
  try {
    const guardados = localStorage.getItem(CLAVE_PEDIDOS)
    const pedidos = guardados ? JSON.parse(guardados) : []

    return Array.isArray(pedidos) ? pedidos : []
  } catch {
    return []
  }
}

// Guardar un nuevo pedido sin borrar los anteriores.
export function guardarPedido(pedido) {
  const pedidos = obtenerPedidosGuardados()

  localStorage.setItem(
    CLAVE_PEDIDOS,
    JSON.stringify([...pedidos, pedido])
  )
}
