//const responseAPI = obtenerServicio(); //GET https://pagina.cl/api/servicio
const responseAPI = {
    "status":200, //Solicitud realizada con exito
    "message":"Servicio solicitado correctamente",
    "data": [
        {
            "id":1,
            "nombre":"Transacción a X",
            "valor": 5000
        },
        {
            "id":2,
            "nombre":"Transacción a Y",
            "valor": 100000
        },
        {
            "id":3,
            "nombre":"Transacción a Z",
            "valor": 300
        }
    ]
};

let cmbTransacciones = document.createElement("select");
cmbTransacciones.setAttribute("name","cmbTransacciones");
responseAPI.data.forEach((tr) => {
    const estadoTr = {...tr,estado:"Aprobado"}
    let optionAux = document.createElement("option");
    optionAux.setAttribute("value",estadoTr.id);
    optionAux.innerText = `${estadoTr.nombre} - $${estadoTr.valor} (${estadoTr.estado})`;
    cmbTransacciones.appendChild(optionAux);
});
document.body.appendChild(cmbTransacciones);

//Vista desde consola, los objetos dentro de la API se convierten en [Object object] debido a su tipo (data)
Object.entries(responseAPI).forEach(([key,value]) => {
    console.log(`Tipo: ${key}, Valor: ${value}`)
});
