const send_btn = document.getElementById('send_btn');
const input_name = document.getElementById('name_input');
const input_amount = document.getElementById('amount_input');
const item_list = document.getElementById('item_list');
const resultados = document.getElementById('resultados');

let todos_los_nombres = []
let todos_los_montos = []


function createItem(name, amount) {
    let item = `<li class="list-group-item">
        <p><span>${name}</span>: <span>${amount}</span></p>
    </li>`
    return item
}

function calculos() {

    let totalM = 0
    let totalP = 0

    todos_los_montos.forEach(monto => {
        totalM += parseFloat(monto)
    })
    todos_los_nombres.forEach(() => {
        totalP += 1
    })

    let totalSpan = `
    <h3>Resultados</h3>
    <span>Total: $${totalM}</span>
    <span>Cada uno debe aportar $${totalM / totalP}</span>
    `
    resultados.innerHTML = totalSpan

}

function eliminarPersona(e) {
    let nombre = e.target.childNodes[1].children[0].textContent
    let monto = e.target.childNodes[1].children[1].textContent

    let indiceN = todos_los_nombres.indexOf(nombre)
    let indiceM = todos_los_montos.indexOf(monto)

    todos_los_nombres.splice(indiceN, 1)
    todos_los_montos.splice(indiceM, 1)


    e.target.remove()
    calculos()
    e.stopPropagation();

    if (todos_los_nombres.length == 0) {
        resultados.innerHTML = ''
    }

}

function agregarPersona() {
    let nombre_persona = input_name.value;
    let monto_persona = input_amount.value;
    input_name.value = ''
    input_amount.value = ''

    if (nombre_persona == "" || monto_persona == "") {
        document.body.classList = 'error'

    } else {
        document.body.classList.remove('error')

        let item = createItem(nombre_persona, monto_persona)

        todos_los_nombres.push(nombre_persona)
        todos_los_montos.push(monto_persona)

        item_list.innerHTML += item

        calculos();

        item_list.addEventListener('click', eliminarPersona)
    }
}

send_btn.addEventListener('click', agregarPersona)
input_amount.parentElement.parentElement.addEventListener('keyup', (e) => {
    if (e.code == 'Enter') {
        agregarPersona()
    }
})

