
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import CatalogoTemplate from './CatalogoTemplate'

describe('CatalogoTemplate', () => {
  const props = {
    productos: [],
    busqueda: '',
    onBusquedaChange: () => {},
    categorias: ['Guitarras Acústicas', 'Bajos Eléctricos'],
    categoriaSeleccionada: '',
    onCategoriaChange: () => {}
  }

  it('muestra el título y la descripción del catálogo', () => {
    render(<CatalogoTemplate {...props} />)

    expect(
      screen.getByRole('heading', { name: 'Catálogo de productos' })
    ).toBeInTheDocument()

    expect(
      screen.getByText('Explora nuestros instrumentos y equipos de sonido.')
    ).toBeInTheDocument()
  })

  it('muestra la lista de productos recibida', () => {
    const productos = [
      {
        id: 1,
        nombre: 'Guitarra eléctrica',
        descripcion: 'Guitarra eléctrica para músicos.',
        precio: 249990,
        categoria: 'Instrumentos',
        stock: 10
      }
    ]

    render(<CatalogoTemplate {...props} productos={productos} />)

    expect(screen.getByText('Guitarra eléctrica')).toBeInTheDocument()
  })

  it('muestra los controles de búsqueda y categoría', () => {
    render(<CatalogoTemplate {...props} />)

    expect(
      screen.getByRole('textbox', { name: 'Buscar producto' })
    ).toBeInTheDocument()

    expect(
      screen.getByLabelText('Filtrar por categoría')
    ).toBeInTheDocument()

    expect(
      screen.getByRole('option', { name: 'Todas las categorías' })
    ).toBeInTheDocument()
  })
})

