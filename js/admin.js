function obtenerProductos() {
    var productosGuardados = localStorage.getItem('productos_db');
    if (productosGuardados) {
        return JSON.parse(productosGuardados);
    } else if (typeof productos !== 'undefined') {

        localStorage.setItem('productos_db', JSON.stringify(productos));
        return productos;
    }
    return [];
}
function guardarProductos(lista) {
    localStorage.setItem('productos_db', JSON.stringify(lista));
}

function renderizarTablaAdmin() {
    var tablaBody = document.getElementById('tabla-productos-body');
    if (!tablaBody) return;

    var lista = obtenerProductos();
    tablaBody.innerHTML = '';

    if (lista.length === 0) {
        tablaBody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No hay productos registrados.</td></tr>';
        return;
    }

    for (var i = 0; i < lista.length; i++) {
        var prod = lista[i];
        var fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${prod.codigo}</td>
            <td><strong>${prod.nombre}</strong><br><small style="color: #64748b;">${prod.marca || ''} ${prod.modelo || ''}</small></td>
            <td><span class="categoria-tag">${prod.categoria}</span></td>
            <td>${prod.stock} un.</td>
            <td><strong>$${Number(prod.precio).toLocaleString('es-CL')}</strong></td>
            <td>
                <button class="btn-accion-tabla btn-eliminar-item" onclick="eliminarProducto('${prod.codigo}')">Eliminar</button>
            </td>
        `;
        tablaBody.appendChild(fila);
    }
}

function eliminarProducto(codigo) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
        var lista = obtenerProductos();
        var listaFiltrada = lista.filter(function(p) { return p.codigo !== codigo; });
        guardarProductos(listaFiltrada);
        renderizarTablaAdmin();
        mostrarMensajeEstado('Producto eliminado correctamente.', true);
    }
}

function mostrarMensajeEstado(mensaje, esExito) {
    var mensajeAdmin = document.getElementById('mensaje-admin');
    if (!mensajeAdmin) return;
    mensajeAdmin.textContent = mensaje;
    mensajeAdmin.className = 'mensaje-estado ' + (esExito ? 'exito' : 'error');
    mensajeAdmin.style.display = 'block';

    setTimeout(function() {
        mensajeAdmin.style.display = 'none';
    }, 4000);
}

document.addEventListener('DOMContentLoaded', function() {
    renderizarTablaAdmin();

    var modal = document.getElementById('modal-agregar-producto');
    var btnNuevo = document.getElementById('btn-nuevo-producto');
    var btnCerrar = document.getElementById('btn-cerrar-modal');
    var formProducto = document.getElementById('form-producto');

    if (btnNuevo && modal) {
        btnNuevo.addEventListener('click', function() {
            modal.classList.add('modal-visible');
        });
    }

    if (btnCerrar && modal) {
        btnCerrar.addEventListener('click', function() {
            modal.classList.remove('modal-visible');
        });
    }

    if (formProducto) {
        formProducto.addEventListener('submit', function(e) {
            e.preventDefault();

            var esValido = true;
            var codigo = document.getElementById('input-codigo').value.trim();
            var nombre = document.getElementById('input-nombre').value.trim();
            var marca = document.getElementById('input-marca').value.trim();
            var modelo = document.getElementById('input-modelo').value.trim();
            var categoria = document.getElementById('select-categoria-admin').value;
            var precio = document.getElementById('input-precio').value;
            var stock = document.getElementById('input-stock').value;

            function validarCampo(idCampo, idError, condicionFallo, mensaje) {
                var input = document.getElementById(idCampo);
                var errorSpan = document.getElementById(idError);

                if (condicionFallo) {
                    if (errorSpan) {
                        errorSpan.textContent = mensaje;
                        errorSpan.style.display = 'block';
                    }
                    if (input) input.style.borderColor = 'var(--error)';
                    esValido = false;
                } else {
                    if (errorSpan) errorSpan.style.display = 'none';
                    if (input) input.style.borderColor = '#cbd5e1';
                }
            }
            validarCampo('input-codigo', 'error-codigo', codigo === '', 'Ingresa un código.');
            validarCampo('input-nombre', 'error-nombre', nombre === '', 'Ingresa un nombre.');
            validarCampo('input-marca', 'error-marca', marca === '', 'Ingresa la marca.');
            validarCampo('input-modelo', 'error-modelo', modelo === '', 'Ingresa el modelo.');
            validarCampo('select-categoria-admin', 'error-categoria', categoria === '', 'Selecciona una categoría.');
            validarCampo('input-precio', 'error-precio', precio === '' || parseFloat(precio) <= 0, 'Ingresa un precio válido.');
            validarCampo('input-stock', 'error-stock', stock === '' || parseInt(stock) < 0, 'Ingresa un stock válido.');

            if (esValido) {
                var lista = obtenerProductos();

                // Verificar si el código ya existe
                var existe = lista.some(function(p) { return p.codigo === codigo; });
                if (existe) {
                    validarCampo('input-codigo', 'error-codigo', true, 'Este código ya está registrado.');
                    return;
                }

                var nuevoProducto = {
                    codigo: codigo,
                    nombre: nombre,
                    marca: marca,
                    modelo: modelo,
                    categoria: categoria,
                    precio: parseFloat(precio),
                    stock: parseInt(stock),
                    descripcion: "Añadido desde Administración"
                };

                lista.push(nuevoProducto);
                guardarProductos(lista);

                renderizarTablaAdmin();

                formProducto.reset();
                if (modal) modal.classList.remove('modal-visible');

                mostrarMensajeEstado('¡Producto "' + nombre + '" guardado con éxito!', true);
            }
        });
    }
});