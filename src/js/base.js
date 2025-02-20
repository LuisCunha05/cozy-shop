import headerComponente from "../componentes/headerComponente.js";
import headerLoginRegistroComponente from "../componentes/headerLoginRegistroComponente.js";

document.getElementById("header").innerHTML += headerComponente();
document.getElementById("headerLoginRegistro").innerHTML += headerLoginRegistroComponente();
const element = document.getElementById("header")

if(element && element.innerText.length === 0) {
    element.innerHTML = headerComponente();
}