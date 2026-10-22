
import { useCarrito } from '../../context/CarritoContext'

const formatoPrecio = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0
})

function ProductoCard({ producto }) {
  const { agregarAlCarrito } = useCarrito()

  function manejarAgregarAlCarrito() {
    agregarAlCarrito(producto)
  }

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{producto.nombre}</h5>

        <p className="text-muted mb-1">
          {[producto.marca, producto.modelo].filter(Boolean).join(' ')}
        </p>

        <p className="card-text">{producto.descripcion}</p>

        <p className="small mb-2">
          <strong>Categoría:</strong> {producto.categoria}
        </p>

        <p className="fw-bold fs-5">
          {formatoPrecio.format(Number(producto.precio) || 0)}
        </p>

        <p className="small">
          Stock disponible: {producto.stock}
        </p>

        <button
          className="btn btn-primary mt-auto"
          type="button"
          onClick={manejarAgregarAlCarrito}
          disabled={Number(producto.stock) <= 0}
        >
          {Number(producto.stock) <= 0
            ? 'Sin stock'
            : 'Agregar al carrito'}
        </button>
      </div>
    </div>
  )
}

export default ProductoCard
