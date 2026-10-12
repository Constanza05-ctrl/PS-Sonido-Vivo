
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProductoCard from './ProductoCard'

describe('ProductoCard', () => {
  const producto = {
    id: 1,
    nombre: 'Guitarra eléctrica',
    descripcion: 'Guitarra eléctrica para músicos.',
    precio: 249990,
    categoria: 'Instrumentos',
    stock: 10
  }

  it('muestra la información del producto', () => {
    render(<ProductoCard producto={producto} />)

    expect(screen.getByText('Guitarra eléctrica')).toBeInTheDocument()
    expect(screen.getByText('Guitarra eléctrica para músicos.')).toBeInTheDocument()
    expect(screen.getByText('Instrumentos')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  it('muestra el precio del producto', () => {
    render(<ProductoCard producto={producto} />)

    expect(screen.getByText('$249.990')).toBeInTheDocument()
  })
})
