
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import CatalogoTemplate from './CatalogoTemplate'

describe('CatalogoTemplate', () => {
  it('muestra el título y la descripción del catálogo', () => {
    render(<CatalogoTemplate productos={[]} />)

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

    render(<CatalogoTemplate productos={productos} />)

    expect(screen.getByText('Guitarra eléctrica')).toBeInTheDocument()
  })
})
