/**
 * Cria card do Produto
 * @param {number} id
 * @param {string} name
 * @param {number} price
 * @param {number} rate
 * @param {number} rateCount
 * @param {string} imageUrl
 * @constructor
 */
export function CardProduto(id, name, price, rate, rateCount, imageUrl) {
    const starClass = 10 * Math.floor(rate) + ((10 * rate) % 10 >= 5 ? 5 : 0)

    return `
        <div class="product-card">
            <img src="${imageUrl}" alt="Product Image" class="product-image">
            <p class="product-name">${name}</p>
            <div class="price-review">
                <div class="product-rating">
                    <p class="card_estrela_texto estrela_${starClass}">★★★★★</p>
                    <span class="review-count">(${rateCount})</span>
                </div>
                <div class="product-price">R$ ${price}</div>
            </div>
            <div class="product-buttons">
                <button onclick="removerFavorito('${id}');listarFavoritos();" class="button favorite-button">Remover dos Favoritos</button>
                <button class="button buy-button">Comprar</button>
            </div>
        </div>
    `;
}