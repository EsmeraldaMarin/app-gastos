const send_btn = document.getElementById('send_btn');
const input_name = document.getElementById('name_input');
const input_amount = document.getElementById('amount_input');
const item_list = document.getElementById('item_list');
const resultados = document.getElementById('resultados');
const select_forma_pago = document.getElementById('fdp_select')
const input_fecha = document.getElementById('fecha_pago')
const descargarA = document.getElementById('downl')
let totalM = 0
let totalP = 0

//contado, fecha y descargar
let todas_las_personas = []

function crearPersona(nombre, monto, fecha_pago, modoDePago) {

    return {
        nombre: nombre,
        monto: monto,
        fecha:fecha_pago,
        modoDePago: modoDePago
    }
}


let todos_los_nombres = []
let todos_los_montos = []


function createItem(name, amount) {
    let item = `<li class="list-group-item">
        <p><span>${name}</span>: <span>${amount}</span></p>
    </li>`
    return item
}

function calculos(monto) {
    totalM += parseFloat(monto)
    totalP += 1

    let totalSpan = `
        <h3>Resultados</h3>
        <span>Total: $${totalM}</span>
        <span>Cada uno debe aportar $${totalM / totalP}</span>
        `
    resultados.innerHTML = totalSpan

}

function eliminarPersona(e) {
    let index = e.path.findIndex(el => el.classList[0] == "list-group-item")
    let liElement = e.path[index]

    let nombre = liElement.childNodes[1].children[0].textContent
    let monto = liElement.childNodes[1].children[1].textContent

    let indiceN = todos_los_nombres.indexOf(nombre)
    let indiceM = todos_los_montos.indexOf(monto)

    todos_los_nombres.splice(indiceN, 1)
    todos_los_montos.splice(indiceM, 1)


    liElement.remove()
    calculos()
    e.stopPropagation();

    if (todos_los_nombres.length == 0) {
        resultados.innerHTML = ''
    }

}

function agregarPersona() {
    let nombre_persona = input_name.value;
    let monto_persona = input_amount.value;
    let fecha_pago = input_fecha.value;

    let forma_pago = select_forma_pago.options[select_forma_pago.selectedIndex].textContent
    input_name.value = ''
    input_amount.value = ''
    input_fecha.value = ''

    if (nombre_persona == "" || monto_persona == "") {
        document.body.classList = 'error'

    } else {
        document.body.classList.remove('error')

        let item = createItem(nombre_persona, monto_persona)
        let persona = crearPersona(nombre_persona, monto_persona, fecha_pago, forma_pago)

        todas_las_personas.push(persona)
        console.log(persona)
        item_list.innerHTML += item

        calculos(monto_persona);
        item_list.addEventListener('click', eliminarPersona)
    }
}

send_btn.addEventListener('click', agregarPersona)
input_amount.parentElement.parentElement.addEventListener('keyup', (e) => {
    if (e.code == 'Enter') {
        agregarPersona()
    }
})
descargarA.addEventListener('click', descargar)

function descargar() {

    let archivo = new Blob([JSON.stringify(todas_las_personas)], { type: 'text/plain' });

    descargarA.href = URL.createObjectURL(archivo);

    descargarA.download = "datos_personas.json";

}

