
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import ListaProductos from './ListaProductos'
import { CarritoProvider } from '../../context/CarritoContext'

describe('ListaProductos', () => {
  it('muestra los productos recibidos', () => {
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

    render(
      <CarritoProvider>
        <ListaProductos productos={productos} />
      </CarritoProvider>
    )

    expect(screen.getByText('Guitarra eléctrica')).toBeInTheDocument()
  })

  it('muestra un mensaje cuando no hay productos', () => {
    render(
      <CarritoProvider>
        <ListaProductos productos={[]} />
      </CarritoProvider>
    )

    expect(
      screen.getByText('No hay productos disponibles.')
    ).toBeInTheDocument()
  })
})
