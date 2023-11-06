
function bodyJsonPessoa() {

    const nome = document.querySelector('#nome').value;
    const email = document.querySelector('#email').value;
    const telefone = document.querySelector('#telefone').value;
    const endereco = document.querySelector('#endereco').value;
    const ativo = document.querySelector('#ativo').checked;

    const pessoa = {
        nome: nome,
        email: email,
        telefone: telefone,
        endereco: endereco,
        ativo: ativo
    };

    // Converte o objeto em JSON
    const pessoaJSON = JSON.stringify(pessoa);

    return pessoaJSON;
}

function redirecionarListagem(){
    window.location.href = './index.html';
}

// Obtém uma referência ao formulário
const form = document.querySelector('#formulario');

// Define o manipulador de evento para o envio do formulário
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    // criar um json na estrutura para enviar ao backend.
    const bodyJson = bodyJsonPessoa();

    const url = `http://localhost:8080/pessoas`;

    // Faz a requisição POST para o endpoint do Spring usando o método fetch
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: bodyJson
    })
        .then(function (response) {
            // Manipula a resposta do servidor em caso de sucesso
            if (response.ok) {
                alert("Dados registrados com sucesso");
                redirecionarListagem();
            } else {
                alert("Erro ao enviar o formulário");
            }
        })
        .catch(function (error) {
            // Manipula erros em caso de falha na requisição
            console.error(error);
        });

});



