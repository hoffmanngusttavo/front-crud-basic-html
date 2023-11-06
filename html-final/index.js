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
        editButton.addEventListener('click', () => redirecionarEdicao(registro.id));
        acoesCell.appendChild(editButton);
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.classList.add('btn');
        deleteButton.classList.add('btn-outline-danger');
        deleteButton.addEventListener('click', () => excluirRegistro(registro.id));
        acoesCell.appendChild(deleteButton);

    });
}



// Função para redirecionar para edição
function redirecionarEdicao(id) {
    window.location.href = './editar.html?id='+id;
}


// Função para excluir um registro
function excluirRegistro(id) {

    // Exibe a caixa de diálogo de confirmação
    const confirmacao = confirm("Tem certeza que deseja remover este registro?"); 

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



buscarRegistros();