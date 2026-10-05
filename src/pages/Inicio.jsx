import { useNavigate } from 'react-router-dom'
import Button from '../components/atoms/Button'

function Inicio() {
  const navigate = useNavigate()

  return (
    <div className="container mt-5">
      
      <div className="text-center py-5">
        <h1 className="display-4">Sonido Vivo</h1>

        <h2 className="mt-3">
          Instrumentos y equipos de sonido profesional
        </h2>

        <p className="lead mt-3">
          Encuentra instrumentos y equipos para tus necesidades musicales.
        </p>

        <div className="mt-4">
          <Button
            texto="Explorar catálogo"
            onClick={() => navigate('/catalogo')}
          />
        </div>
      </div>

    </div>
  )
}

export default Inicio