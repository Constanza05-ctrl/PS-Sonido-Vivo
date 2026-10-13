
import ListaProductos from '../organisms/ListaProductos'

function CatalogoTemplate({ productos }) {
  return (
    <main className="container py-5">
      <div className="text-center mb-5">
        <h1>Catálogo de productos</h1>

        <p className="lead">
          Explora nuestros instrumentos y equipos de sonido.
        </p>
      </div>

      <ListaProductos productos={productos} />
    </main>
  )
}

export default CatalogoTemplate
