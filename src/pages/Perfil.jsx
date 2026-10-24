import PublicTemplate from '../components/templates/PublicTemplate'
import Button from '../components/atoms/Button'

const HISTORIAL_COMPRAS = [
  {
    id: 'ORD-2026-001',
    fecha: '12 de Octubre, 2026',
    total: '$450.000',
    estado: 'Entregado',
    productos: ['Bajo Eléctrico Fender Jazz Bass 4 Cuerdas']
  },
  {
    id: 'ORD-2026-002',
    fecha: '02 de Septiembre, 2026',
    total: '$120.000',
    estado: 'Entregado',
    productos: ['Amplificador de Práctica 20W', 'Cable Plug-Plug 3m']
  }
]

function Perfil() {
  const usuario = {
    nombre: 'Constanza Carrasco',
    email: 'cliente@sonidovivo.cl',
    rut: '21.456.789-0',
    telefono: '+56 9 8765 4321'
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
                <p className="mb-2"><strong>Nombre:</strong> {usuario.nombre}</p>
                <p className="mb-2"><strong>Correo:</strong> {usuario.email}</p>
                <p className="mb-2"><strong>RUT:</strong> {usuario.rut}</p>
                <p className="mb-3"><strong>Teléfono:</strong> {usuario.telefono}</p>
                <Button className="btn btn-outline-primary btn-sm w-100">
                  Editar Datos
                </Button>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title fw-bold mb-3">Historial de Pedidos</h5>
                
                {HISTORIAL_COMPRAS.length === 0 ? (
                  <p className="text-muted">Aún no has realizado compras.</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>N° Orden</th>
                          <th>Fecha</th>
                          <th>Productos</th>
                          <th>Total</th>
                          <th>Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {HISTORIAL_COMPRAS.map((compra) => (
                          <tr key={compra.id}>
                            <td className="fw-bold">{compra.id}</td>
                            <td>{compra.fecha}</td>
                            <td>
                              <ul className="mb-0 ps-3 small text-secondary">
                                {compra.productos.map((prod, idx) => (
                                  <li key={idx}>{prod}</li>
                                ))}
                              </ul>
                            </td>
                            <td className="fw-bold text-success">{compra.total}</td>
                            <td>
                              <span className="badge bg-success">{compra.estado}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicTemplate>
  )
}

export default Perfil