import { useNavigate } from 'react-router-dom'
import Button from '../components/atoms/Button'
import PublicTemplate from '../components/templates/PublicTemplate'

function Inicio() {
  const navigate = useNavigate()

  return (
    <PublicTemplate>
      <section className="container text-center my-5 py-5">
        <h1 className="display-4">Sonido Vivo</h1>

        <h2 className="mt-3">
          Instrumentos y equipos de sonido profesional
        </h2>

        <p className="lead mt-3">
          Encuentra instrumentos y equipos para tus necesidades musicales.
        </p>

        <Button
          className="btn btn-primary mt-4"
          onClick={() => navigate('/catalogo')}
        >
          Explorar catálogo
        </Button>
      </section>
    </PublicTemplate>
  )
}

export default Inicio
