import usuarioComponente from "../componentes/usuarioComponente.js";

//const userId = sessionStorage.getItem("userId");
const userId = "2"
await fetch(`https://fakestoreapi.com/users/${userId}`)
.then(res=>res.json())
.then(json => {
    document.getElementById("usuario").innerHTML += usuarioComponente(json);
})

function updateUser(id, updatedUserData) {
    fetch(`https://fakestoreapi.com/users/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUserData)
    })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(error => console.error('Error:', error));
}


function getUpdatedUserDataAndUpdate() {
    const updatedUserData = {
        email: document.getElementById('email').value,
        username: document.getElementById('usuario').value,
        password: document.getElementById('senha').value,
        name: {
            firstname: document.getElementById('primeiroNome').value,
            lastname: document.getElementById('segundoNome').value
        },
        address: {
            city: document.getElementById('cidade').value,
            street: document.getElementById('rua').value,
            number: parseInt(document.getElementById('ruaNumero').value),
            zipcode: document.getElementById('zipcode').value
        },
        phone: document.getElementById('telefone').value
    };

    updateUser(userId, updatedUserData);
}
document.getElementById('updateButton').addEventListener('click', getUpdatedUserDataAndUpdate);