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
    // Get all the input values
    const email = document.getElementById('email').value;
    const username = document.getElementById('usuario').value;
    const password = document.getElementById('senha').value;
    const firstname = document.getElementById('primeiroNome').value;
    const lastname = document.getElementById('segundoNome').value;
    const city = document.getElementById('cidade').value;
    const street = document.getElementById('rua').value;
    const number = document.getElementById('ruaNumero').value;
    const zipcode = document.getElementById('zipcode').value;
    const phone = document.getElementById('telefone').value;

    // Check if any field is empty
    if (
        !email || !username || !password || !firstname || !lastname ||
        !city || !street || !number || !zipcode || !phone
    ) {
        alert('All fields are required. Please fill out all fields.');
        return; // Stop the function if any field is empty
    }

    // Create the updatedUserData object
    const updatedUserData = {
        email: email,
        username: username,
        password: password,
        name: {
            firstname: firstname,
            lastname: lastname
        },
        address: {
            city: city,
            street: street,
            number: parseInt(number),
            zipcode: zipcode
        },
        phone: phone
    };

    // Call the updateUser function with the ID and the created data
    updateUser(userId, updatedUserData);
}

document.getElementById('updateButton').addEventListener('click', getUpdatedUserDataAndUpdate);