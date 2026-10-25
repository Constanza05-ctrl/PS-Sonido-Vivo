

import { beforeEach, describe, expect, it } from 'vitest'
import {
  obtenerProductos,
  obtenerProductoPorId,
  agregarProducto,
  actualizarProducto,
  eliminarProducto
} from './productoService'

const STORAGE_KEY = 'sonido-vivo-productos'

describe('Servicio de productos', () => {
  beforeEach(() => {
    localStorage.clear()
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
  })

  it('obtiene la lista de productos', () => {
    expect(obtenerProductos()).toEqual([])
  })

  it('carga los productos iniciales cuando no hay datos guardados', () => {
    localStorage.clear()

    expect(obtenerProductos().length).toBeGreaterThan(0)
  })

  it('agrega un producto y lo guarda en localStorage', () => {
    const producto = agregarProducto({
      nombre: 'Guitarra',
      precio: 100000
    })

    expect(obtenerProductos()).toHaveLength(1)
    expect(obtenerProductoPorId(producto.id).nombre).toBe('Guitarra')

    const guardados = JSON.parse(localStorage.getItem(STORAGE_KEY))
    expect(guardados).toHaveLength(1)
    expect(guardados[0].nombre).toBe('Guitarra')
  })

  it('busca un producto por ID', () => {
    const producto = agregarProducto({
      nombre: 'Micrófono',
      precio: 30000
    })

    expect(obtenerProductoPorId(producto.id).nombre).toBe('Micrófono')
  })

  it('actualiza un producto y persiste el cambio', () => {
    const producto = agregarProducto({
      nombre: 'Parlante',
      precio: 50000
    })

    actualizarProducto(producto.id, { precio: 60000 })

    expect(obtenerProductoPorId(producto.id).precio).toBe(60000)

    const guardados = JSON.parse(localStorage.getItem(STORAGE_KEY))
    expect(guardados[0].precio).toBe(60000)
  })

  it('devuelve null al actualizar un producto inexistente', () => {
    expect(actualizarProducto(999, { precio: 50000 })).toBe(null)
  })

  it('devuelve false al eliminar un producto inexistente', () => {
    expect(eliminarProducto(999)).toBe(false)
  })

  it('elimina un producto y persiste la eliminación', () => {
    const producto = agregarProducto({
      nombre: 'Teclado',
      precio: 80000
    })

    expect(eliminarProducto(producto.id)).toBe(true)
    expect(obtenerProductos()).toHaveLength(0)

    const guardados = JSON.parse(localStorage.getItem(STORAGE_KEY))
    expect(guardados).toEqual([])
  })
})
