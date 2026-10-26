
export function obtenerPrecioFinal(producto) {
  const precio = Number(producto.precio) || 0
  const descuento = Number(producto.descuento) || 0

  if (!producto.enOferta || descuento < 5 || descuento > 90) {
    return precio
  }

  return Math.round(precio * (1 - descuento / 100))
}
