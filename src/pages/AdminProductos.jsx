
import { useState } from 'react'
import { useProductos } from '../context/ProductoContext'
import PublicTemplate from '../components/templates/PublicTemplate'

const formularioInicial = {
  nombre: '',
  categoria: '',
  marca: '',
  modelo: '',
  stock: '',
  precio: '',
  descripcion: ''
}

function AdminProductos() {
  const { productos, agregarProducto, actualizarProducto, eliminarProducto } = useProductos()
  const [formulario, setFormulario] = useState(formularioInicial)
  const [productoEnEdicion, setProductoEnEdicion] = useState(null)
  const [mensaje, setMensaje] = useState('')

  const categorias = [
    ...new Set(productos.map(producto => producto.categoria))
  ].sort((a, b) => a.localeCompare(b, 'es'))

  function manejarCambio(evento) {
    const { name, value } = evento.target

    setFormulario({
      ...formulario,
      [name]: value
    })
  }

  function limpiarFormulario() {
    setFormulario(formularioInicial)
    setProductoEnEdicion(null)
  }

  function manejarEnvio(evento) {
    evento.preventDefault()

    const nombre = formulario.nombre.trim()
    const categoria = formulario.categoria.trim()
    const marca = formulario.marca.trim()
    const modelo = formulario.modelo.trim()
    const descripcion = formulario.descripcion.trim()
    const stock = Number(formulario.stock)
    const precio = Number(formulario.precio)

    if (
      !nombre ||
      !categoria ||
      !marca ||
      !modelo ||
      !descripcion ||
      formulario.stock === '' ||
      formulario.precio === '' ||
      !Number.isInteger(stock) ||
      stock < 0 ||
      !Number.isFinite(precio) ||
      precio < 0
    ) {
      setMensaje('Completa todos los campos con valores válidos.')
      return
    }

    const datosProducto = {
      nombre,
      categoria,
      marca,
      modelo,
      stock,
      precio,
      descripcion
    }

    if (productoEnEdicion) {
      actualizarProducto(productoEnEdicion.id, datosProducto)
      setMensaje('Producto actualizado correctamente.')
    } else {
      agregarProducto(datosProducto)
      setMensaje('Producto agregado correctamente.')
    }

    limpiarFormulario()
  }

  function prepararEdicion(producto) {
    setProductoEnEdicion(producto)
    setFormulario({
      nombre: producto.nombre,
      categoria: producto.categoria,
      marca: producto.marca,
      modelo: producto.modelo,
      stock: String(producto.stock),
      precio: String(producto.precio),
      descripcion: producto.descripcion
    })
    setMensaje('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function manejarEliminacion(producto) {
    const confirmar = window.confirm(
      `¿Seguro que quieres eliminar "${producto.nombre}"?`
    )

    if (!confirmar) return

    eliminarProducto(producto.id)

    if (productoEnEdicion?.id === producto.id) {
      limpiarFormulario()
    }

    setMensaje('Producto eliminado correctamente.')
  }

  return (
    <PublicTemplate>
      <main className="container py-5">
        <h1 className="mb-4">Administración de productos</h1>

        {mensaje && (
          <div className="alert alert-info" role="status">
            {mensaje}
          </div>
        )}

        <section className="card shadow-sm mb-5">
          <div className="card-body">
            <h2 className="h4 mb-4">
              {productoEnEdicion ? 'Editar producto' : 'Agregar producto'}
            </h2>

            <form onSubmit={manejarEnvio}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="nombre" className="form-label">Nombre</label>
                  <input
                    id="nombre"
                    name="nombre"
                    className="form-control"
                    value={formulario.nombre}
                    onChange={manejarCambio}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="categoria" className="form-label">Categoría</label>
                  <input
                    id="categoria"
                    name="categoria"
                    className="form-control"
                    list="categorias-productos"
                    value={formulario.categoria}
                    onChange={manejarCambio}
                    required
                  />
                  <datalist id="categorias-productos">
                    {categorias.map(categoria => (
                      <option key={categoria} value={categoria} />
                    ))}
                  </datalist>
                </div>

                <div className="col-md-4">
                  <label htmlFor="marca" className="form-label">Marca</label>
                  <input
                    id="marca"
                    name="marca"
                    className="form-control"
                    value={formulario.marca}
                    onChange={manejarCambio}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label htmlFor="modelo" className="form-label">Modelo</label>
                  <input
                    id="modelo"
                    name="modelo"
                    className="form-control"
                    value={formulario.modelo}
                    onChange={manejarCambio}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label htmlFor="stock" className="form-label">Stock</label>
                  <input
                    id="stock"
                    name="stock"
                    type="number"
                    min="0"
                    step="1"
                    className="form-control"
                    value={formulario.stock}
                    onChange={manejarCambio}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="precio" className="form-label">Precio (CLP)</label>
                  <input
                    id="precio"
                    name="precio"
                    type="number"
                    min="0"
                    step="1"
                    className="form-control"
                    value={formulario.precio}
                    onChange={manejarCambio}
                    required
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="descripcion" className="form-label">Descripción</label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    className="form-control"
                    rows="3"
                    value={formulario.descripcion}
                    onChange={manejarCambio}
                    required
                  />
                </div>
              </div>

              <div className="d-flex gap-2 mt-4">
                <button type="submit" className="btn btn-primary">
                  {productoEnEdicion ? 'Guardar cambios' : 'Agregar producto'}
                </button>

                {productoEnEdicion && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={limpiarFormulario}
                  >
                    Cancelar edición
                  </button>
                )}
              </div>
            </form>
          </div>
        </section>

        <section>
          <h2 className="h4 mb-3">Inventario ({productos.length})</h2>

          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {productos.map(producto => (
                  <tr key={producto.id}>
                    <td>
                      <strong>{producto.nombre}</strong>
                      <div className="text-muted small">
                        {producto.marca} · {producto.modelo}
                      </div>
                    </td>
                    <td>{producto.categoria}</td>
                    <td>
                      {Number(producto.precio).toLocaleString('es-CL', {
                        style: 'currency',
                        currency: 'CLP',
                        maximumFractionDigits: 0
                      })}
                    </td>
                    <td>
                      <span className={
                        producto.stock === 0
                          ? 'badge text-bg-danger'
                          : producto.stock <= 3
                            ? 'badge text-bg-warning'
                            : 'badge text-bg-success'
                      }>
                        {producto.stock}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex flex-wrap gap-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => prepararEdicion(producto)}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => manejarEliminacion(producto)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {productos.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No hay productos en el inventario.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </PublicTemplate>
  )
}

export default AdminProductos
