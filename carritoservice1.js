
console.log("carritoservice1.js iniciado");

// Obtener elemento del contador del carrito
function obtenerCuentaCarritoElement() {
    return document.getElementById("cuenta-carrito");
}

/**
 * Agrega un producto al carrito
 */
function agregarAlCarrito(producto) {
    console.log("Agregando al carrito:", producto.nombre);
    
    let memoria = JSON.parse(localStorage.getItem("ropa")) || [];
    let cantidadProductoFinal;
    
    // Si no hay productos en el carrito
    if (memoria.length === 0) {
        const nuevoProducto = getNuevoProductoParaMemoria(producto);
        memoria = [nuevoProducto];
        cantidadProductoFinal = 1;
    } else {
        // Buscar si el producto ya está en el carrito
        const indiceProducto = memoria.findIndex(prenda => prenda.id === producto.id);
        
        if (indiceProducto === -1) {
            // Producto no está en el carrito, agregarlo
            const nuevoProducto = getNuevoProductoParaMemoria(producto);
            memoria.push(nuevoProducto);
            cantidadProductoFinal = 1;
        } else {
            // Producto ya está en el carrito, incrementar cantidad
            memoria[indiceProducto].cantidad++;
            cantidadProductoFinal = memoria[indiceProducto].cantidad;
        }
    }
    
    // Guardar en localStorage
    localStorage.setItem("ropa", JSON.stringify(memoria));
    actualizarNumeroCarrito();
    
    console.log("Carrito actualizado:", memoria);
    return cantidadProductoFinal;
}

/**
 * Resta una unidad de un producto del carrito
 */
function restarAlCarrito(producto) {
    let memoria = JSON.parse(localStorage.getItem("ropa")) || [];
    
    if (memoria.length === 0) {
        return 0;
    }
    
    let cantidadProductoFinal = 0;
    const indiceProducto = memoria.findIndex(prenda => prenda.id === producto.id);
    
    if (indiceProducto !== -1) {
        memoria[indiceProducto].cantidad--;
        cantidadProductoFinal = memoria[indiceProducto].cantidad;
        
        // Si la cantidad llega a 0, eliminar el producto
        if (cantidadProductoFinal === 0) {
            memoria.splice(indiceProducto, 1);
        }
        
        // Guardar cambios
        localStorage.setItem("ropa", JSON.stringify(memoria));
        actualizarNumeroCarrito();
    }
    
    return cantidadProductoFinal;
}

/**
 * Crea un nuevo objeto producto para la memoria del carrito
 */
function getNuevoProductoParaMemoria(producto) {
    // Crear una copia del producto para no modificar el original
    return {
        id: producto.id,
        nombre: producto.nombre,
        img: producto.img,
        precio: producto.precio,
        cantidad: 1
    };
}

/**
 * Actualiza el número del carrito en el header
 */
function actualizarNumeroCarrito() {
    const memoria = JSON.parse(localStorage.getItem("ropa")) || [];
    let cuenta = 0;
    
    if (memoria.length > 0) {
        cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0);
    }
    
    const cuentaElement = obtenerCuentaCarritoElement();
    if (cuentaElement) {
        cuentaElement.innerText = cuenta;
        
        // Agregar animación
        cuentaElement.classList.add('pulse');
        setTimeout(() => {
            cuentaElement.classList.remove('pulse');
        }, 300);
    }
    
    console.log("Carrito actualizado - Total items:", cuenta);
}

/**
 * Reinicia el carrito completamente
 */
function reiniciarCarrito() {
    localStorage.removeItem("ropa");
    actualizarNumeroCarrito();
    console.log("Carrito reiniciado");
}

// Inicializar el contador del carrito cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    actualizarNumeroCarrito();
});