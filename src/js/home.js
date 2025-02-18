import componenteCategoria from '../componentes/componenteCategoria.js';
import componenteProduto from '../componentes/componenteProduto.js';

const productList = document.getElementById("product-list");
const categoryContainer = document.getElementById("category-container");
const categorySelect = document.getElementById("category-select");

async function loadCategories() {
    const response = await fetch("https://fakestoreapi.com/products/categories");
    const categories = await response.json();
  
    const categoryHtml = componenteCategoria({
      categories,
      onSelectCategory: (event) => loadProducts(event.target.value),
    });
    
    categoryContainer.innerHTML = categoryHtml;
  
   
    const categorySelect = document.getElementById("category-select");
    categorySelect.addEventListener("change", (event) => {
      const category = event.target.value;
      loadProducts(category);
    });
  }
  

async function loadProducts(category = "") {
  let url = "https://fakestoreapi.com/products";
  if (category) {
    url += `/category/${category}`;
  }

  const response = await fetch(url);
  const products = await response.json();

  productList.innerHTML = "";

  if (products.length === 0) {
    const noProductsMessage = document.createElement("p");
    noProductsMessage.classList.add("no-products-message");
    noProductsMessage.textContent = "Nenhum produto encontrado.";
    productList.appendChild(noProductsMessage);
  } else {
    
    products.forEach((product) => {
      const productHtml = componenteProduto({
        title: product.title,
        image: product.image,
        price: product.price,
        id: product.id
      });

      productList.innerHTML += productHtml;
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadCategories();
  loadProducts(); 
});



categorySelect.addEventListener("change", (event) => {
  const category = event.target.value;
  loadProducts(category);
});
