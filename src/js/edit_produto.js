import {CardProduto} from '../componentes/card_produto.js';

const button_add = document.getElementById('button_add');
const button_update = document.getElementById('button_update');
const forms_add = document.getElementById('forms_add');
const forms_update = document.getElementById('forms_update');

button_add.addEventListener('click', forms('forms_add'));
button_update.addEventListener('click', forms('forms_update'));
forms_add.addEventListener('submit', validarForms);
forms_update.addEventListener('submit', validarUpdate);

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

function forms(form) {
  const forms = document.getElementById(`${form}`);
  if(forms.style.display == 'flex'){
    forms.style.display = 'none'
  }
  else {
    forms.style.display = 'flex';
  }
}

async function updateProduto() {
  const id = document.getElementById('id');
  const produto_selecionado = document.getElementById('produto_selecionado');

  try {
    let produto = await fetch(`https://fakestoreapi.com/products/${id.value}`).then(res => res.json());
    produto_selecionado.innerHTML = CardProduto( produto.id, produto.title, produto.price, produto.rating.rate, produto.rating.count, produto.image, true);
  }
  catch {
    alert('Produto não encontrado');
  }

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