
import { describe, expect, it, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'

describe('Button', () => {
  it('muestra el texto recibido', () => {
    render(<Button texto="Guardar" />)

    expect(
      screen.getByRole('button', { name: 'Guardar' })
    ).toBeInTheDocument()
  })

  it('ejecuta la función al hacer clic', () => {
    const funcionClick = vi.fn()

    render(
      <Button texto="Guardar" onClick={funcionClick} />
    )

    fireEvent.click(
      screen.getByRole('button', { name: 'Guardar' })
    )

    expect(funcionClick).toHaveBeenCalledTimes(1)
  })
})
