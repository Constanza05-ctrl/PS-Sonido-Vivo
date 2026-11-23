import { useState } from 'react'
import { Link } from 'react-router-dom'
import PublicTemplate from '../components/templates/PublicTemplate'
import Button from '../components/atoms/Button'
import { useAuth } from '../context/AuthContext'
import { obtenerPedidosGuardados } from '../services/carritoService'

const formatoPrecio = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0
})

function formatearFecha(fechaIso) {
  if (!fechaIso) return 'Fecha no disponible'
  try {
    return new Date(fechaIso).toLocaleDateString('es-CL', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return fechaIso
  }
}

function obtenerClaseEstadoPedido(estado) {
  if (estado === 'Entregado') return 'bg-success'
  if (estado === 'Listo') return 'bg-primary'
  return 'bg-info text-dark'
}

function resolverEstadoPago(compra) {
  if (compra.estadoPago) return compra.estadoPago
  if (compra.metodoPago?.toLowerCase().includes('efectivo')) {
    return 'Pago pendiente'
  }
  return 'Pago realizado'
}

function Perfil() {
  const { usuario: usuarioAuth, esAdmin, actualizarPerfil } = useAuth()

  const usuario = {
    nombre: usuarioAuth?.nombre || 'Cliente Sonido Vivo',
    email: usuarioAuth?.email || 'cliente@sonidovivo.cl',
    rol: usuarioAuth?.rol || 'CLIENTE',
    estado: usuarioAuth?.activo !== false ? 'Activo' : 'Inactivo'
  }

  const [editando, setEditando] = useState(false)
  const [nombreForm, setNombreForm] = useState(usuario.nombre)
  const [emailForm, setEmailForm] = useState(usuario.email)
  const [mensajePerfil, setMensajePerfil] = useState('')
  const [errorPerfil, setErrorPerfil] = useState('')
  const [guardando, setGuardando] = useState(false)

  const [busquedaOrden, setBusquedaOrden] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('')

  function iniciarEdicion() {
    setNombreForm(usuario.nombre)
    setEmailForm(usuario.email)
    setMensajePerfil('')
    setErrorPerfil('')
    setEditando(true)
  }

  function cancelarEdicion() {
    setEditando(false)
    setErrorPerfil('')
  }

  async function manejarGuardarDatos(e) {
    e.preventDefault()
    setMensajePerfil('')
    setErrorPerfil('')
    setGuardando(true)

    try {
      await actualizarPerfil({
        nombre: nombreForm,
        email: emailForm
      })
      setEditando(false)
      setMensajePerfil('Tus datos personales fueron actualizados.')
    } catch (err) {
      setErrorPerfil(err.message || 'No se pudieron actualizar los datos.')
    } finally {
      setGuardando(false)
    }
  }

  const todosLosPedidos = obtenerPedidosGuardados()
  const pedidosUsuario = todosLosPedidos
    .filter(
      pedido =>
        pedido.usuarioEmail === usuario.email ||
        pedido.cliente?.correo === usuario.email
    )
    .reverse()

  const pedidosFiltrados = pedidosUsuario.filter(compra => {
    const coincideId = String(compra.numeroPedido || '')
      .toLowerCase()
      .includes(busquedaOrden.trim().toLowerCase())

    const coincideEstado =
      filtroEstado === '' || compra.estado === filtroEstado

    return coincideId && coincideEstado
  })

  function limpiarFiltros() {
    setBusquedaOrden('')
    setFiltroEstado('')
  }

  return (
    <PublicTemplate>
      <section className="container my-5 py-4">
        <h1 className="fw-bold mb-4">Mi Perfil</h1>

        <div className="row g-4">
          <div className="col-12 col-lg-4">
            <div className="card shadow-sm border-0 bg-light">
              <div className="card-body">
                <h5 className="card-title fw-bold mb-3">Datos Personales</h5>

                {mensajePerfil && (
                  <div className="alert alert-success py-2 small" role="status">
                    {mensajePerfil}
                  </div>
                )}

                {errorPerfil && (
                  <div className="alert alert-danger py-2 small" role="alert">
                    {errorPerfil}
                  </div>
                )}

                {editando ? (
                  <form onSubmit={manejarGuardarDatos}>
                    <div className="mb-3">
                      <label htmlFor="perfil-nombre" className="form-label small fw-bold">
                        Nombre completo
                      </label>
                      <input
                        id="perfil-nombre"
                        type="text"
                        className="form-control form-control-sm"
                        value={nombreForm}
                        onChange={e => setNombreForm(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="perfil-email" className="form-label small fw-bold">
                        Correo electrónico
                      </label>
                      <input
                        id="perfil-email"
                        type="email"
                        className="form-control form-control-sm"
                        value={emailForm}
                        onChange={e => setEmailForm(e.target.value)}
                        required
                      />
                    </div>

                    <div className="d-flex gap-2">
                      <button
                        type="submit"
                        className="btn btn-primary btn-sm flex-grow-1"
                        disabled={guardando}
                      >
                        {guardando ? 'Guardando...' : 'Guardar'}
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm"
                        onClick={cancelarEdicion}
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <p className="mb-2"><strong>Nombre:</strong> {usuario.nombre}</p>
                    <p className="mb-2"><strong>Correo:</strong> {usuario.email}</p>
                    <p className="mb-2">
                      <strong>Rol:</strong>{' '}
                      <span className="badge bg-primary">{usuario.rol}</span>
                    </p>
                    <p className="mb-3">
                      <strong>Estado:</strong>{' '}
                      <span className="badge bg-success">{usuario.estado}</span>
                    </p>
                    <Button
                      className="btn btn-outline-primary btn-sm w-100"
                      onClick={iniciarEdicion}
                    >
                      Editar Datos
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-8">
            {esAdmin ? (
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title fw-bold mb-3">
                    Panel de Cuenta Administrativa
                  </h5>
                  <p className="text-muted">
                    Tu cuenta tiene privilegios de administración en <strong>Sonido Vivo</strong>.
                    Por reglas de negocio, este perfil está destinado exclusivamente a la gestión
                    operativa del sistema y no realiza compras en la tienda.
                  </p>

                  <ul className="list-group list-group-flush mb-4">
                    <li className="list-group-item px-0 d-flex justify-content-between align-items-center">
                      <span>Gestión de cuentas, roles y estados de acceso</span>
                      <span className="badge bg-success">Habilitado</span>
                    </li>
                    <li className="list-group-item px-0 d-flex justify-content-between align-items-center">
                      <span>Administración de inventario, precios y ofertas</span>
                      <span className="badge bg-success">Habilitado</span>
                    </li>
                    <li className="list-group-item px-0 d-flex justify-content-between align-items-center">
                      <span>Control de pagos en tienda y estados de pedidos</span>
                      <span className="badge bg-success">Habilitado</span>
                    </li>
                  </ul>

                  <div className="d-flex flex-wrap gap-2">
                    <Link to="/admin/usuarios" className="btn btn-dark btn-sm">
                      Gestión de Usuarios
                    </Link>
                    <Link to="/admin/productos" className="btn btn-outline-dark btn-sm">
                      Gestión de Productos
                    </Link>
                    <Link to="/admin/pedidos" className="btn btn-outline-dark btn-sm">
                      Gestión de Pedidos
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
                    <h5 className="card-title fw-bold mb-0">
                      Historial de Pedidos ({pedidosFiltrados.length})
                    </h5>
                  </div>

                  {pedidosUsuario.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-muted mb-3">Aún no has realizado compras.</p>
                      <Link to="/catalogo" className="btn btn-primary btn-sm">
                        Explorar catálogo
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className="row g-2 mb-3">
                        <div className="col-12 col-md-6">
                          <label htmlFor="buscar-orden-cliente" className="visually-hidden">
                            Buscar por N° de Orden
                          </label>
                          <input
                            id="buscar-orden-cliente"
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Buscar por N° Orden (ej: SV-17...)"
                            value={busquedaOrden}
                            onChange={e => setBusquedaOrden(e.target.value)}
                          />
                        </div>

                        <div className="col-8 col-md-4">
                          <label htmlFor="filtrar-estado-cliente" className="visually-hidden">
                            Filtrar por estado
                          </label>
                          <select
                            id="filtrar-estado-cliente"
                            className="form-select form-select-sm"
                            value={filtroEstado}
                            onChange={e => setFiltroEstado(e.target.value)}
                          >
                            <option value="">Todos los estados</option>
                            <option value="En preparación">En preparación</option>
                            <option value="Listo">Listo</option>
                            <option value="Entregado">Entregado</option>
                          </select>
                        </div>

                        <div className="col-4 col-md-2">
                          <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm w-100"
                            onClick={limpiarFiltros}
                            disabled={!busquedaOrden && !filtroEstado}
                          >
                            Limpiar
                          </button>
                        </div>
                      </div>

                      {pedidosFiltrados.length === 0 ? (
                        <div className="text-center py-4">
                          <p className="text-muted mb-2">
                            No se encontraron pedidos con ese N° de orden o estado.
                          </p>
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            onClick={limpiarFiltros}
                          >
                            Mostrar todos mis pedidos
                          </button>
                        </div>
                      ) : (
                        <div className="table-responsive">
                          <table className="table table-hover align-middle">
                            <thead className="table-light">
                              <tr>
                                <th>N° Orden</th>
                                <th>Fecha</th>
                                <th>Productos</th>
                                <th>Entrega</th>
                                <th>Total</th>
                                <th>Pago</th>
                                <th>Pedido</th>
                              </tr>
                            </thead>
                            <tbody>
                              {pedidosFiltrados.map(compra => {
                                const estadoPago = resolverEstadoPago(compra)
                                const esPendiente = estadoPago === 'Pago pendiente'

                                return (
                                  <tr key={compra.numeroPedido}>
                                    <td className="fw-bold">{compra.numeroPedido}</td>
                                    <td className="small">{formatearFecha(compra.fecha)}</td>
                                    <td>
                                      <ul className="mb-0 ps-3 small text-secondary">
                                        {compra.productos?.map((prod, idx) => (
                                          <li key={idx}>
                                            {prod.nombre} × {prod.cantidad}
                                          </li>
                                        ))}
                                      </ul>
                                    </td>
                                    <td className="small">
                                      {compra.tipoEntrega === 'despacho'
                                        ? `Despacho (${compra.direccion})`
                                        : 'Retiro en tienda'}
                                    </td>
                                    <td className="fw-bold text-success">
                                      {formatoPrecio.format(Number(compra.total) || 0)}
                                    </td>
                                    <td>
                                      <span
                                        className={`badge ${
                                          esPendiente ? 'bg-warning text-dark' : 'bg-success'
                                        }`}
                                      >
                                        {estadoPago}
                                      </span>
                                    </td>
                                    <td>
                                      <span className={`badge ${obtenerClaseEstadoPedido(compra.estado)}`}>
                                        {compra.estado}
                                      </span>
                                    </td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </PublicTemplate>
  )
}

export default Perfil