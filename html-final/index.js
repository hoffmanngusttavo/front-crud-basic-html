// Função para preencher a tabela com os registros
function preencherTabela(registros) {
    const tabela = document.querySelector('#tabelaRegistros tbody');

    registros.forEach(registro => {
        const row = tabela.insertRow();
        row.dataset.id = registro.id;

        const idCell = row.insertCell();
        idCell.textContent = registro.id;

        const nomeCell = row.insertCell();
        nomeCell.textContent = registro.nome;

        const ativoCell = row.insertCell();
        ativoCell.textContent = registro.ativo ? 'Sim' : 'Não';

        const emailCell = row.insertCell();
        emailCell.textContent = registro.email;

        const telefoneCell = row.insertCell();
        telefoneCell.textContent = registro.telefone;

        const enderecoCell = row.insertCell();
        enderecoCell.textContent = registro.endereco;

        const acoesCell = row.insertCell();
        acoesCell.classList.add('text-center');

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('btn');
        editButton.classList.add('btn-outline-dark');
        editButton.classList.add('me-2');
        editButton.addEventListener('click', () => buscarRegistroPorId(registro.id));
        acoesCell.appendChild(editButton);
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.classList.add('btn');
        deleteButton.classList.add('btn-outline-danger');
        deleteButton.addEventListener('click', () => excluirRegistro(registro.id));
        acoesCell.appendChild(deleteButton);

    });
}


function apagarRegistro(button) {
    var row = button.parentNode.parentNode; // Obtém a linha da tabela

}


// Função para excluir um registro
function excluirRegistro(id) {

    const confirmacao = confirm("Tem certeza que deseja remover este registro?"); // Exibe a caixa de diálogo de confirmação

    if (confirmacao) {

        const url = `http://localhost:8080/pessoas/${id}`

        fetch(url, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    // Registro excluído com sucesso
                    console.log('Registro excluído com sucesso');
                    // Remover a linha da tabela correspondente ao registro excluído
                    const tabela = document.querySelector('#tabelaRegistros');
                    const linha = tabela.querySelector(`tr[data-id="${id}"]`);
                    linha.remove();
                } else {
                    // Ocorreu um erro ao excluir o registro
                    console.error('Erro ao excluir o registro');
                }
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    }
}

// Função para buscar um registro pelo id
function buscarRegistroPorId(id) {

    const url = `http://localhost:8080/pessoas/${id}`

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


function buscarRegistros() {
    // Faz a requisição GET para obter os registros
    const url = `http://localhost:8080/pessoas`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            preencherTabela(data);
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}


// Obtém uma referência ao formulário
const form = document.querySelector('#meuFormulario');

// Define o manipulador de evento para o envio do formulário
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    // Obtém os dados do formulário
    const formData = new FormData(form);

    const url = `http://localhost:8080/pessoas`

    const data = {};

    // Converte os dados do FormData para um objeto JSON
    formData.forEach((value, key) => {
        if (key === 'ativo') {
            value = (value === 'on') ? 'true' : 'false'
        }
        data[key] = value;
    });


    // Faz a requisição POST para o endpoint do Spring usando o método fetch
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(function (response) {
            // Manipula a resposta do servidor em caso de sucesso
            if (response.ok) {
                apagarBodyTabela();
                buscarRegistros();
                limparCamposFormulario();
                alert("Dados registrados com sucesso");
            } else {
                alert("Erro ao enviar o formulário");
            }
        })
        .catch(function (error) {
            // Manipula erros em caso de falha na requisição
            console.error(error);
        });

});


function limparCamposFormulario() {
    const elementos = form.elements;

    for (let i = 0; i < elementos.length; i++) {
        let campo = elementos[i];

        // Limpa o valor do campo
        if (campo.type !== 'hidden') {
            if (campo.type === 'checkbox') {
                campo.checked = false; // Desmarca o checkbox
            } else {
                campo.value = ''; // Limpa o valor do campo
            }
        } else {
            campo.setAttribute('value', ''); // Limpa o valor do campo oculto
        }
    }
}


function apagarBodyTabela() {
    const tabela = document.getElementById('tabelaRegistros');
    const linhas = tabela.getElementsByTagName('tr');

    // Começando de trás para frente para evitar problemas com o deslocamento dos índices
    for (let i = linhas.length - 1; i > 0; i--) {
        tabela.deleteRow(i);
    }
}


buscarRegistros();