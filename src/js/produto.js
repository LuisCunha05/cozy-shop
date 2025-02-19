  // Recupera o parâmetro da URL
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        // Função para buscar o produto via API
        async function fetchProductData(productId) {
            try {
                // Exemplo de chamada à API - substitua pela sua API real
                const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
                const product = await response.json();

                // Exibindo as informações do produto
                document.getElementById('product-name').textContent = product.name;
                document.getElementById('product-description').textContent = product.description;
                document.getElementById('product-price').textContent = `R$ ${product.price.toFixed(2)}`;

                // Exibindo as imagens do produto
                const imagesContainer = document.getElementById('product-images');
                imagesContainer.innerHTML = ''; // Limpar antes de adicionar as imagens
            
                const imgElement = document.createElement('img');
                imgElement.src = product.image;
                imgElement.alt = `Imagem de ${product.name}`;
                imagesContainer.appendChild(imgElement);
                

                // Função para adicionar o produto aos favoritos
                document.getElementById('add-to-favorites').addEventListener('click', () => {
                    adicionarFavorito(product.id)
                });

                // Função para ir ao carrinho
                document.getElementById('go-to-cart').addEventListener('click', () => {
                    window.location.href = '/carrinho.html'; // Substitua com o caminho real da página de carrinho
                });

            } catch (error) {
                console.error('Erro ao recuperar dados do produto:', error);
            }
        }

        // Carregar dados do produto
        if (productId) {
            fetchProductData(productId);
        } else {
            alert('Produto não encontrado!');
        }