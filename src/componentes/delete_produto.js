
/**
 * @param {number} id
 * @param {string} title
 * @param {number} price
 * @param {string} image
 * @returns
 */


export function deleteProdutoComponent({id, title, price, image, description}) {
  return `<form name="DeleteForms" id="DeleteForms">
    <input type="number" id="id_delete" hidden value="${id}">
    <img src="${image}" class="imagemProduto">
    <h2>${title}</h2>
    <span>${price}</span>
    <p>${description}</p>
    <button id="deletar_produto">Deletar</button>
    <button id="cancelar_deletar_produto">Cancelar</button>
  </form>`
}