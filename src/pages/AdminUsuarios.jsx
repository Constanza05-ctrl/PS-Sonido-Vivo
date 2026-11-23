import { useEffect, useState } from 'react'
import PublicTemplate from '../components/templates/PublicTemplate'
import {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
} from '../services/usuarioService'
import { useAuth } from '../context/AuthContext'

const formularioInicial = {
  nombre: '',
  email: '',
  password: '',
  rol: 'CLIENTE',
  activo: true
}

function AdminUsuarios() {
  const { usuario: usuarioActual } = useAuth()
  const [usuarios, setUsuarios] = useState([])
  const [formulario, setFormulario] = useState(formularioInicial)
  const [usuarioEnEdicion, setUsuarioEnEdicion] = useState(null)
  const [notificacion, setNotificacion] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    if (!notificacion) return
    const temporizador = setTimeout(() => {
      setNotificacion(null)
    }, 4000)
    return () => clearTimeout(temporizador)
  }, [notificacion])

  function mostrarNotificacion(tipo, titulo, texto) {
    setNotificacion({ tipo, titulo, texto })
  }

  async function cargarUsuarios() {
    setCargando(true)
    try {
      const lista = await obtenerUsuarios()
      setUsuarios(Array.isArray(lista) ? lista : [])
    } catch (err) {
      mostrarNotificacion('danger', 'Error al cargar', err.message)
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarUsuarios()
  }, [])

  function manejarCambio(e) {
    const { name, value, type, checked } = e.target
    setFormulario(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  function limpiarFormulario() {
    setFormulario(formularioInicial)
    setUsuarioEnEdicion(null)
  }

  async function manejarEnvio(e) {
    e.preventDefault()

    try {
      if (usuarioEnEdicion) {
        const payloadEdicion = {
          nombre: formulario.nombre.trim(),
          email: formulario.email.trim(),
          rol: formulario.rol,
          activo: formulario.activo
        }
        await actualizarUsuario(usuarioEnEdicion.id, payloadEdicion)
        mostrarNotificacion(
          'success',
          'Usuario actualizado',
          `Los datos de ${payloadEdicion.nombre} se guardaron correctamente.`
        )
      } else {
        const payloadCreacion = {
          nombre: formulario.nombre.trim(),
          email: formulario.email.trim(),
          password: formulario.password,
          rol: formulario.rol
        }
        await crearUsuario(payloadCreacion)
        mostrarNotificacion(
          'success',
          'Usuario creado con éxito',
          `Se registró a ${payloadCreacion.nombre} con rol ${payloadCreacion.rol}.`
        )
      }

      limpiarFormulario()
      await cargarUsuarios()
    } catch (err) {
      mostrarNotificacion('danger', 'No se pudo completar la acción', err.message)
    }
  }

  function prepararEdicion(usuario) {
    setUsuarioEnEdicion(usuario)
    setFormulario({
      nombre: usuario.nombre || '',
      email: usuario.email || '',
      password: '',
      rol: usuario.rol || 'CLIENTE',
      activo: usuario.activo !== false
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function manejarEliminacion(usuario) {
    if (usuario.email === usuarioActual?.email) {
      mostrarNotificacion(
        'danger',
        'Acción no permitida',
        'No puedes eliminar tu propio usuario administrador en sesión.'
      )
      return
    }

    const confirmar = window.confirm(
      `¿Seguro que deseas eliminar/desactivar al usuario "${usuario.nombre}" (${usuario.email})?`
    )
    if (!confirmar) return

    try {
      await eliminarUsuario(usuario.id)
      if (usuarioEnEdicion?.id === usuario.id) {
        limpiarFormulario()
      }
      mostrarNotificacion(
        'success',
        'Usuario eliminado',
        `El usuario ${usuario.nombre} fue removido del listado.`
      )
      await cargarUsuarios()
    } catch (err) {
      mostrarNotificacion('danger', 'Error al eliminar', err.message)
    }
  }

  return (
    <PublicTemplate>
      {notificacion && (
        <div
          className="position-fixed bottom-0 end-0 p-3"
          style={{ zIndex: 1080, maxWidth: '380px', width: '100%' }}
          role="status"
          aria-live="polite"
        >
          <div
            className={`toast show border-0 shadow-lg text-white ${
              notificacion.tipo === 'danger' ? 'bg-danger' : 'bg-success'
            }`}
          >
            <div className="toast-header border-0">
              <strong className="me-auto">{notificacion.titulo}</strong>
              <button
                type="button"
                className="btn-close"
                aria-label="Cerrar notificación"
                onClick={() => setNotificacion(null)}
              />
            </div>
            <div className="toast-body">{notificacion.texto}</div>
          </div>
        </div>
      )}

      <main className="container py-5">
        <h1 className="mb-4">Gestión de Usuarios</h1>

        <section className="card shadow-sm mb-5">
          <div className="card-body">
            <h2 className="h4 mb-4">
              {usuarioEnEdicion ? `Editar usuario #${usuarioEnEdicion.id}` : 'Registrar nuevo usuario'}
            </h2>

            <form onSubmit={manejarEnvio}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="nombre" className="form-label">
                    Nombre completo
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    className="form-control"
                    placeholder="Ej: Camila Soto"
                    value={formulario.nombre}
                    onChange={manejarCambio}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">
                    Correo electrónico
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="camila@sonidovivo.cl"
                    value={formulario.email}
                    onChange={manejarCambio}
                    required
                  />
                </div>

                {!usuarioEnEdicion && (
                  <div className="col-md-6">
                    <label htmlFor="password" className="form-label">
                      Contraseña inicial
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="form-control"
                      placeholder="Mínimo 6 caracteres"
                      minLength={6}
                      value={formulario.password}
                      onChange={manejarCambio}
                      required
                    />
                  </div>
                )}

                <div className="col-md-6">
                  <label htmlFor="rol" className="form-label">
                    Rol del sistema
                  </label>
                  <select
                    id="rol"
                    name="rol"
                    className="form-select"
                    value={formulario.rol}
                    onChange={manejarCambio}
                    required
                  >
                    <option value="CLIENTE">CLIENTE</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>

                {usuarioEnEdicion && (
                  <div className="col-12">
                    <div className="form-check form-switch">
                      <input
                        id="activo"
                        name="activo"
                        type="checkbox"
                        className="form-check-input"
                        checked={formulario.activo}
                        onChange={manejarCambio}
                      />
                      <label htmlFor="activo" className="form-check-label">
                        Usuario activo (puede iniciar sesión)
                      </label>
                    </div>
                  </div>
                )}
              </div>

              <div className="d-flex flex-wrap gap-2 mt-4">
                <button type="submit" className="btn btn-primary">
                  {usuarioEnEdicion ? 'Guardar cambios' : 'Crear usuario'}
                </button>

                {usuarioEnEdicion && (
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
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h4 mb-0">Usuarios registrados ({usuarios.length})</h2>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={cargarUsuarios}
            >
              Refrescar lista
            </button>
          </div>

          {cargando ? (
            <p className="text-muted">Cargando usuarios desde la API...</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map(u => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>
                        <strong>{u.nombre}</strong>
                      </td>
                      <td>{u.email}</td>
                      <td>
                        <span
                          className={`badge ${
                            u.rol === 'ADMIN' ? 'bg-primary' : 'bg-secondary'
                          }`}
                        >
                          {u.rol}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            u.activo !== false ? 'bg-success' : 'bg-danger'
                          }`}
                        >
                          {u.activo !== false ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex flex-wrap gap-2">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => prepararEdicion(u)}
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => manejarEliminacion(u)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {usuarios.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        No hay usuarios registrados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </PublicTemplate>
  )
}

export default AdminUsuarios