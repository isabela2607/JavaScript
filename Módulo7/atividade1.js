// Função que atualiza a lista de curtidas
function atualizarCurtidas() {
    const resultado = document.getElementById("resultado");
    const pessoas = JSON.parse(localStorage.getItem('pessoas')) || []; // Carrega as pessoas do localStorage
    
    if (pessoas.length === 0) {
        resultado.innerText = "Ninguém curtiu";
    } else if (pessoas.length === 1) {
        resultado.innerText = `${pessoas[0]} curtiu`;
    } else if (pessoas.length === 2) {
        resultado.innerText = `${pessoas[0]} e ${pessoas[1]} curtiram`;
    } else {
        resultado.innerText = `${pessoas[0]}, ${pessoas[1]} e mais ${pessoas.length - 2} pessoas curtiram`;
    }
}

// Função para salva a lista de curtidas no localStorage
function salvarPessoas(pessoas) {
    localStorage.setItem('pessoas', JSON.stringify(pessoas)); // Salva a lista no localStorage
}

// Carregar a lista de curtidas ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    atualizarCurtidas(); // Atualiza o parágrafo com base nos dados do localStorage
});

// Evento de clique no botão "Curtir"
document.getElementById("curtir").addEventListener("click", function() {
    const nome = document.getElementById("nome").value.trim();
    const pessoas = JSON.parse(localStorage.getItem('pessoas')) || []; // Carrega a lista de pessoas

    // Verifica se o campo não está vazio e se o nome já não foi adicionado
    if (nome && !pessoas.includes(nome)) {
        pessoas.push(nome);
        salvarPessoas(pessoas); // Salva a nova lista no localStorage
    }

    // Limpa o campo de texto
    document.getElementById("nome").value = "";

    // Atualiza a lista de curtidas
    atualizarCurtidas();
});

// Evento de clique no botão "Limpar"
document.getElementById("limpar").addEventListener("click", function() {
    localStorage.removeItem('pessoas'); // Remove a lista de pessoas do localStorage
    atualizarCurtidas(); // Atualiza a exibição para "Ninguém curtiu"
});
