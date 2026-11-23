import { useState } from 'react'
import PublicTemplate from '../components/templates/PublicTemplate'
import {
  obtenerPedidosGuardados,
  actualizarPedido
} from '../services/carritoService'

const formatoPrecio = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0
})

function formatearFecha(fechaIso) {
  if (!fechaIso) return '—'
  try {
    return new Date(fechaIso).toLocaleDateString('es-CL', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return fechaIso
  }
}

function resolverEstadoPago(pedido) {
  if (pedido.estadoPago) return pedido.estadoPago
  if (pedido.metodoPago?.toLowerCase().includes('efectivo')) {
    return 'Pago pendiente'
  }
  return 'Pago realizado'
}

function AdminPedidos() {
  const [pedidos, setPedidos] = useState(() =>
    obtenerPedidosGuardados().reverse()
  )
  const [mensaje, setMensaje] = useState('')
  const [busquedaOrden, setBusquedaOrden] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('')

  function recargarPedidos() {
    setPedidos(obtenerPedidosGuardados().reverse())
  }

  function confirmarPagoEnTienda(numeroPedido) {
    actualizarPedido(numeroPedido, { estadoPago: 'Pago realizado' })
    setMensaje(`Pago confirmado en caja para la orden ${numeroPedido}.`)
    recargarPedidos()
  }

  function cambiarEstadoPedido(numeroPedido, nuevoEstado) {
    actualizarPedido(numeroPedido, { estado: nuevoEstado })
    setMensaje(`Orden ${numeroPedido} actualizada a "${nuevoEstado}".`)
    recargarPedidos()
  }

  function limpiarFiltros() {
    setBusquedaOrden('')
    setFiltroEstado('')
  }

  const totalPendientesPago = pedidos.filter(
    p => resolverEstadoPago(p) === 'Pago pendiente'
  ).length
  const totalEnPreparacion = pedidos.filter(
    p => p.estado === 'En preparación'
  ).length
  const totalListos = pedidos.filter(p => p.estado === 'Listo').length

  const pedidosFiltrados = pedidos.filter(pedido => {
    const termino = busquedaOrden.trim().toLowerCase()
    const coincideBusqueda =
      termino === '' ||
      String(pedido.numeroPedido || '').toLowerCase().includes(termino) ||
      String(pedido.usuarioEmail || '').toLowerCase().includes(termino) ||
      String(pedido.cliente?.nombre || '').toLowerCase().includes(termino)

    const coincideEstado =
      filtroEstado === '' || pedido.estado === filtroEstado

    return coincideBusqueda && coincideEstado
  })

  return (
    <PublicTemplate>
      <main className="container py-5">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2">
          <h1 className="mb-0">Gestión de Pedidos</h1>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={recargarPedidos}
          >
            Refrescar órdenes
          </button>
        </div>

        {mensaje && (
          <div className="alert alert-success" role="status">
            {mensaje}
          </div>
        )}

        <div className="row g-3 mb-4">
          <div className="col-12 col-md-4">
            <div className="card border-warning h-100">
              <div className="card-body">
                <h2 className="h6 text-warning-emphasis">Pendientes de pago en tienda</h2>
                <p className="display-6 mb-0">{totalPendientesPago}</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card border-info h-100">
              <div className="card-body">
                <h2 className="h6 text-info-emphasis">En preparación</h2>
                <p className="display-6 mb-0">{totalEnPreparacion}</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card border-primary h-100">
              <div className="card-body">
                <h2 className="h6 text-primary">Listos para retiro / despacho</h2>
                <p className="display-6 mb-0">{totalListos}</p>
              </div>
            </div>
          </div>
        </div>

        <section className="card shadow-sm mb-4">
          <div className="card-body">
            <div className="row g-2 align-items-center">
              <div className="col-12 col-md-6">
                <label htmlFor="buscar-orden-admin" className="form-label small fw-bold mb-1">
                  Buscar pedido por N° Orden o cliente
                </label>
                <input
                  id="buscar-orden-admin"
                  type="text"
                  className="form-control"
                  placeholder="Ej: SV-17... o cliente@sonidovivo.cl"
                  value={busquedaOrden}
                  onChange={e => setBusquedaOrden(e.target.value)}
                />
              </div>

              <div className="col-8 col-md-4">
                <label htmlFor="filtrar-estado-admin" className="form-label small fw-bold mb-1">
                  Filtrar por estado
                </label>
                <select
                  id="filtrar-estado-admin"
                  className="form-select"
                  value={filtroEstado}
                  onChange={e => setFiltroEstado(e.target.value)}
                >
                  <option value="">Todos los estados ({pedidos.length})</option>
                  <option value="En preparación">En preparación ({totalEnPreparacion})</option>
                  <option value="Listo">Listo ({totalListos})</option>
                  <option value="Entregado">Entregado</option>
                </select>
              </div>

              <div className="col-4 col-md-2 d-flex align-items-end">
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100 mt-md-4"
                  onClick={limpiarFiltros}
                  disabled={!busquedaOrden && !filtroEstado}
                >
                  Limpiar
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>N° Orden</th>
                <th>Cliente</th>
                <th>Detalle</th>
                <th>Total</th>
                <th>Estado Pago</th>
                <th>Estado Pedido</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pedidosFiltrados.map(pedido => {
                const estadoPago = resolverEstadoPago(pedido)
                const pagoPendiente = estadoPago === 'Pago pendiente'

                return (
                  <tr key={pedido.numeroPedido}>
                    <td>
                      <strong>{pedido.numeroPedido}</strong>
                      <div className="small text-muted">{formatearFecha(pedido.fecha)}</div>
                    </td>
                    <td>
                      <div>{pedido.cliente?.nombre} {pedido.cliente?.apellido}</div>
                      <div className="small text-muted">{pedido.usuarioEmail || pedido.cliente?.correo}</div>
                    </td>
                    <td className="small">
                      <ul className="mb-1 ps-3">
                        {pedido.productos?.map((item, idx) => (
                          <li key={idx}>
                            {item.nombre} × {item.cantidad}
                          </li>
                        ))}
                      </ul>
                      <span className="text-muted">
                        {pedido.tipoEntrega === 'despacho'
                          ? `Despacho: ${pedido.direccion}`
                          : 'Retiro en tienda'}
                      </span>
                    </td>
                    <td className="fw-bold">
                      {formatoPrecio.format(Number(pedido.total) || 0)}
                      <div className="small fw-normal text-muted">{pedido.metodoPago}</div>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          pagoPendiente ? 'bg-warning text-dark' : 'bg-success'
                        }`}
                      >
                        {estadoPago}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          pedido.estado === 'Entregado'
                            ? 'bg-success'
                            : pedido.estado === 'Listo'
                              ? 'bg-primary'
                              : 'bg-info text-dark'
                        }`}
                      >
                        {pedido.estado}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex flex-column gap-1">
                        {pagoPendiente && (
                          <button
                            type="button"
                            className="btn btn-sm btn-warning"
                            onClick={() => confirmarPagoEnTienda(pedido.numeroPedido)}
                          >
                            Confirmar pago en caja
                          </button>
                        )}

                        {pedido.estado === 'En preparación' && (
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => cambiarEstadoPedido(pedido.numeroPedido, 'Listo')}
                          >
                            Marcar como Listo
                          </button>
                        )}

                        {pedido.estado === 'Listo' && (
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-success"
                            onClick={() => cambiarEstadoPedido(pedido.numeroPedido, 'Entregado')}
                          >
                            Marcar como Entregado
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}

              {pedidosFiltrados.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    {pedidos.length === 0
                      ? 'No existen pedidos registrados todavía.'
                      : 'No se encontraron pedidos que coincidan con la búsqueda.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </PublicTemplate>
  )
}

export default AdminPedidos