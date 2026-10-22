import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProductoCard from './ProductoCard'
import { CarritoProvider } from '../../context/CarritoContext'

describe('ProductoCard', () => {
  const producto = {
    id: 1,
    nombre: 'Guitarra eléctrica',
    descripcion: 'Guitarra eléctrica para músicos.',
    precio: 249990,
    categoria: 'Instrumentos',
    stock: 10
  }

  function renderProductoCard() {
    return render(
      <CarritoProvider>
        <ProductoCard producto={producto} />
      </CarritoProvider>
    )
  }

  it('muestra la información del producto', () => {
    renderProductoCard()

    expect(screen.getByText('Guitarra eléctrica')).toBeInTheDocument()
    expect(
      screen.getByText('Guitarra eléctrica para músicos.')
    ).toBeInTheDocument()
    expect(screen.getByText('Instrumentos')).toBeInTheDocument()

    expect(
      screen.getByText((contenido, elemento) =>
        elemento.tagName === 'P' &&
        elemento.textContent.replace(/\s+/g, ' ').trim() ===
          'Stock disponible: 10'
      )
    ).toBeInTheDocument()
  })

  it('muestra el precio del producto', () => {
    renderProductoCard()

    expect(screen.getByText('$249.990')).toBeInTheDocument()
  })
})
