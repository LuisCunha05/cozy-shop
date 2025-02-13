import usuarioComponente from "../componentes/usuarioComponente.js";

const userId = sessionStorage.getItem("userId");

// fetch(`https://fakestoreapi.com/users/${userId}`) - Correto
fetch(`https://fakestoreapi.com/users/1`) // Gambiarra para fazer funcionar sem o session storage.
.then(res=>res.json())
.then(json => {
    document.getElementById("usuario").innerHTML += usuarioComponente(json);
})
