
import { describe, expect, it, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import FormField from './FormField'

describe('FormField', () => {
  it('muestra la etiqueta y el campo de entrada', () => {
    render(
      <FormField
        id="nombre"
        etiqueta="Nombre del producto"
        valor=""
        onChange={() => {}}
      />
    )

    expect(
      screen.getByLabelText('Nombre del producto')
    ).toBeInTheDocument()
  })

  it('ejecuta onChange al escribir', () => {
    const funcionCambio = vi.fn()

    render(
      <FormField
        id="nombre"
        etiqueta="Nombre del producto"
        valor=""
        onChange={funcionCambio}
      />
    )

    fireEvent.change(
      screen.getByLabelText('Nombre del producto'),
      { target: { value: 'Guitarra' } }
    )

    expect(funcionCambio).toHaveBeenCalled()
  })
})
