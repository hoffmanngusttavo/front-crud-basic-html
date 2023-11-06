


// Obtém uma referência ao formulário
const form = document.querySelector('#meuFormulario');

// Define o manipulador de evento para o envio do formulário
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    alert('Dados gravados com sucesso');
});