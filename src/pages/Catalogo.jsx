
import { useState } from 'react'
import { useProductos } from '../context/ProductoContext'
import CatalogoTemplate from '../components/templates/CatalogoTemplate'

function Catalogo() {
  const { productos } = useProductos()
  const [busqueda, setBusqueda] = useState('')
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('')

  const categorias = [
    ...new Set(productos.map(producto => producto.categoria))
  ].sort((a, b) => a.localeCompare(b, 'es'))

  const productosFiltrados = productos.filter(producto => {
    const coincideNombre = producto.nombre
      .toLowerCase()
      .includes(busqueda.trim().toLowerCase())

    const coincideCategoria =
      categoriaSeleccionada === '' ||
      producto.categoria === categoriaSeleccionada

    return coincideNombre && coincideCategoria
  })

  return (
    <CatalogoTemplate
      productos={productosFiltrados}
      busqueda={busqueda}
      onBusquedaChange={evento => setBusqueda(evento.target.value)}
      categorias={categorias}
      categoriaSeleccionada={categoriaSeleccionada}
      onCategoriaChange={evento =>
        setCategoriaSeleccionada(evento.target.value)
      }
    />
  )
}

export default Catalogo

