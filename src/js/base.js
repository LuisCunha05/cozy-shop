import headerComponente from "../componentes/headerComponente.js";

const element = document.getElementById("header")

if(element && element.innerText.length === 0) {
    element.innerHTML = headerComponente();
}
