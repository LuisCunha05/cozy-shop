/**
 * 
 * @param {{street: string}} address 
 * @returns 
 */
const usuarioComponente = ({email, username, password, name, address, phone}) => {
    return `
        <form name="infoUsuario">
            <div class="containerInput">
                <label for="email">Email: </label>
                <input type="mail" id="email" name="email" value=${email} disabled>
            </div>
            <div class="containerInput">
                <label for="senha">senha: </label>
                <input type="password" id="senha" name="senha" value=${password} >
            </div>
            <div class="containerInput">
                <label for="nome">Nome: </label>
                <input type="text" id="primeiroNome" name="primeiroNome" value=${name.firstname} disabled>
                <input type="text" id="segundoNome" name="ultimoNome" value=${name.lastname}>
            </div>
            <div class="containerInput">
                <label for="usuario">Usuario: </label>
                <input type="text" name="usuario" id="usuario" value=${username}>
            </div>
            <div class="containerInput">
                <label for="telefone">Telefone: </label>
                <input type="tel" name="telefone" id="telefone" value=${phone}>
            </div>
            <div class="containerInput">
                <label for="cidade">Cidade: </label>
                <input type="cidade" name="cidade" id="cidade" value=${address.city}>
            </div>
            <div class="containerInput">
                <label for="rua">Rua: </label>
                <input type="rua" name="rua" id="rua" value="${address.street.split(' ').map(item => {return item.charAt(0).toUpperCase() + item.substring(1)}).join(' ')}">
            </div>
            <div class="containerInput">
                <label for="ruaNumero">Rua Número: </label>
                <input type="ruaNumero" name="ruaNumero" id="ruaNumero" value=${address.number}>
            </div>
            <div class="containerInput">
                <label for="zipcode">Zipcode: </label>
                <input type="zipcode" name="zipcode" id="zipcode" value=${address.zipcode}>
            </div>
            <div class="ctaProdutos">
                <button type="button" id="updateButton">Update User</button>
            </div>
        </form>`;
};

export default usuarioComponente;