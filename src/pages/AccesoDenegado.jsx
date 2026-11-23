import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PublicTemplate from '../components/templates/PublicTemplate'

function AccesoDenegado() {
  const { usuario } = useAuth()

  return (
    <PublicTemplate>
      <section className="container my-5 py-5 text-center">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="alert alert-warning shadow-sm p-4" role="alert">
              <h1 className="h3 fw-bold mb-3">Acceso Denegado (403)</h1>
              <p className="mb-2">
                Tu cuenta actual (<strong>{usuario?.email || 'Invitado'}</strong>) tiene el rol{' '}
                <span className="badge bg-secondary">{usuario?.rol || 'SIN ROL'}</span> y no
                cuenta con permisos para acceder a esta sección.
              </p>
              <p className="small text-muted mb-4">
                Esta ruta está restringida para un perfil distinto al de tu sesión activa.
              </p>
              <div className="d-flex justify-content-center gap-2">
                <Link to="/" className="btn btn-dark">
                  Volver al Inicio
                </Link>
                <Link to="/perfil" className="btn btn-outline-dark">
                  Ir a Mi Perfil
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicTemplate>
  )
}

export default AccesoDenegado