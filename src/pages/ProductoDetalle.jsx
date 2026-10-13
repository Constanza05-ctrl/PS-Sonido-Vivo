import { useParams, Link } from 'react-router-dom';
import { useProductos } from '../context/ProductoContext';

function ProductoDetalle() {
  const { id } = useParams();
  const { productos } = useProductos();

  const producto = productos.find((p) => String(p.id) === String(id));

  if (!producto) {
    return (
      <main className="container py-5 text-center">
        <h2>Producto no encontrado</h2>
        <p className="text-muted">El producto que buscas no existe o ha sido removido.</p>
        <Link to="/catalogo" className="btn btn-primary mt-3">
          Volver al Catálogo
        </Link>
      </main>
    );
  }

  return (
    <main className="container py-5">
      <div className="mb-4">
        <Link to="/catalogo" className="btn btn-outline-secondary btn-sm">
          &larr; Volver al catálogo
        </Link>
      </div>

      <div className="row g-4 align-items-center">
        <div className="col-12 col-md-6">
          <img
            src={producto.imagen || 'https://via.placeholder.com/400x300?text=Sonido+Vivo'}
            alt={producto.nombre}
            className="img-fluid rounded shadow-sm w-100"
            style={{ maxHeight: '400px', objectFit: 'cover' }}
          />
        </div>

        <div className="col-12 col-md-6">
          {producto.categoria && (
            <span className="badge bg-secondary mb-2 text-capitalize">
              {producto.categoria}
            </span>
          )}
          <h1 className="display-5 fw-bold">{producto.nombre}</h1>
          <p className="fs-3 text-success fw-bold me-2">
            ${producto.precio ? producto.precio.toLocaleString('es-CL') : '0'}
          </p>
          <p className="lead">{producto.descripcion || 'Sin descripción disponible.'}</p>

          <div className="d-grid gap-2 d-md-block mt-4">
            <button className="btn btn-dark btn-lg me-md-2" type="button">
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductoDetalle;