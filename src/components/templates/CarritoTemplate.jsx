
import ListaCarrito from '../organisms/ListaCarrito'
import ResumenCarrito from '../organisms/ResumenCarrito'

function CarritoTemplate() {
  return (
    <main className="container py-5">
      <header className="mb-4">
        <h1 className="display-6 fw-bold">Mi carrito</h1>
        <p className="text-muted">
          Revisa tus productos antes de continuar con la compra.
        </p>
      </header>

      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <ListaCarrito />
        </div>

        <div className="col-12 col-lg-4">
          <ResumenCarrito />
        </div>
      </div>
    </main>
  )
}

export default CarritoTemplate
