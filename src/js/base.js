import headerComponente from "../componentes/headerComponente.js";
import headerLoginRegistroComponente from "../componentes/headerLoginRegistroComponente.js";


const element = document.getElementById("header")
const elementLogin = document.getElementById("headerLoginRegistro")

if(element && element.innerText.length === 0) {
    element.innerHTML = headerComponente();
}
if(elementLogin && elementLogin.innerText.length === 0) {
    elementLogin.innerHTML = headerLoginRegistroComponente();
}