import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, test, expect } from 'vitest'

import Nosotros from '../pages/Nosotros'
import Contacto from '../pages/Contacto'
import Blog from '../pages/Blog'
import Perfil from '../pages/Perfil'

describe('Pruebas de Páginas Públicas y Perfil - Sonido Vivo', () => {
  test('Renderiza la página Sobre Nosotros correctamente', () => {
    render(
      <BrowserRouter>
        <Nosotros />
      </BrowserRouter>
    )
    expect(screen.getByText(/Sobre Sonido Vivo/i)).toBeInTheDocument()
  })

  test('Renderiza el formulario de Contacto correctamente', () => {
    render(
      <BrowserRouter>
        <Contacto />
      </BrowserRouter>
    )
    expect(screen.getByRole('heading', { name: /Contacto/i })).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Ej: Juan Pérez/i)).toBeInTheDocument()
  })

  test('Renderiza el título del Blog y sus artículos', () => {
    render(
      <BrowserRouter>
        <Blog />
      </BrowserRouter>
    )
    expect(screen.getByText(/Blog de Sonido Vivo/i)).toBeInTheDocument()
    expect(screen.getByText(/5 Consejos para cuidar tu Bajo Eléctrico/i)).toBeInTheDocument()
  })

  test('Renderiza la página de Perfil de usuario con el historial', () => {
    render(
      <BrowserRouter>
        <Perfil />
      </BrowserRouter>
    )
    expect(screen.getByRole('heading', { name: /Mi Perfil/i })).toBeInTheDocument()
    expect(screen.getByText(/Historial de Pedidos/i)).toBeInTheDocument()
  })
})