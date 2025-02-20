const headerComponente = () => {
    return `
    <header class="header">
            <img src="../images/logo.svg" alt="Logo" class="header-image">
            <div class="header-buttons">
                <a href="../../index.html" class="header-button">Home</a>
                <a href="./produto.html" class="header-button">Produtos</a>
                <a href="./editar_produto.html" class="header-button">Editar Produtos</a>
                <a href="./usuario.html" class="header-button">Perfil</a>
                <a href="./favoritos.html" class="header-button">Favoritos</a>
                <a href="./carrinho.html" class="header-button">Carrinho</a>
                <a href="./cadastro.html" class="header-button">Cadastro</a>
                <a href="./login.html" class="header-button">Login</a>
            </div>
        </header>`;
};

export default headerComponente;