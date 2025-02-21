import {deleteProdutoComponent} from '../componentes/delete_produto.js';

const button_delete = document.getElementById('button_delete');
const forms_delete = document.getElementById('forms_delete');

button_delete.addEventListener('click', () => {
  forms_delete.style.display = forms_delete.style.display == 'flex' ? 'none' : 'flex';
})

forms_delete.addEventListener('submit', validarDelete);

async function validarDelete(event) {
  event.preventDefault();
  const id = document.getElementById('id_delete_forms').value;

  if (!id) {
    alert('Informações faltantes, por favor verifique o formulário');
  }
  else {
    await deleteProduto(id);
  }
}

async function deleteProduto(id) {
  const produto_selecionado = document.getElementById('produto_selecionado');

  let produto = await fetch(`https://fakestoreapi.com/products/${id}`).then(res => res.json());

  if (produto) {
    produto_selecionado.innerHTML = deleteProdutoComponent(produto);

    document.getElementById('cancelar_deletar_produto').addEventListener('click', () => {
      location.reload();
      alert('Cancelado')
    });
  }
  else {
    alert('produto não encontrado');
  }

  document.addEventListener('submit', async (event) => {
    if (event.target && event.target.id === 'DeleteForms') {
      event.preventDefault();

      let deleteProduto = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method:"DELETE"
      }).then(res => res.json())
        
      if (deleteProduto) {
        alert('Produto deletado com sucesso');
        location.reload();
      }
      else {
        alert('Erro, produto não encontrado');
      }
    }
  })
}