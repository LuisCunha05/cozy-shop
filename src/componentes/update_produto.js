
/**
 * 
 * @param {string} title
 * @param {number} price
 * @param {string} imageUrl
 * @returns
 */


export function updateProduto(title, price, imageUrl) {
  return `<form name="UpdateForms">
    <img src="${imageUrl}">
    <label for="title">Nome do produto</label>
    <input type="text" name="title" value="${title}">
    <label for="price">Preço do produto</label>
    <input type="number" name="price" value="${price}">
    <label for="img">Preço do produto</label>
    <input type="text" name="img" value="${imageUrl}">
    <button name="update_produto">Salvar</button>
  </form>`
}