// Array para armazenar os nomes
let pessoas = [];

// Função que atualiza a lista de curtidas
function atualizarCurtidas() {
    const resultado = document.getElementById("resultado");
    
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

// Evento de clique no botão "Curtir"
document.getElementById("curtir").addEventListener("click", function() {
    const nome = document.getElementById("nome").value.trim();

    // Verifica se o campo não está vazio e se o nome já não foi adicionado
    if (nome && !pessoas.includes(nome)) {
        pessoas.push(nome);
    }

    // Limpa o campo de texto
    document.getElementById("nome").value = "";
    
    // Atualiza a lista de curtidas
    atualizarCurtidas();

   
});
