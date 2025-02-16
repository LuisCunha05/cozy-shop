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
export function CardProduto(id, name, price, rate, rateCount, imageUrl ) {
    console.log( 'rate: ', rate);

    return `
        <div class="product-card">
            <img src="${imageUrl}" alt="Product Image" class="product-image">
            <p class="product-name">${name}</p>
            <div class="price-review">
                <div class="product-rating">
                    <p style="background: linear-gradient(90deg, #FFD600 ${(100 * rate)/5}%, #989898 ${(100 * rate)/5}%);" class="star">★★★★★</p>
                    <span class="review-count">(${rateCount})</span>
                </div>
                <div class="product-price">R$ ${price}</div>
            </div>
            <div class="product-buttons">
                <button onclick="adicionarFavorito('${id}')" class="button favorite-button">Adicionar aos Favoritos</button>
                <button class="button buy-button">Comprar</button>
            </div>
        </div>
    `;
}