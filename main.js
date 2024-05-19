let carrito = [];
let tipoCambio = null;
const apiURL = 'https://api.exchangerate-api.com/v4/latest/USD';

document.addEventListener('DOMContentLoaded', () => {
    cargarCarrito();
    mostrarCarrito();
    obtenerTipoCambio();
});

function obtenerTipoCambio() {
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            if (data && data.rates && data.rates.CLP) {
                tipoCambio = data.rates.CLP;
                console.log('Tipo de cambio:', tipoCambio);
                actualizarPreciosEnCards();
            } else {
                console.error('Error al obtener los datos de la API.');
            }
        })
        .catch(error => console.error('Error al obtener los datos:', error));
}

function actualizarPreciosEnCards() {
    const precios = document.querySelectorAll('.precio');
    precios.forEach(precio => {
        const valorCLP = parseFloat(precio.dataset.valor);
        if (tipoCambio) {
            const valorUSD = (valorCLP / tipoCambio).toFixed(2);
            precio.innerHTML = `$${valorCLP} CLP / $${valorUSD} USD`;
        } else {
            precio.innerHTML = `$${valorCLP} CLP / $0 USD`;
        }
    });
}

function agregarAlCarrito(producto, precioCLP) {
    const item = { producto, precioCLP, cantidad: 1 };
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
            <div>${item.precioCLP} CLP</div>
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
        alert('Complete lo requerido');
        return false;
    }

    if (edad < 18) {
        alert('Debes ser mayor de edad');
        return false;
    }

    return true;
}
