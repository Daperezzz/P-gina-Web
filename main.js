

let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
cargarCarrito();
mostrarCarrito();

fetch('https://api.publicapis.org/entries')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error al obtener los datos:', error));
});

function agregarAlCarrito(producto, precio) {
const item = { producto, precio, cantidad: 1 };
carrito.push(item);
guardarCarrito();
mostrarCarrito();
}

function mostrarCarrito() {
const elementosCarrito = document.getElementById('cartItems');
elementosCarrito.innerHTML = '';
carrito.forEach((item, indice) => {
    const itemElemento = document.createElement('div');
    itemElemento.innerHTML = `
    <div class="d-flex justify-content-between">
        <div>${item.producto}</div>
        <div>$${item.precio.toFixed(2)}</div>
        <div>
        <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(${indice})">Eliminar</button>
        </div>
    </div>
    `;
    elementosCarrito.appendChild(itemElemento);
});
}

function eliminarDelCarrito(indice) {
carrito.splice(indice, 1);
guardarCarrito();
mostrarCarrito();
}

function confirmarCompra() {
alert('Compra confirmada');
carrito = [];
guardarCarrito();
mostrarCarrito();
}

function guardarCarrito() {
localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarrito() {
const carritoGuardado = localStorage.getItem('carrito');
if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
}
}

function validarFormulario() {
const email = document.getElementById('email').value;
const edad = document.getElementById('edad').value;
const password = document.getElementById('pass').value;
const telefono = document.getElementById('telefono').value;
const fecha = document.getElementById('fecha').value;
const check = document.getElementById('check').checked;

if (!email || !password || !telefono || !fecha || !check) {
    alert('Por favor, complete todos los campos requeridos.');
    return false;
}

if (edad < 18) {
    alert('Debe tener al menos 18 años.');
    return false;
}

return true;
}
