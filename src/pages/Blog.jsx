import { useState } from 'react'
import PublicTemplate from '../components/templates/PublicTemplate'
import Button from '../components/atoms/Button'

const ARTICULOS = [
  {
    id: 1,
    titulo: '5 Consejos para cuidar tu Bajo Eléctrico o Guitarra',
    fecha: '20 de Octubre, 2026',
    resumen: 'Mantener la madera limpia y ajustar las cuerdas adecuadamente prolonga la vida útil de tu instrumento.',
    contenido: 'El cuidado continuo de tu instrumento es esencial. Recuerda calibrar la acción de las cuerdas al menos una vez al año, limpiar el diapasón con aceites especiales y guardar siempre el instrumento en su funda o case rígido para evitar cambios drásticos de temperatura y humedad.'
  },
  {
    id: 2,
    titulo: 'Cómo elegir el Amplificador adecuado para tus Ensayos',
    fecha: '15 de Octubre, 2026',
    resumen: 'Aprende las diferencias entre amplificadores a transistores, valvulares y de modelado digital.',
    contenido: 'Para ensayar en casa o en salas pequeñas, un amplificador de 15W a 30W a transistores o digital suele ser suficiente. Si buscas calidez y respuesta dinámica clásica para presentaciones en vivo, los amplificadores valvulares de mayor potencia son la mejor opción.'
  }
]

function Blog() {
  const [postSeleccionado, setPostSeleccionado] = useState(null)

  return (
    <PublicTemplate>
      <section className="container my-5 py-4">
        <h1 className="text-center fw-bold mb-4">Blog de Sonido Vivo</h1>

        {postSeleccionado ? (
          /* Vista de Detalle de la Publicación */
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 border p-4 rounded-3 shadow-sm bg-white">
              <Button 
                className="btn btn-outline-secondary btn-sm mb-3" 
                onClick={() => setPostSeleccionado(null)}
              >
                &larr; Volver al blog
              </Button>
              <h2 className="fw-bold">{postSeleccionado.titulo}</h2>
              <p className="text-muted small">{postSeleccionado.fecha}</p>
              <hr />
              <p className="lead mt-3" style={{ lineHeight: '1.8' }}>
                {postSeleccionado.contenido}
              </p>
            </div>
          </div>
        ) : (
          /* Vista de Lista de Publicaciones */
          <div className="row justify-content-center g-4">
            {ARTICULOS.map((post) => (
              <div key={post.id} className="col-12 col-md-6">
                <div className="card h-100 shadow-sm border-0 bg-light">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold">{post.titulo}</h5>
                    <p className="text-muted small">{post.fecha}</p>
                    <p className="card-text text-secondary flex-grow-1">{post.resumen}</p>
                    <Button 
                      className="btn btn-primary align-self-start mt-3"
                      onClick={() => setPostSeleccionado(post)}
                    >
                      Leer artículo completo
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </PublicTemplate>
  )
}

export default Blog