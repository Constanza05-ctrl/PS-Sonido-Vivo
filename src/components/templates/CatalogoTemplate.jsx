
import ListaProductos from '../organisms/ListaProductos'
import BarraBusqueda from '../molecules/BarraBusqueda'
import FiltroCategoria from '../molecules/FiltroCategoria'

function CatalogoTemplate({
  productos,
  busqueda,
  onBusquedaChange,
  categorias,
  categoriaSeleccionada,
  onCategoriaChange
}) {
  return (
    <main className="container py-5">
      <div className="text-center mb-5">
        <h1>Catálogo de productos</h1>

        <p className="lead">
          Explora nuestros instrumentos y equipos de sonido.
        </p>
      </div>

      <div className="row mb-4">
        <div className="col-12 col-md-6">
          <BarraBusqueda
            valor={busqueda}
            onChange={onBusquedaChange}
          />
        </div>

        <div className="col-12 col-md-6">
          <FiltroCategoria
            categorias={categorias}
            valor={categoriaSeleccionada}
            onChange={onCategoriaChange}
          />
        </div>
      </div>

      <ListaProductos productos={productos} />
    </main>
  )
}

export default CatalogoTemplate

