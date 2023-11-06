

// Selecionar todos os botões de remoção pela classe CSS
var botoesRemover = document.querySelectorAll(".btn-remover");


// Adicionar um evento de clique a cada botão de remoção
botoesRemover.forEach(function(botao) {
    botao.addEventListener("click", removerLinha);
});


// Função para remover a linha da tabela
function removerLinha() {

    // Usar um alerta de confirmação
    var confirmacao = confirm("Deseja remover esse registro ?");

    // Verificar se o usuário confirmou
    if (confirmacao) {
        var linha = this.closest("tr"); // Encontra a linha pai do botão clicado
        linha.remove(); // Remove a linha da tabela
        
    }
}
