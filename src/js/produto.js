const urlParams = new URLSearchParams(window.location.search);
let productId = urlParams.get('id');


async function fetchProductData(productId) {
    try {
      
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const product = await response.json();

      
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-description').textContent = product.description;
        document.getElementById('product-price').textContent = `R$ ${product.price.toFixed(2)}`;

       
        const imagesContainer = document.getElementById('product-images');
        imagesContainer.innerHTML = ''; 

        const imgElement = document.createElement('img');
        imgElement.src = product.image;
        imgElement.alt = `Imagem de ${product.name}`;
        imagesContainer.appendChild(imgElement);

        
        document.getElementById('add-to-favorites').addEventListener('click', () => {
            adicionarFavorito(`${product.id}`);
        });

        
        document.getElementById('go-to-cart').addEventListener('click', () => {
            window.location.href = '/carrinho.html'; 
        });

    } catch (error) {
        console.error('Erro ao recuperar dados do produto:', error);
    }
}


if (productId) {
    fetchProductData(productId);
} else {
    
    document.getElementById('product-id-input').style.display = 'block';

   
    document.getElementById('submitProductId').addEventListener('click', () => {
        productId = document.getElementById('productId').value.trim();

       
        if (productId) {
            fetchProductData(productId);
        } else {
            alert('Por favor, insira um ID válido.');
        }
    });
}
