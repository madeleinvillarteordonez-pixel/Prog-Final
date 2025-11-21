
console.log("catalogo.js iniciado");

function crearTarjetasProductosInicio() {
    console.log("Creando productos...");
    const contenedorTarjetas = document.getElementById("productos-container");
    
    if (!contenedorTarjetas) {
        console.error("No se encontró el contenedor de productos");
        return;
    }
    
    // LIMPIAR CONTENEDOR
    contenedorTarjetas.innerHTML = "";
    
    // VERIFICAR QUE HAY PRODUCTOS
    if (!ropa || ropa.length === 0) {
        console.error("No hay productos en la variable ropa");
        return;
    }
    
    console.log("Cargando", ropa.length, "productos");
    
    // CREAR CADA PRODUCTO
    ropa.forEach(producto => {
        const nuevoProducto = document.createElement("div");
        nuevoProducto.classList = "tarjeta-producto";
        
        nuevoProducto.innerHTML = 
        `<img src="${producto.img}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <button>Agregar al carrito</button>`;
        
        contenedorTarjetas.appendChild(nuevoProducto);
        
        // AGREGAR EVENTO AL BOTÓN - CORREGIDO
        const boton = nuevoProducto.getElementsByTagName("button")[0];
        boton.addEventListener("click", function() {
            agregarAlCarrito(producto);
        });
    });
    
    console.log("Productos creados exitosamente");
}

// EJECUTAR CUANDO LA PÁGINA ESTÉ LISTA
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM cargado - iniciando creación de productos");
    crearTarjetasProductosInicio();
});

// TAMBIÉN EJECUTAR CON TIMEOUT POR SI ACASO
setTimeout(crearTarjetasProductosInicio, 100);