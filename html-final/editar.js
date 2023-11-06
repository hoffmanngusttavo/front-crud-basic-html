

// Função para buscar um registro pelo id ao abrir a pagina
function buscarRegistroPorId() {

    const parametros = new URLSearchParams(window.location.search);

    // Recupera os valores dos parâmetros usando get()
    const idPessoa = parametros.get('id');

    const url = `http://localhost:8080/pessoas/${idPessoa}`

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Preenche o formulário com os dados recebidos
            document.querySelector('#id').value = data.id;
            document.querySelector('#nome').value = data.nome;
            document.querySelector('#email').value = data.email;
            document.querySelector('#telefone').value = data.telefone;
            document.querySelector('#endereco').value = data.endereco;
            document.querySelector('#ativo').checked = data.ativo;
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}


function bodyJsonPessoa() {

    const id = document.querySelector('#id').value;
    const nome = document.querySelector('#nome').value;
    const email = document.querySelector('#email').value;
    const telefone = document.querySelector('#telefone').value;
    const endereco = document.querySelector('#endereco').value;
    const ativo = document.querySelector('#ativo').checked;

    const pessoa = {
        id: id,
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
        method: 'PUT',
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


buscarRegistroPorId();




