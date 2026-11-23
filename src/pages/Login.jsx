import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PublicTemplate from '../components/templates/PublicTemplate'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const { iniciarSesion } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const rutaPrevia = location.state?.from?.pathname

  async function manejarSubmit(e) {
    e.preventDefault()
    setError('')
    setCargando(true)

    try {
      const usuario = await iniciarSesion(email.trim(), password)

      const esRutaAdmin = rutaPrevia?.startsWith('/admin')
      const esRutaCompra = rutaPrevia === '/carrito' || rutaPrevia === '/checkout'
      const rutaValidaParaRol =
        rutaPrevia &&
        !(usuario.rol !== 'ADMIN' && esRutaAdmin) &&
        !(usuario.rol === 'ADMIN' && esRutaCompra)

      if (rutaValidaParaRol) {
        navigate(rutaPrevia, { replace: true })
      } else if (usuario.rol === 'ADMIN') {
        navigate('/admin/usuarios', { replace: true })
      } else {
        navigate('/catalogo', { replace: true })
      }
    } catch (err) {
      setError(err.message || 'No se pudo iniciar sesión.')
    } finally {
      setCargando(false)
    }
  }

  function autocompletar(correoPrueba, clavePrueba) {
    setEmail(correoPrueba)
    setPassword(clavePrueba)
    setError('')
  }

  return (
    <PublicTemplate>
      <section className="container my-5 py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-5">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <h1 className="h3 fw-bold text-center mb-2">Iniciar Sesión</h1>
                <p className="text-muted text-center small mb-4">
                  Ingresa tu correo y contraseña para continuar
                </p>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={manejarSubmit}>
                  <div className="mb-3">
                    <label htmlFor="login-email" className="form-label">
                      Correo electrónico
                    </label>
                    <input
                      id="login-email"
                      type="email"
                      className="form-control"
                      placeholder="usuario@sonidovivo.cl"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="login-password" className="form-label">
                      Contraseña
                    </label>
                    <input
                      id="login-password"
                      type="password"
                      className="form-control"
                      placeholder="••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-dark w-100"
                    disabled={cargando}
                  >
                    {cargando ? 'Validando credenciales...' : 'Ingresar'}
                  </button>
                </form>

                <hr className="my-4" />

                <div className="text-center">
                  <small className="text-muted d-block mb-2">
                    Cuentas de prueba rápidas:
                  </small>
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => autocompletar('admin@sonidovivo.cl', 'Admin123!')}
                    >
                      Rol ADMIN
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => autocompletar('cliente@sonidovivo.cl', 'Cliente123!')}
                    >
                      Rol CLIENTE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicTemplate>
  )
}

export default Login