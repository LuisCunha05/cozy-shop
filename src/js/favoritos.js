import {CardProduto} from "../componentes/card_produto.js";
/**
 * Type da Avaliação
 * @typedef {{rate:number, count:number}} RatingType
 */

/**
 * Type do objeto Produto
 * @typedef {{
 *  id:number,
 *  title:string,
 *  price:number,
 *  category:string,
 *  description:string,
 *  image:string,
 *  rating:RatingType
 *  }} ProdutoType
 */

/**
 * Retorna a Promise do produto
 * @param {string} id ID do produto
 */
const visualizarProduto = (id) => {
    return fetch(`https://fakestoreapi.com/products/${id}`)
}



/**
 * Fetches todos os produtos e retorna uma lista
 *@param {string[]} produtos Lista de IDs dos produtos
 *@returns {Promise<ProdutoType[]> | null}
 */
const listarProdutos = async (produtos) => {
    try{
        const responses = await Promise.all(produtos.map(id => visualizarProduto(id)))
        return await Promise.all(responses.map(produto => produto.json()))
    }catch(err){
        console.log('Error while fetching the products: ',err)
        return null
    }
}

/**
 * Coloca o array dentro dos favoritos
 * @param {string[]} arr 
 * @returns 
 */
const setFavorito = arr => localStorage.setItem('favoritos', JSON.stringify(arr))

/**
 * Retorna lista de IDs dos produtos favoritos
 * @returns {string[]}
 */
const visualizarFavorito = () => {
    return JSON.parse(localStorage.getItem('favoritos')) || []
}

/**
 * Adiciona um novo favorito, utilizando o localStorage
 * @param {string} id 
 */
const adicionarFavorito = (id) => {
    /**
     * @type {string[]}
     */
    const favoritos = visualizarFavorito()
    
    if(favoritos.includes(id)) return

    favoritos.push(id)

    setFavorito(favoritos)
    listarFavoritos()
}

/**
 * Remove o produto dos favoritos caso ele exista
 * @param {string} id 
 */
const removerFavorito = (id) => {
    const favoritos = visualizarFavorito()

    if(!(favoritos.includes(id))) return


    favoritos.splice(favoritos.indexOf(id), 1)

    setFavorito(favoritos)
}

const listarFavoritos = async () => {
    const elemento = document.getElementById('lista_favoritos')

    if(elemento === null)return

    const idFavoritos = visualizarFavorito()

    if(!idFavoritos.length) return

    /**
     * @type {ProdutoType[] | null} listaFavoritos
     */
    let listaFavoritos = await listarProdutos(idFavoritos)
    listaFavoritos = listaFavoritos ?? []

    const noFavoritos = document.createElement('h2')
    noFavoritos.innerText = 'Sem Favoritos'

    if(!listaFavoritos.length){
        elemento.appendChild(noFavoritos)
        return
    }

    elemento.innerHTML = listaFavoritos.map(({id, title, price, image, rating, category }) => { return CardProduto( id, title, price, rating.rate, rating.count, image, category) }).join('\n')

}

/**
 * Retorna a lista de categorias da API
 * @returns {Promise<string[]>}
 */
const visualizarCategoria = async () => {
    const response =  await fetch('https://fakestoreapi.com/products/categories')
    const json = await response.json()
    return json
}

const listarFiltoCategoria = async () => {
    const elemento = document.getElementById('productFilter')

    if(elemento === null)return

    const categorias = await visualizarCategoria()

    elemento.innerHTML = `<option value="none">Nenhum</option>` + categorias.map(item => `<option value="${item}">${item.toUpperCase()}</option>`).join('\n')
}




listarFavoritos()
listarFiltoCategoria()

export { visualizarFavorito, adicionarFavorito, removerFavorito, listarFavoritos}

window.listarFavoritos = listarFavoritos;
window.removerFavorito = removerFavorito;
window.adicionarFavorito = adicionarFavorito;
window.visualizarFavorito = visualizarFavorito;

// console.log( await listarProdutos(['4']))