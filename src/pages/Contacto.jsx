import React from 'react'

export default function Contacto() {
  return (
    <div className="container my-5 py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <h1 className="text-center fw-bold mb-4">Contacto</h1>
          <p className="text-center text-muted mb-4">
            ¿Tienes dudas sobre un instrumento o quieres realizar un pedido? Escríbenos.
          </p>
          <form className="border p-4 rounded-3 shadow-sm bg-light">
            <div className="mb-3 text-start">
              <label htmlFor="nombre" className="form-label font-weight-bold">
                Nombre completo
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                placeholder="Ej: Juan Pérez"
                required
              />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="email" className="form-label font-weight-bold">
                Correo electrónico
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="ejemplo@correo.com"
                required
              />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="mensaje" className="form-label font-weight-bold">
                Mensaje
              </label>
              <textarea
                className="form-control"
                id="mensaje"
                rows="4"
                placeholder="Escribe tu mensaje aquí..."
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-2">
              Enviar consulta
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}