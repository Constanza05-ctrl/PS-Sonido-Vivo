
import { useState } from 'react'
import { useProductos } from '../context/ProductoContext'
import PublicTemplate from '../components/templates/PublicTemplate'
import categorias from '../data/categorias'

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
  const {
    productos,
    agregarProducto,
    actualizarProducto,
    eliminarProducto
  } = useProductos()

  const [formulario, setFormulario] = useState(formularioInicial)
  const [productoEnEdicion, setProductoEnEdicion] = useState(null)
  const [mensaje, setMensaje] = useState('')
  const [errores, setErrores] = useState({})

  const productosAgotados = productos.filter(
    producto => Number(producto.stock) === 0
  ).length

  const productosStockBajo = productos.filter(
    producto => Number(producto.stock) > 0 &&
      Number(producto.stock) <= 3
  ).length

  const productosStockNormal = productos.filter(
    producto => Number(producto.stock) > 3
  ).length

  function manejarCambio(evento) {
    const { name, value } = evento.target

    setFormulario({
      ...formulario,
      [name]: value
    })

    setErrores(previos => ({
      ...previos,
      [name]: ''
    }))
  }

  function limpiarFormulario() {
    setFormulario({ ...formularioInicial })
    setProductoEnEdicion(null)
    setErrores({})
  }

  function manejarEnvio(evento) {
    evento.preventDefault()
    setMensaje('')
    setErrores({})

    const datosProducto = {
      nombre: formulario.nombre.trim(),
      categoria: formulario.categoria.trim(),
      marca: formulario.marca.trim(),
      modelo: formulario.modelo.trim(),
      stock: formulario.stock,
      precio: formulario.precio,
      descripcion: formulario.descripcion.trim()
    }

    try {
      if (productoEnEdicion) {
        actualizarProducto(productoEnEdicion.id, datosProducto)
        setMensaje('Producto actualizado correctamente.')
      } else {
        agregarProducto(datosProducto)
        setMensaje('Producto agregado correctamente.')
      }

      limpiarFormulario()
    } catch (error) {
      if (error.errores) {
        setErrores(error.errores)
        setMensaje('Revisa los campos indicados antes de guardar.')
      } else {
        setMensaje('No se pudo guardar el producto. Inténtalo nuevamente.')
      }
    }
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
    setErrores({})
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
          <div
            className={`alert ${
              Object.keys(errores).length > 0
                ? 'alert-danger'
                : 'alert-info'
            }`}
            role="status"
          >
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
                  <label htmlFor="nombre" className="form-label">
                    Nombre
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                    value={formulario.nombre}
                    onChange={manejarCambio}
                    required
                  />
                  {errores.nombre && (
                    <div className="text-danger small mt-1">
                      {errores.nombre}
                    </div>
                  )}
                </div>

                <div className="col-md-6">
                  <label htmlFor="categoria" className="form-label">
                    Categoría
                  </label>
                  <select
                    id="categoria"
                    name="categoria"
                    className={`form-select ${errores.categoria ? 'is-invalid' : ''}`}
                    value={formulario.categoria}
                    onChange={manejarCambio}
                    required
                  >
                    <option value="">Selecciona una categoría</option>
                    {categorias.map(categoria => (
                      <option key={categoria} value={categoria}>
                        {categoria}
                      </option>
                    ))}
                  </select>
                  {errores.categoria && (
                    <div className="text-danger small mt-1">
                      {errores.categoria}
                    </div>
                  )}
                </div>

                <div className="col-md-4">
                  <label htmlFor="marca" className="form-label">
                    Marca
                  </label>
                  <input
                    id="marca"
                    name="marca"
                    className={`form-control ${errores.marca ? 'is-invalid' : ''}`}
                    value={formulario.marca}
                    onChange={manejarCambio}
                    required
                  />
                  {errores.marca && (
                    <div className="text-danger small mt-1">
                      {errores.marca}
                    </div>
                  )}
                </div>

                <div className="col-md-4">
                  <label htmlFor="modelo" className="form-label">
                    Modelo
                  </label>
                  <input
                    id="modelo"
                    name="modelo"
                    className={`form-control ${errores.modelo ? 'is-invalid' : ''}`}
                    value={formulario.modelo}
                    onChange={manejarCambio}
                    required
                  />
                  {errores.modelo && (
                    <div className="text-danger small mt-1">
                      {errores.modelo}
                    </div>
                  )}
                </div>

                <div className="col-md-4">
                  <label htmlFor="stock" className="form-label">
                    Stock
                  </label>
                  <input
                    id="stock"
                    name="stock"
                    type="number"
                    min="0"
                    step="1"
                    className={`form-control ${errores.stock ? 'is-invalid' : ''}`}
                    value={formulario.stock}
                    onChange={manejarCambio}
                    required
                  />
                  {errores.stock && (
                    <div className="text-danger small mt-1">
                      {errores.stock}
                    </div>
                  )}
                </div>

                <div className="col-md-6">
                  <label htmlFor="precio" className="form-label">
                    Precio (CLP)
                  </label>
                  <input
                    id="precio"
                    name="precio"
                    type="number"
                    min="1"
                    step="1"
                    className={`form-control ${errores.precio ? 'is-invalid' : ''}`}
                    value={formulario.precio}
                    onChange={manejarCambio}
                    required
                  />
                  {errores.precio && (
                    <div className="text-danger small mt-1">
                      {errores.precio}
                    </div>
                  )}
                </div>

                <div className="col-12">
                  <label htmlFor="descripcion" className="form-label">
                    Descripción
                  </label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    className={`form-control ${errores.descripcion ? 'is-invalid' : ''}`}
                    rows="3"
                    value={formulario.descripcion}
                    onChange={manejarCambio}
                    required
                  />
                  {errores.descripcion && (
                    <div className="text-danger small mt-1">
                      {errores.descripcion}
                    </div>
                  )}
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
          <h2 className="h4 mb-3">
            Inventario ({productos.length})
          </h2>

          <div className="row g-3 mb-4">
            <div className="col-12 col-md-4">
              <div className="card border-danger h-100">
                <div className="card-body">
                  <h3 className="h6 text-danger">Productos agotados</h3>
                  <p className="display-6 mb-0">{productosAgotados}</p>
                  <small className="text-muted">Stock igual a 0</small>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card border-warning h-100">
                <div className="card-body">
                  <h3 className="h6 text-warning-emphasis">Stock bajo</h3>
                  <p className="display-6 mb-0">{productosStockBajo}</p>
                  <small className="text-muted">
                    Entre 1 y 3 unidades
                  </small>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card border-success h-100">
                <div className="card-body">
                  <h3 className="h6 text-success">Stock normal</h3>
                  <p className="display-6 mb-0">{productosStockNormal}</p>
                  <small className="text-muted">Más de 3 unidades</small>
                </div>
              </div>
            </div>
          </div>

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
                      <span
                        className={
                          Number(producto.stock) === 0
                            ? 'badge text-bg-danger'
                            : Number(producto.stock) <= 3
                              ? 'badge text-bg-warning'
                              : 'badge text-bg-success'
                        }
                      >
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

