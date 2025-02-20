import {updateProdutoComponent} from '../componentes/update_produto.js';
import {deleteProdutoComponent} from '../componentes/delete_produto.js';

const button_add = document.getElementById('button_add');
const button_update = document.getElementById('button_update');
const button_delete = document.getElementById('button_delete');
const forms_add = document.getElementById('forms_add');
const forms_update = document.getElementById('forms_update');
const forms_delete = document.getElementById('forms_delete');

button_add.addEventListener('click', () => {
  if(forms_add.style.display == 'flex'){
    forms_add.style.display = 'none'
  }
  else {
    forms_add.style.display = 'flex';
  }
});

button_update.addEventListener('click', () => {
  if(forms_update.style.display == 'flex'){
    forms_update.style.display = 'none'
  }
  else {
    forms_update.style.display = 'flex';
  }
});

button_delete.addEventListener('click', () => {
  if(forms_delete.style.display == 'flex') {
    forms_delete.style.display = 'none';
  }
  else {
    forms_delete.style.display = 'flex';
  }
})

forms_add.addEventListener('submit', validarForms);
forms_update.addEventListener('submit', validarUpdate);
forms_delete.addEventListener('submit', validarDelete);

async function validarUpdate(event) {
  event.preventDefault();
  
  const id = document.getElementById('id');

  if (id.value == '' || id.value == null) {
    alert('Informações faltantes, por favor verifique o formulário');
  }
  else {
    await updateProduto();
  }
}

async function validarDelete(event) {
  event.preventDefault();
  
  const id = document.getElementById('id_delete_forms');

  if (id.value == '' || id.value == null) {
    alert('Informações faltantes, por favor verifique o formulário');
  }
  else {
    await deleteProduto();
  }
}

function validarForms(event) {
  event.preventDefault();

  const nomeForms = document.getElementById('nomeProduto');
  const descForms = document.getElementById('descricao');
  const imgForms = document.getElementById('imagemProduto');
  const categoriaForms = document.getElementById('select_categoria');
  const precoForms = document.getElementById('preco');

  if ((nomeForms.value == null || nomeForms.value == '') || (descForms.value == null || descForms.value == '') || (imgForms.value == null || imgForms.value == "") || (categoriaForms.value == null || categoriaForms.value == '' ) || (precoForms.value == null || precoForms.value == '')) {
    alert('Informações faltantes, por favor verifique o formulário');
  }
  else {
    addProduto()
  }
}

async function deleteProduto() {
  const id = document.getElementById('id_delete_forms');
  const produto_selecionado = document.getElementById('produto_selecionado');

  let produto = await fetch(`https://fakestoreapi.com/products/${id.value}`).then(res => res.json());

  if (produto) {
    produto_selecionado.innerHTML = deleteProdutoComponent(produto);
  }
  else {
    alert('produto não encontrado');
  }

    document.addEventListener('submit', async (event) => {
        const cancelar_deletar_produto = document.getElementById('cancelar_deletar_produto');

  if(cancelar_deletar_produto.onclick) {
    alert('Cancelado');
  }
  
  else {
    if (event.target && event.target.id === 'DeleteForms') {

      event.preventDefault();
      let deleteProduto = await fetch(`https://fakestoreapi.com/products/${id.value}`, {
        method:"DELETE"
      }).then(res => res.json())
      if (deleteProduto) {
        alert('Produto deletado com sucesso');
      }
      else {
        alert('Erro, produto não encontrado');
      }
      }
    })
  }
}

async function updateProduto() {
  const id = document.getElementById('id');
  const produto_selecionado = document.getElementById('produto_selecionado');
  
  let produto = await fetch(`https://fakestoreapi.com/products/${id.value}`).then(res => res.json());

  if (produto){
    produto_selecionado.innerHTML = updateProdutoComponent(produto);
  }
  else {
    alert('produto não encontrado');
  }

  document.addEventListener('submit', async (event) => {
  if (event.target && event.target.id === 'UpdateForms') {
    event.preventDefault();
    const nome = document.getElementById('title').value.trim();
    const price = parseFloat(document.getElementById('price').value);
    const img = document.getElementById('img').value.trim();
    const desc = document.getElementById('desc').value.trim();

    if (!nome || isNaN(price) || !desc || !img) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    try {
      let updateProduto = await fetch(`https://fakestoreapi.com/products/${id.value}`, {
        method: "PUT",
        body: JSON.stringify({
          title: nome,
          price: price,
          description: desc,
          image: img,
        })
      }).then(res => res.json());

      if (updateProduto) {
        const forms = document.getElementById('forms_update');
        const UpdateForms = document.getElementById('UpdateForms');
        UpdateForms.style.display = 'none';
        forms.style.display = 'none';
        alert('Produto Atualizado com Sucesso!');

      } else {
        alert('Erro ao atualizar o produto.');
      }
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
  }
});
}



async function getCategorias() {
  const select = document.getElementById('select_categoria');
  const categorias = await fetch('https://fakestoreapi.com/products/categories').then(res=>res.json());

  categorias.forEach(Option => {
    let option = document.createElement('option')
    option.value = Option.replace(' ', '_').replace("'", '')
    option.innerText = Option

    select.appendChild(option);
  });
}

async function addProduto(event) {
  const nomeForms = document.getElementById('nomeProduto');
  const descForms = document.getElementById('descricao');
  const imgForms = document.getElementById('imagemProduto');
  const categoriaForms = document.getElementById('select_categoria');
  const precoForms = document.getElementById('preco');

  const nome = nomeForms.value;
  const descricao = descForms.value;
  const img = imgForms.value;
  const categoria = categoriaForms.value;
  const preco = precoForms.value;

  let res = await fetch('https://fakestoreapi.com/products',{
    method:"POST",
    body:JSON.stringify(
      {
        title: nome,
        price: parseFloat(preco).toFixed(2),
        description: descricao,
        image: img,
        category: categoria
      }
    )
  })

  if (res) {
    alert('Produto adicionando com sucesso');
  }
  else {
    alert('Erro, produto não adicionado');
  }
}

getCategorias()