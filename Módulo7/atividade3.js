// Função para buscar usuários no GitHub
function buscarUsuarios() {
    
    // Pega o valor do campo de pesquisa
    const pesquisa = document.getElementById('campo-busca').value.trim();
    
    // Limpa os resultados anteriores
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = '';

    // Verifica se o campo de pesquisa não está vazio
    if (!pesquisa) {
        resultadosDiv.innerHTML = '<p class="sem-resultados">Por favor, digite um nome para buscar.</p>';
        return;
    }

    // Fazendo a requisição para a API do GitHub fornecida
    fetch('https://api.github.com/search/users?q=' + pesquisa)
        .then(function(resposta) {
            return resposta.json(); 
        })
        .then(function(dados) {

            // Verifica se existem itens na resposta
            if (dados.items && dados.items.length > 0) {
                // Para cada usuário encontrado, cria um item na lista
                dados.items.forEach(function(usuario) {
                    // Cria um novo elemento para exibir o usuário
                    const itemUsuario = document.createElement('div');
                    itemUsuario.classList.add('item-usuario'); 

                    // Adiciona a imagem do avatar do usuário e o nome
                    itemUsuario.innerHTML = `
                        <img src="${usuario.avatar_url}" alt="${usuario.login}">
                        <a href="${usuario.html_url}" target="_blank">${usuario.login}</a>
                    `;

                    // Adiciona o item à lista de resultados
                    resultadosDiv.appendChild(itemUsuario);
                });
            } else {
                // Caso não encontre usuários, exibe uma mensagem
                resultadosDiv.innerHTML = '<p class="sem-resultados">Não foram encontrados usuários para esta pesquisa.</p>';
            }
        })
}

// Evento para clicar no botão de busca
document.getElementById('botao-buscar').addEventListener('click', buscarUsuarios);

//Pressionar Enter e buscar
document.getElementById('campo-busca').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        buscarUsuarios();
    }
});
