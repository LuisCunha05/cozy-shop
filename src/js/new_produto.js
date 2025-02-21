const button_add = document.getElementById('button_add');
const forms_add = document.getElementById('forms_add');

button_add.addEventListener('click', () => {
  forms_add.style.display = forms_add.style.display == 'flex' ? 'none' : 'flex';
});

forms_add.addEventListener('submit', validarAdd);

function validarAdd(event) {
  event.preventDefault();

  const nomeForms = document.getElementById('nomeProduto').value;
  const descForms = document.getElementById('descricao').value;
  const imgForms = document.getElementById('imagemProduto').value;
  const categoriaForms = document.getElementById('select_categoria').value;
  const precoForms = document.getElementById('preco').value;

  if (!nomeForms || !descForms || !imgForms || !categoriaForms || isNaN(precoForms)) {
    alert('Informações faltantes, por favor verifique o formulário');
  }
  else {
    addProduto(nomeForms, descForms, imgForms, categoriaForms, precoForms);
  }
}

async function addProduto(nome, desc, img, categoria, preco) {

  let res = await fetch('https://fakestoreapi.com/products',{
    method:"POST",
    body:JSON.stringify(
      {
        title: nome,
        price: parseFloat(preco).toFixed(2),
        description: desc,
        image: img,
        category: categoria
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

async function getCategorias() {
  const select = document.getElementById('select_categoria');
  const categorias = await fetch('https://fakestoreapi.com/products/categories').then(res=>res.json());

  categorias.forEach(Option => {
    let option = document.createElement('option');
    option.value = Option.replace(' ', '_').replace("'", '');
    option.innerText = Option;

    select.appendChild(option);
  });
}

getCategorias()