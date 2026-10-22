
import CarritoItem from '../molecules/CarritoItem'
import { useCarrito } from '../../context/CarritoContext'

function ListaCarrito() {
  const {
    items,
    cambiarCantidad,
    quitarDelCarrito
  } = useCarrito()

  if (items.length === 0) {
    return (
      <div className="alert alert-info" role="status">
        Tu carrito está vacío. Explora el catálogo para agregar productos.
      </div>
    )
  }

  return (
    <section aria-label="Productos del carrito">
      {items.map(producto => (
        <CarritoItem
          key={producto.id}
          producto={producto}
          onCambiarCantidad={cambiarCantidad}
          onQuitar={quitarDelCarrito}
        />
      ))}
    </section>
  )
}

export default ListaCarrito
