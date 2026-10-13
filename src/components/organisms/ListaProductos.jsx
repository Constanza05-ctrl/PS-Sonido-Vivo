
import ProductoCard from '../molecules/ProductoCard'

function ListaProductos({ productos }) {
  if (productos.length === 0) {
    return (
      <p className="text-center mt-4">
        No hay productos disponibles.
      </p>
    )
  }

  return (
    <div className="row g-4">
      {productos.map(producto => (
        <div className="col-12 col-md-6 col-lg-4" key={producto.id}>
          <ProductoCard producto={producto} />
        </div>
      ))}
    </div>
  )
}

export default ListaProductos
