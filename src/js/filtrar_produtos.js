/**
 * Remove os elementos da tela, apenas visualmente, não remove html. Chamar sem argumento, lista todos os produtos
 * @param {string | undefined | 'none'} cat
 */
const filtrarProdutos = (cat) => {
    console.log(`filto: `, cat)
    const lista_card = document.querySelectorAll('.product-card')

    console.log(lista_card.length)
    if(lista_card.length === 0) return

    if(cat === undefined || cat === 'none'){
        lista_card.forEach(elemento => {
            elemento.style.display = 'block'
        })
        return
    }

    lista_card.forEach(elemento => {
        if(elemento.attributes.getNamedItem('data-product-category').value === cat){
            elemento.style.display = 'block'
        }else{
            elemento.style.display = 'none'
        }


    })
}

export  default { filtrarProdutos }

document.filtrarProdutos = filtrarProdutos;