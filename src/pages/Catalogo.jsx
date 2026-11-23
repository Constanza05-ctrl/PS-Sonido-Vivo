import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useProductos } from '../context/ProductoContext'
import { useAuth } from '../context/AuthContext'
import CatalogoTemplate from '../components/templates/CatalogoTemplate'
import PublicTemplate from '../components/templates/PublicTemplate'

function Catalogo() {
  const { productos = [], cargando = false } = useProductos()
  const { esAdmin } = useAuth()
  const [busqueda, setBusqueda] = useState('')
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('')

  if (esAdmin) {
    return <Navigate to="/admin/productos" replace />
  }

  const listaProductos = Array.isArray(productos) ? productos : []

  const categorias = [
    ...new Set(listaProductos.map(producto => producto.categoria))
  ].sort((a, b) => a.localeCompare(b, 'es'))

  const productosFiltrados = listaProductos.filter(producto => {
    const coincideNombre = producto.nombre
      .toLowerCase()
      .includes(busqueda.trim().toLowerCase())

    const coincideCategoria =
      categoriaSeleccionada === '' ||
      producto.categoria === categoriaSeleccionada

    return coincideNombre && coincideCategoria
  })

  return (
    <PublicTemplate>
      {cargando ? (
        <div className="container py-5 text-center">
          <p className="text-muted">Cargando instrumentos...</p>
        </div>
      ) : (
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
      )}
    </PublicTemplate>
  )
}

export default Catalogo