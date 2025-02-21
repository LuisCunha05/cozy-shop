import {updateProdutoComponent} from '../componentes/update_produto.js';

const button_update = document.getElementById('button_update');
const forms_update = document.getElementById('forms_update');

button_update.addEventListener('click', () => {
  forms_update.style.display = forms_update.style.display == 'flex' ? 'none' : 'flex';
});

forms_update.addEventListener('submit', validarUpdate);

function validarUpdate(event) {
  event.preventDefault();
  const id = document.getElementById('id').value;

  if (!id) {
    alert('Informações faltantes, por favor verifique o formulário');
  }
  else {
   updateProduto(id);
  }
}

async function updateProduto(id) {
  const produto_selecionado = document.getElementById('produto_selecionado');
  
  let produto = await fetch(`https://fakestoreapi.com/products/${id}`).then(res => res.json());

  if (produto){
    produto_selecionado.innerHTML = updateProdutoComponent(produto);
  }
  else {
    alert('produto não encontrado');
  }

  document.addEventListener('submit', async (event) => {
  if (event.target && event.target.id === 'UpdateForms') {
    event.preventDefault();

    const nome = document.getElementById('title').value;
    const price = parseFloat(document.getElementById('price').value);
    const img = document.getElementById('img').value;
    const desc = document.getElementById('desc').value;

    if (!nome || isNaN(price) || !desc || !img) {
      alert("Preencha todos os campos corretamente.");
    }

    try {
      let updateProduto = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: nome,
          price: price,
          description: desc,
          image: img,
        })
      }).then(res => res.json());

      if (updateProduto) {
        location.reload();
        alert('Produto Atualizado com Sucesso!');
      }
    } catch (error) {
      alert('Erro ao atualizar o produto.', error);
      location.reload();
    }
  }
});
}