
import { useNavigate } from 'react-router-dom'
import { useCarrito } from '../../context/CarritoContext'

function ResumenCarrito() {
  const navigate = useNavigate()
  const { items, totalUnidades, totalCompra, vaciarCarrito } =
    useCarrito()

  return (
    <aside className="card">
      <div className="card-body">
        <h2 className="h5">Resumen de compra</h2>

        <div className="d-flex justify-content-between my-3">
          <span>Productos</span>
          <span>{totalUnidades}</span>
        </div>

        <hr />

        <div className="d-flex justify-content-between mb-3">
          <strong>Total</strong>
          <strong>
            ${totalCompra.toLocaleString('es-CL')}
          </strong>
        </div>

        <button
          type="button"
          className="btn btn-primary w-100 mb-2"
          disabled={items.length === 0}
          onClick={() => navigate('/checkout')}
        >
          Continuar compra
        </button>

        <button
          type="button"
          className="btn btn-outline-secondary w-100"
          disabled={items.length === 0}
          onClick={vaciarCarrito}
        >
          Vaciar carrito
        </button>
      </div>
    </aside>
  )
}

export default ResumenCarrito
