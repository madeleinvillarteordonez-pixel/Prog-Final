
console.log("carrito.js iniciado");

// Variables globales
let contenedorTarjetas, cantidadElement, precioElement, carritoVacioElement, totalesContainer;

/**
 * Inicializa la página del carrito
 */
function inicializarCarrito() {
    console.log("Inicializando página del carrito...");
    
    // Obtener elementos del DOM
    contenedorTarjetas = document.getElementById("cart-container");
    cantidadElement = document.getElementById("cantidad");
    precioElement = document.getElementById("precio");
    carritoVacioElement = document.getElementById("carrito-vacio");
    totalesContainer = document.getElementById("totales");
    
    // Verificar que todos los elementos existan
    if (!contenedorTarjetas || !cantidadElement || !precioElement || !carritoVacioElement || !totalesContainer) {
        console.error("Error: No se encontraron todos los elementos del DOM necesarios");
        return;
    }
    
    // Crear tarjetas de productos en el carrito
    crearTarjetasProductosCarrito();
    
    // Agregar evento al botón de reiniciar
    const botonReiniciar = document.getElementById("reiniciar");
    if (botonReiniciar) {
        botonReiniciar.addEventListener("click", function() {
            if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
                reiniciarCarrito();
                crearTarjetasProductosCarrito();
            }
        });
    }
    
    console.log("Página del carrito inicializada correctamente");
}

/**
 * Crea las tarjetas de productos en el carrito
 */
function crearTarjetasProductosCarrito() {
    console.log("Creando tarjetas del carrito...");
    
    const productos = JSON.parse(localStorage.getItem("ropa")) || [];
    contenedorTarjetas.innerHTML = "";
    
    if (productos.length > 0) {
        productos.forEach((producto) => {
            const nuevoProducto = document.createElement("div");
            nuevoProducto.className = "tarjeta-producto";
            nuevoProducto.innerHTML = `
                <img src="${producto.img}" alt="${producto.nombre}" onerror="this.src='https://via.placeholder.com/100x100?text=Imagen'">
                <h3>${producto.nombre}</h3>
                <span class="precio-unitario">$${producto.precio}</span>
                <div class="controles-cantidad">
                    <button class="btn-restar">-</button>
                    <span class="cantidad">${producto.cantidad}</span>
                    <button class="btn-sumar">+</button>
                </div>
                <div class="precio-total">Total: $${producto.precio * producto.cantidad}</div>
            `;
            
            contenedorTarjetas.appendChild(nuevoProducto);
            
            // Eventos para los botones de cantidad
            const btnRestar = nuevoProducto.querySelector('.btn-restar');
            const btnSumar = nuevoProducto.querySelector('.btn-sumar');
            
            btnRestar.addEventListener('click', function() {
                const nuevaCantidad = restarAlCarrito(producto);
                if (nuevaCantidad === 0) {
                    crearTarjetasProductosCarrito();
                } else {
                    nuevoProducto.querySelector('.cantidad').textContent = nuevaCantidad;
                    nuevoProducto.querySelector('.precio-total').textContent = `Total: $${producto.precio * nuevaCantidad}`;
                    actualizarTotales();
                }
            });
            
            btnSumar.addEventListener('click', function() {
                const nuevaCantidad = agregarAlCarrito(producto);
                nuevoProducto.querySelector('.cantidad').textContent = nuevaCantidad;
                nuevoProducto.querySelector('.precio-total').textContent = `Total: $${producto.precio * nuevaCantidad}`;
                actualizarTotales();
            });
        });
    }
    
    revisarMensajeVacio();
    actualizarTotales();
    actualizarNumeroCarrito();
}

/**
 * Actualiza los totales del carrito
 */
function actualizarTotales() {
    const productos = JSON.parse(localStorage.getItem("ropa")) || [];
    let cantidad = 0;
    let precio = 0;
    
    productos.forEach((producto) => {
        cantidad += producto.cantidad;
        precio += producto.precio * producto.cantidad;
    });
    
    cantidadElement.textContent = cantidad;
    precioElement.textContent = precio;
    
    // Habilitar/deshabilitar botón de compra
    const btnComprar = document.querySelector('#totales button:first-child');
    if (btnComprar) {
        btnComprar.disabled = cantidad === 0;
    }
    
    if (precio === 0) {
        revisarMensajeVacio();
    }
}

/**
 * Muestra u oculta el mensaje de carrito vacío
 */
function revisarMensajeVacio() {
    const productos = JSON.parse(localStorage.getItem("ropa")) || [];
    const tieneProductos = productos.length > 0;
    
    carritoVacioElement.classList.toggle("escondido", tieneProductos);
    totalesContainer.classList.toggle("escondido", !tieneProductos);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializarCarrito);