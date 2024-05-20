import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'

const tbody = document.querySelector('tbody')
const form = document.querySelector("form")
const name = document.querySelector("#name")
const image = document.querySelector("#url-image")


index()

form.addEventListener('submit', async (event) => {
    //ACA DEBEMOS LLAMAR A LA FUNCION QUE SE ENCARGA DE GUARDAR
    event.preventDefault();
    await create(name, image);
    await index()
    
})

tbody.addEventListener('click',  async function (event) {
    // ACA DEBEMOS LOCALIZAR A LOS ESCUCHADORES DE EVENTOS
    if(event.target.classList.contains("btn-danger")){
        const id = event.target.getAttribute("data-id")
        await deleteItem(id)
        await index()
    }
    if(event.target.classList.contains("btn-warning")){
        const id = event.target.getAttribute("data-id")
        const categoryFound = await find(id);
        name.value = categoryFound.name
        image.value = categoryFound.image
    }
})

async function index() {
    const response = await fetch('https://api.escuelajs.co/api/v1/categories') //llamamos los datos
    const data = await response.json() // convertir los datos de JSON a JS

    tbody.innerHTML = ""
    data.forEach(element => {
        tbody.innerHTML += `
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td>
                <img width="100px" src=${element.image} alt=${element.name}>
            </td>
            <td>${element.creationAt}</td>
            <td>${element.updatedAt}</td>
            <td>
                <button type="button" data-id=${element.id} class="btn btn-warning">Edit</button>
                <button type="button" data-id=${element.id} class="btn btn-danger">Delete</button>
            </td>
        `
    })
}

async function find(id) {
    //ACA DEBEMOS PROGRAMAR LA PETICION PARA BUSCAR UNA CATEGORIA
    const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`) 
    const data = await response.json()
    return data
}

async function create(name, image) {
    //ACA DEBEMOS PROGRAMAR LA PETICION PARA CREAR UNA CATEGORIA
    const newCategory = {
        name: name.value,
        image: image.value,
    }

    await fetch('https://api.escuelajs.co/api/v1/categories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCategory),
    })
}

async function update() {
    //ACA DEBEMOS PROGRAMAR LA PETICION PARA ACTUALIZAR UNA CATEGORIA
}

async function deleteItem(id) {
    //ACA DEBEMOS PROGRAMAR LA PETICION PARA ELIMINAR UNA CATEGORIA
    await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`, {
        method: "DELETE"
    })
}