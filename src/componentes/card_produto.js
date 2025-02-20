import { visualizarFavorito } from '../js/favoritos.js'
/**
 * Cria card do Produto
 * @param {number} id ID do produto na API
 * @param {string} name
 * @param {number} price 
 * @param {number} rate Avaliação do produto de 0 a 5
 * @param {number} rateCount Quantidade de Avaliações
 * @param {string} imageUrl 
 * @param {string} category Categoria do produto
 * @constructor
 */
export function CardProduto(id, name, price, rate, rateCount, imageUrl, category) {
    const starClass = 10 * Math.floor(rate) + ((10 * rate) % 10 >= 5 ? 5 : 0)

    const favoritos = visualizarFavorito()
    const eFavorito = favoritos.includes(`${id}`)
    const funcaoFavorito  = eFavorito ? `removerFavorito('${id}')` : `adicionarFavorito('${id}')`

    return `
        <div data-product-category="${category}" class="product-card">
            <img class="product-image" src="${imageUrl}" alt="Product Image" >
            <p class="product-name">${name}</p>
            <div class="price-review">
                <div class="product-rating">
                    <p class="card_estrela_texto estrela_${starClass}">★★★★★</p>
                    <span class="review-count">(${rateCount})</span>
                </div>
                <div class="product-price">R$ ${price.toFixed(2)}</div>
            </div>
            <div class="product-buttons">
                <button onclick="${funcaoFavorito}" ;" class="button ${eFavorito ? 'remove-button' : 'favorite-button'}">${eFavorito ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}</button>
                <button class="button buy-button" onclick="adicionarCarrinho('${id}')">Adicionar ao Carrinho</button>
            </div>
        </div>
    `;
}