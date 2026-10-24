import PublicTemplate from '../components/templates/PublicTemplate'

function Nosotros() {
  return (
    <PublicTemplate>
      <section className="container my-5 py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 text-center">
            <h1 className="display-5 fw-bold mb-4">Sobre Sonido Vivo</h1>
            <p className="lead text-secondary">
              Somos una tienda especializada en instrumentos musicales y equipos de audio profesional. 
              Nos apasiona brindar a cada músico la mejor herramienta para expresar su creatividad.
            </p>
            <hr className="my-5" />
            <div className="row text-start mt-4">
              <div className="col-md-6 mb-3">
                <h4>Nuestra Misión</h4>
                <p className="text-muted">
                  Ofrecer productos de alta calidad respaldados por un servicio al cliente excepcional y asesoría técnica personalizada.
                </p>
              </div>
              <div className="col-md-6 mb-3">
                <h4>Nuestra Visión</h4>
                <p className="text-muted">
                  Ser la tienda de música de referencia para estudiantes, aficionados y profesionales en todo el país.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicTemplate>
  )
}

export default Nosotros