
import { beforeEach, describe, expect, it } from 'vitest'
import {
  obtenerProductos,
  obtenerProductoPorId,
  agregarProducto,
  actualizarProducto,
  eliminarProducto
} from './productoService'

describe('Servicio de productos', () => {
  beforeEach(() => {
    const productos = obtenerProductos()

    productos.forEach(producto => {
      eliminarProducto(producto.id)
    })
  })

  it('obtiene la lista de productos', () => {
    expect(obtenerProductos()).toEqual([])
  })

  it('agrega un producto', () => {
    agregarProducto({
      nombre: 'Guitarra',
      precio: 100000
    })

    expect(obtenerProductos()).toHaveLength(1)
  })

  it('busca un producto por ID', () => {
    const producto = agregarProducto({
      nombre: 'Micrófono',
      precio: 30000
    })

    expect(obtenerProductoPorId(producto.id).nombre).toBe('Micrófono')
  })

  it('actualiza un producto', () => {
    const producto = agregarProducto({
      nombre: 'Parlante',
      precio: 50000
    })

    actualizarProducto(producto.id, { precio: 60000 })

    expect(obtenerProductoPorId(producto.id).precio).toBe(60000)
  })
 
  it('devuelve null al actualizar un producto inexistente', () => {
  expect(actualizarProducto(999, { precio: 50000 })).toBe(null)
  })

 it('devuelve false al eliminar un producto inexistente', () => {
  expect(eliminarProducto(999)).toBe(false)
 })
  it('elimina un producto', () => {
    const producto = agregarProducto({
      nombre: 'Teclado',
      precio: 80000
    })

    expect(eliminarProducto(producto.id)).toBe(true)
    expect(obtenerProductos()).toHaveLength(0)
  })
})
