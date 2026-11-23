import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCarrito } from '../../context/CarritoContext'
import { useAuth } from '../../context/AuthContext'
import { obtenerPrecioFinal } from '../../utils/precioProducto'

const formatoPrecio = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0
})

function ProductoCard({ producto }) {
  const { agregarAlCarrito } = useCarrito()
  const { esAdmin } = useAuth()
  const [agregado, setAgregado] = useState(false)

  const precioOriginal = Number(producto.precio) || 0
  const precioFinal = obtenerPrecioFinal(producto)
  const tieneDescuento = producto.enOferta && precioFinal < precioOriginal
  const sinStock = Number(producto.stock) <= 0

  function manejarAgregarAlCarrito() {
    if (esAdmin || sinStock) return
    agregarAlCarrito(producto)
    setAgregado(true)
  }

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        {tieneDescuento && (
          <span className="badge text-bg-danger align-self-start mb-2">
            ¡Oferta! {producto.descuento}% de descuento
          </span>
        )}

        <h5 className="card-title">{producto.nombre}</h5>

        <p className="text-muted mb-1">
          {[producto.marca, producto.modelo].filter(Boolean).join(' ')}
        </p>

        <p className="card-text">{producto.descripcion}</p>

        <p className="small mb-2">
          <strong>Categoría:</strong> {producto.categoria}
        </p>

        <div className="mb-3">
          {tieneDescuento && (
            <p className="text-muted text-decoration-line-through mb-0">
              {formatoPrecio.format(precioOriginal)}
            </p>
          )}

          <p className={`fw-bold fs-5 mb-0 ${tieneDescuento ? 'text-danger' : ''}`}>
            {formatoPrecio.format(precioFinal)}
          </p>
        </div>

        <p className="small mb-0">
          Stock disponible: {producto.stock}
        </p>

        {!esAdmin && (
          <button
            className="btn btn-primary mt-3"
            type="button"
            onClick={manejarAgregarAlCarrito}
            disabled={sinStock}
          >
            {sinStock ? 'Sin stock' : 'Agregar al carrito'}
          </button>
        )}

        {agregado && !esAdmin && (
          <div className="alert alert-success mt-3 mb-0" role="status">
            <p className="mb-2">¡Producto agregado al carrito!</p>
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