function pegarInput() {
    const formularioLogin = document.getElementById('login');

    const nomeInput = document.getElementById('nomeUser');
    const senhaInput = document.getElementById('senhaUser');

    formularioLogin.addEventListener('submit', function(event) {
        event.preventDefault();

        const nomeUser = nomeInput.value;
        const senhaUser = senhaInput.value;

        
        const useLogin = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/auth/login', {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        username: nomeUser,
                        password: senhaUser
                    })
                });

                if (response.ok) {
                    const json = await response.json();
                    console.log(json);
                    sessionStorage.setItem('userToken', JSON.stringify(json));
                    alert('Deu certo :D');
                } else {
                    const errorText = await response.text();
                    console.error('Erro no login:', errorText);
                    alert('Credenciais incorretas ou outro erro. Tente novamente.');
                }
            } catch (error) {
                console.error('Erro de requisição:', error);
                alert('Ocorreu um erro na comunicação com a API.');
            }
        };

        useLogin();
    });
}
pegarInput();
