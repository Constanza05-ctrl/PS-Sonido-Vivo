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

var porcentajeDescuento = 0;

function formatearPrecio(precio) {
  return "CLP $" + precio.toLocaleString('es-CL');
}

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem('carrito')) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}
function mostrarNotificacion(elementId, mensaje, esExito) {
  var elem = document.getElementById(elementId);
  if (!elem) return;

  elem.textContent = mensaje;
  elem.className = esExito ? 'mensaje-estado exito' : 'mensaje-estado error';
}

function ocultarNotificacion(elementId) {
  var elem = document.getElementById(elementId);
  if (!elem) return;
  elem.style.display = 'none';
}

function renderizarCarrito() {
  var contenedor = document.getElementById('contenedor-items-carrito');
  var subtotalElem = document.getElementById('resumen-subtotal');
  var envioElem = document.getElementById('resumen-envio');
  var totalElem = document.getElementById('resumen-total');

  if (!contenedor) return;

  var carrito = obtenerCarrito();

  if (carrito.length === 0) {
    contenedor.innerHTML = `
      <div class="mensaje-vacio">
        <h3>Tu carrito está vacío</h3>
        <p>Aún no has añadido productos a tu compra.</p>
        <a href="index.html" class="btn-agregar" style="display:inline-block; text-align:center; text-decoration:none; margin-top:1rem; width:auto; padding:0.6rem 1.5rem;">Volver al Catálogo</a>
      </div>
    `;
    if (subtotalElem) subtotalElem.textContent = "CLP $0";
    if (envioElem) envioElem.textContent = "CLP $0";
    if (totalElem) totalElem.textContent = "CLP $0";
    return;
  }

  contenedor.innerHTML = '';
  var subtotal = 0;

  for (var i = 0; i < carrito.length; i++) {
    var item = carrito[i];
    var subtotalItem = item.precio * item.cantidad;
    subtotal += subtotalItem;

    var imagenUrl = imagenesCategoria[item.categoria] || "assets/img/default.jpg";

    var tarjeta = document.createElement('article');
    tarjeta.className = 'tarjeta-item-carrito';

    tarjeta.innerHTML = `
      <div class="imagen-contenedor" style="width: 80px; height: 80px;">
        <img src="${imagenUrl}" alt="${item.nombre}">
      </div>
      <div class="item-info">
        <h4>${item.nombre}</h4>
        <p class="precio">${formatearPrecio(item.precio)} c/u</p>
        <small>Cód: ${item.codigo}</small>
      </div>
      <div class="item-controles">
        <button class="btn-cantidad" type="button" onclick="cambiarCantidad('${item.codigo}', -1)">-</button>
        <strong>${item.cantidad}</strong>
        <button class="btn-cantidad" type="button" onclick="cambiarCantidad('${item.codigo}', 1)">+</button>
      </div>
      <div style="text-align: right;">
        <p class="precio">${formatearPrecio(subtotalItem)}</p>
        <button class="btn-eliminar-item" type="button" onclick="eliminarProducto('${item.codigo}')">Eliminar</button>
      </div>
    `;

    contenedor.appendChild(tarjeta);
  }

  var montoDescuento = subtotal * porcentajeDescuento;
  var subtotalConDescuento = subtotal - montoDescuento;
  var costoEnvio = (subtotalConDescuento > 100000 || subtotalConDescuento === 0) ? 0 : 3990;
  var totalFinal = subtotalConDescuento + costoEnvio;

  if (subtotalElem) subtotalElem.textContent = formatearPrecio(subtotalConDescuento);
  if (envioElem) envioElem.textContent = costoEnvio === 0 ? "Gratis" : formatearPrecio(costoEnvio);
  if (totalElem) totalElem.textContent = formatearPrecio(totalFinal);
}

function cambiarCantidad(codigo, cambio) {
  var carrito = obtenerCarrito();

  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].codigo === codigo) {
      carrito[i].cantidad += cambio;

      if (carrito[i].cantidad <= 0) {
        carrito.splice(i, 1);
      }
      break;
    }
  }

  guardarCarrito(carrito);
  renderizarCarrito();
}

function eliminarProducto(codigo) {
  var carrito = obtenerCarrito();
  var nuevoCarrito = [];

  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].codigo !== codigo) {
      nuevoCarrito.push(carrito[i]);
    }
  }

  guardarCarrito(nuevoCarrito);
  renderizarCarrito();
}

function vaciarCarrito() {
  var carrito = obtenerCarrito();
  if (carrito.length === 0) return;

  localStorage.removeItem('carrito');
  porcentajeDescuento = 0;
  ocultarNotificacion('mensaje-cupon');
  mostrarNotificacion('mensaje-compra', 'Se ha vaciado el carrito correctamente.', false);
  renderizarCarrito();
}

function aplicarCupon() {
  var inputCupon = document.getElementById('input-cupon');
  if (!inputCupon) return;

  var codigo = inputCupon.value.trim().toUpperCase();

  if (codigo === "DUOCUC10") {
    porcentajeDescuento = 0.10;
    mostrarNotificacion('mensaje-cupon', '¡Código DUOCUC10 aplicado! Tienes un 10% de descuento.', true);
  } else if (codigo === "SONIDO20") {
    porcentajeDescuento = 0.20;
    mostrarNotificacion('mensaje-cupon', '¡Código SONIDO20 aplicado! Tienes un 20% de descuento.', true);
  } else if (codigo === "") {
    porcentajeDescuento = 0;
    mostrarNotificacion('mensaje-cupon', 'Por favor, ingresa un código promocional.', false);
  } else {
    porcentajeDescuento = 0;
    mostrarNotificacion('mensaje-cupon', 'El código ingresado no es válido o está vencido.', false);
  }

  renderizarCarrito();
}

document.addEventListener('DOMContentLoaded', function() {
  renderizarCarrito();

  var btnVaciar = document.getElementById('btn-vaciar');
  var btnComprar = document.getElementById('btn-comprar');
  var btnCupon = document.getElementById('btn-cupon');

  if (btnVaciar) btnVaciar.addEventListener('click', vaciarCarrito);
  if (btnCupon) btnCupon.addEventListener('click', aplicarCupon);

  if (btnComprar) {
    btnComprar.addEventListener('click', function() {
      var carrito = obtenerCarrito();
      if (carrito.length === 0) {
        mostrarNotificacion('mensaje-compra', 'El carrito está vacío. Agrega productos para procesar el pago.', false);
        return;
      }
      
      localStorage.removeItem('carrito');
      porcentajeDescuento = 0;
      ocultarNotificacion('mensaje-cupon');
      mostrarNotificacion('mensaje-compra', '¡Compra procesada exitosamente! Gracias por tu pedido en Sonido Vivo.', true);
      renderizarCarrito();
    });
  }
});