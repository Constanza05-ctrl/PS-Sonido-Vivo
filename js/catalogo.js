var catalogoContainer = document.getElementById('catalogo');
var inputBuscar = document.getElementById('input-Buscar');
var selectCategoria = document.getElementById('select-Categoria');
var selectOrden = document.getElementById('select-Orden');
var msjErrorBusqueda = document.getElementById('msj-error-busqueda');
var contadorResultados = document.getElementById('contador-resultados');
var btnLimpiar = document.getElementById('btn-limpiar');

var imagenesCategoria = {
  "Guitarras Acústicas": "assets/img/guitarra-acustica.jpg",
  "Guitarras Eléctricas": "assets/img/guitarra-electrica.jpg",
  "Bajos Eléctricos": "assets/img/bajo.jpg",
  "Baterías": "assets/img/bateria.jpg",
  "Teclados y Pianos": "assets/img/teclado.jpg",
  "Amplificadores": "assets/img/amplificador.jpg",
  "Micrófonos": "assets/img/microfono.jpg",
  "Pedales de Efectos": "assets/img/pedal.jpg",
  "Accesorios": "assets/img/accesorios.jpg",
  "Estudio y Grabación": "assets/img/estudio.jpg"
};

function formatearPrecio(precio) {
  return "$" + precio.toLocaleString('es-CL');
}

function renderizarProductos(lista) {
  if (!catalogoContainer) return;
  catalogoContainer.innerHTML = '';

  if (contadorResultados && typeof productos !== 'undefined') {
    contadorResultados.textContent = "Mostrando " + lista.length + " de " + productos.length + " productos";
  }

  if (lista.length === 0) {
    catalogoContainer.innerHTML = '<div class="mensaje-vacio"><h3>No se encontraron productos con esos criterios de búsqueda.</h3><p>Intenta cambiar los términos de búsqueda o limpiar los filtros.</p></div>';
    return;
  }

  for (var i = 0; i < lista.length; i++) {
    var prod = lista[i];
    var imagenUrl = imagenesCategoria[prod.categoria] || "assets/img/default.jpg";

    var tarjeta = document.createElement('article');
    tarjeta.className = 'tarjeta-producto';

    tarjeta.innerHTML = `
      <div class="tarjeta-body">
        <div class="imagen-contenedor">
          <img src="${imagenUrl}" alt="${prod.nombre}">
        </div>
        <span class="categoria-tag">${prod.categoria}</span>
        <h3 class="producto-titulo">${prod.nombre}</h3>
        <p class="producto-marca"><strong>Marca:</strong> ${prod.marca} (${prod.modelo}) | <small>Cód: ${prod.codigo}</small></p>
        <p class="producto-descripcion">${prod.descripcion}</p>
      </div>
      <div class="tarjeta-footer">
        <div class="precio-stock">
          <p class="precio">${formatearPrecio(prod.precio)}</p>
          <small class="stock">Stock: ${prod.stock} un.</small>
        </div>
        <button class="btn-agregar" onclick="agregarAlCarrito('${prod.codigo}')">Agregar al Carrito</button>
      </div>
    `;

    catalogoContainer.appendChild(tarjeta);
  }
}

function filtrarProductos() {
  var texto = inputBuscar ? inputBuscar.value.toLowerCase().trim() : '';
  var categoriaSeleccionada = selectCategoria ? selectCategoria.value : 'Todas';
  var ordenSeleccionado = selectOrden ? selectOrden.value : 'defecto';

  if (msjErrorBusqueda) {
    if (texto.length === 1) {
      msjErrorBusqueda.textContent = "Ingresa al menos 2 caracteres para realizar una búsqueda precisa.";
      msjErrorBusqueda.style.display = "block";
    } else {
      msjErrorBusqueda.textContent = "";
      msjErrorBusqueda.style.display = "none";
    }
  }

  if (typeof productos === 'undefined') return;

  var productosFiltrados = productos.filter(function(p) {
    var coincideTexto = p.nombre.toLowerCase().includes(texto) ||
                        p.marca.toLowerCase().includes(texto) ||
                        p.modelo.toLowerCase().includes(texto) ||
                        p.codigo.toLowerCase().includes(texto);

    var coincideCategoria = categoriaSeleccionada === 'Todas' || 
                            categoriaSeleccionada === '' || 
                            p.categoria === categoriaSeleccionada;

    return coincideTexto && coincideCategoria;
  });

  if (ordenSeleccionado === 'precio-asc') {
    productosFiltrados.sort(function(a, b) { return a.precio - b.precio; });
  } else if (ordenSeleccionado === 'precio-desc') {
    productosFiltrados.sort(function(a, b) { return b.precio - a.precio; });
  } else if (ordenSeleccionado === 'nombre-asc') {
    productosFiltrados.sort(function(a, b) {
      if (a.nombre > b.nombre) return 1;
      if (a.nombre < b.nombre) return -1;
      return 0;
    });
  }

  renderizarProductos(productosFiltrados);
}

function agregarAlCarrito(codigo) {
  if (typeof productos === 'undefined') return;

  var producto = null;
  for (var i = 0; i < productos.length; i++) {
    if (productos[i].codigo === codigo) {
      producto = productos[i];
      break;
    }
  }

  if (!producto) return;

  var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
  var existe = false;
  for (var j = 0; j < carrito.length; j++) {
    if (carrito[j].codigo === codigo) {
      carrito[j].cantidad = carrito[j].cantidad + 1;
      existe = true;
      break;
    }
  }

  if (!existe) {
    carrito.push({
      codigo: producto.codigo,
      nombre: producto.nombre,
      precio: producto.precio,
      categoria: producto.categoria,
      cantidad: 1
    });
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
  alert("¡" + producto.nombre + " agregado al carrito!");
}

document.addEventListener('DOMContentLoaded', function() {
  if (typeof productos !== 'undefined') {
    renderizarProductos(productos);
  }

  if (inputBuscar) inputBuscar.addEventListener('input', filtrarProductos);
  if (selectCategoria) selectCategoria.addEventListener('change', filtrarProductos);
  if (selectOrden) selectOrden.addEventListener('change', filtrarProductos);

  if (btnLimpiar) {
    btnLimpiar.addEventListener('click', function() {
      if (inputBuscar) inputBuscar.value = '';
      if (selectCategoria) selectCategoria.value = 'Todas';
      if (selectOrden) selectOrden.value = 'defecto';
      if (msjErrorBusqueda) msjErrorBusqueda.style.display = 'none';
      filtrarProductos();
    });
  }
});