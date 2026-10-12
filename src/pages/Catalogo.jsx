
import { useProductos } from '../context/ProductoContext'
import CatalogoTemplate from '../components/templates/CatalogoTemplate'

function Catalogo() {
  const { productos } = useProductos()

  return (
    <CatalogoTemplate productos={productos} />
  )
}

export default Catalogo
