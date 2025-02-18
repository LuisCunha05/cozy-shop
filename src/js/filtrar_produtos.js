/**
 * Remove os elementos da tela, apenas visualmente, não remove html. Chamar sem argumento, lista todos os produtos
 * @param {string | undefined} cat 
 */
const filtrarProdutos = (cat) => {
    const lista_card = document.querySelectorAll('.product-card')

    if(cat === undefined){
        lista_card.forEach(elemento => {
            elemento.style.display = 'block'
            return
        })
    }

    lista_card.forEach(elemento => {
        if(elemento.attributes.getNamedItem('product-category').value === cat){
            elemento.style.display = 'block'
            return
        }

        elemento.style.display = 'none'
    })
}