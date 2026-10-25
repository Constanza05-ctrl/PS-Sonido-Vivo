
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCarrito } from '../../context/CarritoContext'

const formatoPrecio = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0
})

function ProductoCard({ producto }) {
  const { agregarAlCarrito } = useCarrito()
  const [agregado, setAgregado] = useState(false)

  function manejarAgregarAlCarrito() {
    agregarAlCarrito(producto)
    setAgregado(true)
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
        >
          Agregar al carrito
        </button>

        {agregado && (
          <div className="alert alert-success mt-3 mb-0" role="status">
            <p className="mb-2">
              ¡Producto agregado al carrito!
            </p>
            <Link to="/carrito" className="alert-link">
              Ver mi carrito
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductoCard
