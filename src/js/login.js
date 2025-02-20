async function pesquisarUsuarios() {
    const usuarios = await fetch('https://fakestoreapi.com/users')
        .then(resposta => resposta.json());

    return usuarios;
}

async function validarUsuario(usuario) {
    const usuarios = await pesquisarUsuarios();
    const usuarioAutenticado = usuarios.find(user => user.username === usuario);

    if (usuarioAutenticado) {
        return usuarioAutenticado.id;
    } else {
        console.error('Usuário não encontrado :(');
        return null;
    }
}

async function sessionUsuario(usuario, token) {
    sessionStorage.clear();
    const userId = await validarUsuario(usuario);

    if (userId) {
        sessionStorage.setItem('userToken', token);
        sessionStorage.setItem('userId', userId);
        return true;
    } else {
        console.error('Erro ao configurar a sessão: usuário não encontrado :(');
        return false;
    }
}

function pegarInput() {
    const formularioLogin = document.getElementById('login');
    const nomeInput = document.getElementById('nomeUser');
    const senhaInput = document.getElementById('senhaUser');

    formularioLogin.addEventListener('submit', function(event) {
        event.preventDefault();

        const usuario = nomeInput.value;
        const senha = senhaInput.value;

        const useLogin = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/auth/login', {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        username: usuario,
                        password: senha
                    })
                });

                if (response.ok) {
                    const json = await response.json();
                    const token = json.token;
                    console.log(token);
                    sessionStorage.setItem('userToken', token);

                    alert('Deu certo :D');

                    const sessionResult = await sessionUsuario(usuario, token);

                    if (sessionResult) {
                        window.location.href = 'index.html';
                    } else {
                        alert('Falha ao configurar a sessão. Tente novamente.');
                    }

                } else {
                    const errorText = await response.text();
                    console.error('Erro no login:', errorText);
                    alert('Credenciais incorretas, ou outro erro :(');
                }
            } catch (error) {
                console.error('Erro de requisição:', error);
                alert('Erro de comunicação com a API :(');
            }
        };
        useLogin();
    });
}
pegarInput();
