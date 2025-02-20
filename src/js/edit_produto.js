import {updateProdutoComponent} from '../componentes/update_produto.js';
import {deleteProdutoComponent} from '../componentes/delete_produto.js';

const button_add = document.getElementById('button_add');
const button_update = document.getElementById('button_update');
const button_delete = document.getElementById('button_delete');
const forms_add = document.getElementById('forms_add');
const forms_update = document.getElementById('forms_update');
const forms_delete = document.getElementById('forms_delete');


button_add.addEventListener('click', () => {
  forms_add.style.display = forms_add.style.display == 'flex' ? 'none' : 'flex';
});

button_update.addEventListener('click', () => {
  forms_update.style.display = forms_update.style.display == 'flex' ? 'none' : 'flex';
});

button_delete.addEventListener('click', () => {
  forms_delete.style.display = forms_delete.style.display == 'flex' ? 'none' : 'flex';
})

forms_add.addEventListener('submit', validarForms);
forms_update.addEventListener('submit', validarUpdate);
forms_delete.addEventListener('submit', validarDelete);

function validarUpdate(event) {
  event.preventDefault();
  
  const id = document.getElementById('id');

  if (id.value == '' || id.value == null) {
    alert('Informações faltantes, por favor verifique o formulário');
  }
  else {
   updateProduto();
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

  if (!nomeForms.value || !descForms.value || !imgForms.value || !categoriaForms.value || isNaN(precoForms.value)) {
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
  document.getElementById('cancelar_deletar_produto').addEventListener('click', () => {
    alert('Cancelado');
    location.reload();
  });
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
    const nome = document.getElementById('title').value;
    const price = parseFloat(document.getElementById('price').value);
    const img = document.getElementById('img').value;
    const desc = document.getElementById('desc').value;

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
        location.reload();
        alert('Produto Atualizado com Sucesso!');

      } else {
        location.reload();
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

async function addProduto() {
  const nomeForms = document.getElementById('nomeProduto').value;
  const descForms = document.getElementById('descricao').value;
  const imgForms = document.getElementById('imagemProduto').value;
  const categoriaForms = document.getElementById('select_categoria').value;
  const precoForms = document.getElementById('preco').value;

  let res = await fetch('https://fakestoreapi.com/products',{
    method:"POST",
    body:JSON.stringify(
      {
        title: nomeForms,
        price: parseFloat(precoForms).toFixed(2),
        description: descForms,
        image: imgForms,
        category: categoriaForms
      }
    )
  })

  if (res) {
    alert('Produto adicionando com sucesso');
    location.reload();
  }
  else {
    alert('Erro, produto não adicionado');
  }
}

getCategorias()