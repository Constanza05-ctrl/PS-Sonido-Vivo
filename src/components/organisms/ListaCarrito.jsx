
import { Link } from 'react-router-dom'
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
      <div className="alert alert-info text-center p-4" role="status">
        <h2 className="h5">Tu carrito está vacío</h2>

        <p>
          Explora el catálogo para encontrar productos y agregarlos a tu carrito.
        </p>

        <Link to="/catalogo" className="btn btn-primary">
          <span aria-hidden="true">← </span>
          Volver al catálogo
        </Link>
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
