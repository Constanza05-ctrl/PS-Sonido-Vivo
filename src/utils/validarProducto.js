
import categorias from '../data/categorias'

export function validarProducto(producto) {
  const errores = {}

  const nombre = String(producto.nombre ?? '').trim()
  const categoria = String(producto.categoria ?? '').trim()
  const marca = String(producto.marca ?? '').trim()
  const modelo = String(producto.modelo ?? '').trim()
  const descripcion = String(producto.descripcion ?? '').trim()
  const stock = producto.stock
  const precio = producto.precio

  if (nombre.length < 2 || nombre.length > 100) {
    errores.nombre = 'El nombre debe tener entre 2 y 100 caracteres.'
  } else if (!/[a-záéíóúüñ]/i.test(nombre)) {
    errores.nombre = 'El nombre debe contener al menos una letra.'
  }

  if (!categorias.includes(categoria)) {
    errores.categoria = 'Selecciona una categoría válida.'
  }

  if (marca.length < 2 || marca.length > 60) {
    errores.marca = 'La marca debe tener entre 2 y 60 caracteres.'
  } else if (!/[a-záéíóúüñ]/i.test(marca)) {
    errores.marca = 'La marca debe contener al menos una letra.'
  }

  if (modelo.length < 1 || modelo.length > 60) {
    errores.modelo = 'El modelo debe tener entre 1 y 60 caracteres.'
  }

  if (descripcion.length < 10 || descripcion.length > 500) {
    errores.descripcion = 'La descripción debe tener entre 10 y 500 caracteres.'
  }

  if (stock === '' || stock === null || stock === undefined ||
      !Number.isInteger(Number(stock)) || Number(stock) < 0) {
    errores.stock = 'El stock debe ser un número entero igual o mayor que 0.'
  }

  if (precio === '' || precio === null || precio === undefined ||
      !Number.isFinite(Number(precio)) || Number(precio) <= 0) {
    errores.precio = 'El precio debe ser mayor que 0.'
  }

  return {
    valido: Object.keys(errores).length === 0,
    errores
  }
}
