
import CantidadInput from '../atoms/CantidadInput'

function CarritoItem({
  producto,
  onCambiarCantidad,
  onQuitar
}) {
  const subtotal = producto.precio * producto.cantidad

  return (
    <article className="card mb-3">
      <div className="card-body">
        <div className="row align-items-center g-3">
          <div className="col-12 col-md-5">
            <h2 className="h6 mb-1">{producto.nombre}</h2>
            <p className="text-muted mb-0">
              {producto.marca || 'Sonido Vivo'}
            </p>
          </div>

          <div className="col-6 col-md-2">
            <span className="d-block small text-muted">Precio</span>
            ${producto.precio.toLocaleString('es-CL')}
          </div>

          <div className="col-6 col-md-2">
            <label className="form-label small">
              Cantidad
            </label>
            <CantidadInput
              cantidad={producto.cantidad}
              onChange={cantidad =>
                onCambiarCantidad(producto.id, cantidad)
              }
            />
          </div>

          <div className="col-8 col-md-2">
            <span className="d-block small text-muted">Subtotal</span>
            <strong>
              ${subtotal.toLocaleString('es-CL')}
            </strong>
          </div>

          <div className="col-4 col-md-1 text-end">
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              aria-label={`Quitar ${producto.nombre}`}
              onClick={() => onQuitar(producto.id)}
            >
              Quitar
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default CarritoItem
