
/**
 * @param {number} id
 * @param {string} title
 * @param {number} price
 * @param {string} image
 * @returns
 */


export function updateProdutoComponent({id, title, price, image, description}) {
  return `<form name="UpdateForms" id="UpdateForms">
    <input type="number" hidden value="${id}">
    <img src="${image}" class="imagemProduto">
    <label for="title">Nome do produto</label>
    <input type="text" name="title" id="title" value="${title}">
    <label for="price">Preço do produto</label>
    <input type="number" name="price" id="price" value="${price}">
    <label for="img">Preço do produto</label>
    <input type="text" name="img" id="img" value="${image}">
    <label for="desc">Descrição</label>
    <textarea name="desc" id="desc" value="${description}" cols="30" rows="10"></textarea>
    <button name="update_produto">Salvar</button>
  </form>`
}