
const Productos = {
    "status": 200,
    "message": "Productos:",
    "data": [
             {"id":"1","nombre":"Circuito Integrado","precio": 30000},
             {"id":"2","nombre":"Transitor MOSFET","precio": 10000},
             {"id":"3","nombre":"Sensor temperatura","precio": 25000},
             {"id":"4","nombre":"Microcontrolador ESP32","precio": 17000},
             {"id":"5","nombre":"Protoboard","precio": 37000},
        ]
};

function cargarProductos(){
    let cmb = document.getElementById("cmbProducto");
    Productos.data.forEach((prod) => {
        let opt = document.createElement("option");
        opt.setAttribute("value", prod.id);
        opt.setAttribute("Precio", prod.precio);
        opt.innerText = prod.nombre;
        cmb.appendChild(opt);                    
    });
};

function agregarProducto()
{
    let cmb = document.getElementById("cmbProducto");
    let id = document.getElementById("txtId").value;
    let nombre = document.getElementById("txtNombre").value;
    let precio = document.getElementById("txtPrecio").value;
    let opt = document.createElement("option");
    opt.setAttribute("value", id);
    opt.setAttribute("Precio", precio);
    opt.innerText = nombre;
    cmb.appendChild(opt);
}

function irCarro()
{
    let cmb = document.getElementById("cmbProducto");
    let id = cmb.value;
    window.location.href = "carrito.php?id=" + id; //Permite acceder a la pagina por medio del href y por id
}

let carrito = [];//Variable global
let totalcarro = 0;

function mostrarPrecio() {
    let cmb = document.getElementById("cmbProducto");
    if(cmb.selectedIndex === -1) return; //Para el ultimo indice 
    
    let opcionSeleccionada = cmb.options[cmb.selectedIndex];
    let precio = opcionSeleccionada.getAttribute("Precio");
    
    document.getElementById("lblPrecio").innerText = "$" + precio;
}

function agregarAlCarro() {
    let cmb = document.getElementById("cmbProducto");
    let opcionSeleccionada = cmb.options[cmb.selectedIndex];
    
    let id = opcionSeleccionada.value;
    let nombre = opcionSeleccionada.text;
    let precio = parseInt(opcionSeleccionada.getAttribute("Precio")); //Parse para pasar de string a int
    
    carrito.push({ id: id, nombre: nombre, precio: precio }); //Para añadir a la lista del carro
    
    totalcarro += precio;
    document.getElementById("lblTotal").innerText = "Total Carrito: $" + totalcarro;
}