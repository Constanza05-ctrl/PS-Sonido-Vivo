
function ProductoCard({ producto }) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{producto.nombre}</h5>

        <p className="card-text">
          {producto.descripcion}
        </p>

        <p className="mb-1">
          <strong>Categoría:</strong> {producto.categoria}
        </p>

        <p className="mb-1">
          <strong>Stock:</strong> {producto.stock}
        </p>

        <p className="fw-bold mt-3">
          ${producto.precio.toLocaleString('es-CL')}
        </p>
      </div>
    </div>
  )
}

export default ProductoCard
