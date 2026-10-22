
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'
import { guardarPedido } from '../services/carritoService'

const formatoPrecio = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0
})

function Checkout() {
  const { items, totalCompra, vaciarCarrito } = useCarrito()

  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [correo, setCorreo] = useState('')
  const [telefono, setTelefono] = useState('')
  const [tipoEntrega, setTipoEntrega] = useState('retiro')
  const [direccion, setDireccion] = useState('')
  const [compraConfirmada, setCompraConfirmada] = useState(null)
  const [errorConfirmacion, setErrorConfirmacion] = useState('')

  const subtotal = Number(totalCompra) || 0

  const costoDespacho =
    tipoEntrega === 'despacho'
      ? Math.round(subtotal * 0.10)
      : 0

  const totalFinal = subtotal + costoDespacho

  function manejarConfirmacion(evento) {
    evento.preventDefault()
    setErrorConfirmacion('')

    if (items.length === 0) {
      setErrorConfirmacion(
        'Tu carrito está vacío. Agrega productos antes de comprar.'
      )
      return
    }

    const pedido = {
      numeroPedido: `SV-${Date.now()}`,
      fecha: new Date().toISOString(),
      cliente: {
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        correo: correo.trim(),
        telefono: telefono.trim()
      },
      tipoEntrega,
      direccion: tipoEntrega === 'despacho' ? direccion.trim() : '',
      productos: items.map(item => ({
        ...item,
        precio: Number(item.precio),
        cantidad: Number(item.cantidad),
        subtotal: Number(item.precio) * Number(item.cantidad)
      })),
      subtotal,
      costoDespacho,
      total: totalFinal,
      estado: 'En preparación'
    }

    try {
      // Primero guardamos el pedido completo.
      guardarPedido(pedido)
    } catch {
      setErrorConfirmacion(
        'No pudimos guardar tu pedido. Tu carrito se mantiene intacto. Inténtalo nuevamente.'
      )
      return
    }

    // Solo vaciamos el carrito después de guardar el pedido.
    vaciarCarrito()
    setCompraConfirmada(pedido)
  }

  if (compraConfirmada) {
    const pedido = compraConfirmada

    return (
      <main className="container py-5">
        <div className="alert alert-success" role="status">
          <h1 className="h3">¡Compra confirmada!</h1>
          <p className="mb-1">
            Gracias por comprar en Sonido Vivo, {pedido.cliente.nombre}.
          </p>
          <p className="mb-0">
            Tu pedido fue registrado correctamente.
          </p>
        </div>

        <section className="card mb-4">
          <div className="card-body">
            <h2 className="h4">Resumen de tu pedido</h2>

            <p>
              <strong>Número de pedido:</strong>{' '}
              {pedido.numeroPedido}
            </p>

            <p>
              <strong>Cliente:</strong>{' '}
              {pedido.cliente.nombre} {pedido.cliente.apellido}
            </p>

            <p>
              <strong>Correo:</strong> {pedido.cliente.correo}
            </p>

            <p>
              <strong>Entrega:</strong>{' '}
              {pedido.tipoEntrega === 'retiro'
                ? 'Retiro en tienda'
                : 'Despacho a domicilio'}
            </p>

            {pedido.tipoEntrega === 'despacho' && (
              <p>
                <strong>Dirección:</strong> {pedido.direccion}
              </p>
            )}

            <h3 className="h5 mt-4">Productos comprados</h3>

            <ul className="list-group mb-3">
              {pedido.productos.map(item => (
                <li
                  className="list-group-item d-flex justify-content-between gap-3"
                  key={item.id}
                >
                  <span>
                    {item.nombre} × {item.cantidad}
                  </span>
                  <span className="text-nowrap">
                    {formatoPrecio.format(item.subtotal)}
                  </span>
                </li>
              ))}
            </ul>

            <p className="d-flex justify-content-between mb-2">
              <span>Subtotal productos</span>
              <span>{formatoPrecio.format(pedido.subtotal)}</span>
            </p>

            <p className="d-flex justify-content-between mb-2">
              <span>Costo de despacho</span>
              <span>{formatoPrecio.format(pedido.costoDespacho)}</span>
            </p>

            <p className="d-flex justify-content-between fw-bold fs-5">
              <span>Total pagado</span>
              <span>{formatoPrecio.format(pedido.total)}</span>
            </p>

            <p className="text-secondary mb-0">
              Estado del pedido: {pedido.estado}
            </p>
          </div>
        </section>

        <Link to="/catalogo" className="btn btn-primary">
          Volver al catálogo
        </Link>
      </main>
    )
  }

  if (items.length === 0) {
    return (
      <main className="container py-5">
        <h1>Confirmar compra</h1>
        <p>Tu carrito está vacío. Agrega productos antes de continuar.</p>
        <Link to="/catalogo" className="btn btn-primary">
          Ir al catálogo
        </Link>
      </main>
    )
  }

  return (
    <main className="container py-5">
      <h1 className="mb-4">Confirmar compra</h1>

      <div className="row g-4">
        <section className="col-12 col-lg-7">
          <form onSubmit={manejarConfirmacion}>
            <fieldset className="border rounded p-3 mb-4">
              <legend className="float-none w-auto px-2">
                Datos del cliente
              </legend>

              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">
                  Nombre
                </label>
                <input
                  id="nombre"
                  className="form-control"
                  type="text"
                  value={nombre}
                  onChange={evento => setNombre(evento.target.value)}
                  autoComplete="given-name"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="apellido" className="form-label">
                  Apellido
                </label>
                <input
                  id="apellido"
                  className="form-control"
                  type="text"
                  value={apellido}
                  onChange={evento => setApellido(evento.target.value)}
                  autoComplete="family-name"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="correo" className="form-label">
                  Correo electrónico
                </label>
                <input
                  id="correo"
                  className="form-control"
                  type="email"
                  value={correo}
                  onChange={evento => setCorreo(evento.target.value)}
                  autoComplete="email"
                  required
                />
              </div>

              <div>
                <label htmlFor="telefono" className="form-label">
                  Teléfono
                </label>
                <input
                  id="telefono"
                  className="form-control"
                  type="tel"
                  value={telefono}
                  onChange={evento => setTelefono(evento.target.value)}
                  autoComplete="tel"
                  required
                />
              </div>
            </fieldset>

            <fieldset className="border rounded p-3 mb-4">
              <legend className="float-none w-auto px-2">
                Tipo de entrega
              </legend>

              <div className="form-check mb-2">
                <input
                  id="retiro"
                  className="form-check-input"
                  type="radio"
                  name="tipoEntrega"
                  value="retiro"
                  checked={tipoEntrega === 'retiro'}
                  onChange={evento => setTipoEntrega(evento.target.value)}
                />
                <label htmlFor="retiro" className="form-check-label">
                  Retiro en tienda — Gratis
                </label>
              </div>

              <div className="form-check mb-3">
                <input
                  id="despacho"
                  className="form-check-input"
                  type="radio"
                  name="tipoEntrega"
                  value="despacho"
                  checked={tipoEntrega === 'despacho'}
                  onChange={evento => setTipoEntrega(evento.target.value)}
                />
                <label htmlFor="despacho" className="form-check-label">
                  Despacho a domicilio — 10 % del subtotal
                </label>
              </div>

              {tipoEntrega === 'despacho' && (
                <div>
                  <label htmlFor="direccion" className="form-label">
                    Dirección de despacho
                  </label>
                  <input
                    id="direccion"
                    className="form-control"
                    type="text"
                    value={direccion}
                    onChange={evento => setDireccion(evento.target.value)}
                    autoComplete="street-address"
                    required
                  />
                </div>
              )}
            </fieldset>

            {errorConfirmacion && (
              <div className="alert alert-danger" role="alert">
                {errorConfirmacion}
              </div>
            )}

            <button type="submit" className="btn btn-success">
              Confirmar compra
            </button>
          </form>
        </section>

        <aside className="col-12 col-lg-5">
          <div className="card">
            <div className="card-body">
              <h2 className="h4 card-title">Resumen de compra</h2>

              <ul className="list-group list-group-flush mb-3">
                {items.map(item => (
                  <li
                    className="list-group-item px-0"
                    key={item.id}
                  >
                    <div className="d-flex justify-content-between gap-3">
                      <span>
                        {item.nombre} × {item.cantidad}
                      </span>
                      <span className="text-nowrap">
                        {formatoPrecio.format(
                          Number(item.precio) * Number(item.cantidad)
                        )}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              <p className="d-flex justify-content-between">
                <span>Subtotal productos</span>
                <span>{formatoPrecio.format(subtotal)}</span>
              </p>

              <p className="d-flex justify-content-between">
                <span>Costo de despacho</span>
                <span>{formatoPrecio.format(costoDespacho)}</span>
              </p>

              <p className="d-flex justify-content-between fw-bold fs-5">
                <span>Total</span>
                <span>{formatoPrecio.format(totalFinal)}</span>
              </p>

              <p className="text-secondary small">
                El costo de despacho corresponde al 10 % del subtotal.
                El retiro en tienda es gratuito.
              </p>

              <Link to="/carrito" className="btn btn-outline-secondary w-100">
                Volver al carrito
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}

export default Checkout
