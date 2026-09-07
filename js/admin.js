var tablaBody = document.getElementById('tabla-productos-body');

function renderizarTablaAdmin(lista) {
    if (!tablaBody) return;
    tablaBody.innerHTML = ''; 

    for (var i = 0; i < lista.length; i++) {
        var prod = lista[i];
        var fila = document.createElement('tr');
        
        fila.innerHTML = `
            <td>${prod.codigo}</td>
            <td><strong>${prod.nombre}</strong><br><small>${prod.marca} ${prod.modelo}</small></td>
            <td>${prod.categoria}</td>
            <td>${prod.stock} un.</td>
            <td>$${prod.precio.toLocaleString('es-CL')}</td>
            <td>
                <button class="btn-editar">Editar</button>
                <button class="btn-eliminar">Eliminar</button>
            </td>
        `;
        tablaBody.appendChild(fila);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    if (typeof productos !== 'undefined') {
        renderizarTablaAdmin(productos);
    }
});



var modal = document.getElementById('modal-agregar-producto');
var btnNuevo = document.getElementById('btn-nuevo-producto');
var btnCerrar = document.getElementById('btn-cerrar-modal');

if (btnNuevo && modal) {
    btnNuevo.addEventListener('click', function() {
        modal.style.display = 'flex'; // Muestra el modal
    });
}
if (btnCerrar && modal) {
    btnCerrar.addEventListener('click', function() {
        modal.style.display = 'none'; // Oculta el modal
    });
}


var formProducto = document.getElementById('form-producto');

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
                errorSpan.textContent = mensaje;
                errorSpan.style.display = 'block';
                input.classList.add('input-error');
                esValido = false;
            } else {
                errorSpan.style.display = 'none';
                input.classList.remove('input-error');
            }
        }

        
        validarCampo('input-codigo', 'error-codigo', codigo.length < 4, 'El código debe tener al menos 4 caracteres.');
        validarCampo('input-nombre', 'error-nombre', nombre.length < 5, 'El nombre debe tener al menos 5 letras.');
        validarCampo('input-marca', 'error-marca', marca === '', 'Por favor indica la marca.');
        validarCampo('input-modelo', 'error-modelo', modelo === '', 'El modelo es obligatorio.');
        validarCampo('select-categoria-admin', 'error-categoria', categoria === '', 'Selecciona una categoría.');
        validarCampo('input-precio', 'error-precio', precio === '' || parseInt(precio) <= 0, 'Ingresa un precio mayor a 0.');
        validarCampo('input-stock', 'error-stock', stock === '' || parseInt(stock) < 0, 'Ingresa un stock (mínimo 0).');

        
        if (esValido) {
            var nuevoProducto = {
                codigo: codigo,
                categoria: categoria,
                nombre: nombre,
                marca: marca,
                modelo: modelo,
                stock: parseInt(stock),
                precio: parseInt(precio),
                descripcion: "Añadido manualmente."
            };

            
            productos.push(nuevoProducto);
            
            
            renderizarTablaAdmin(productos);
            
            
            formProducto.reset();
            modal.style.display = 'none';
            
            alert(" ¡Producto " + nombre + " guardado con éxito!");
        }
    });
}
