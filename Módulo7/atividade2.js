// Função para atualizar a lista de tarefas na tela
function atualizarLista() {
    const listaElement = document.getElementById('tarefa-lista');
    listaElement.innerHTML = ''; 

    // Obtém as tarefas do localStorage ou usa um array vazio caso não haja tarefas armazenadas
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    tarefas.forEach((tarefa, index) => {
        const tarefaElement = document.createElement('div');
        tarefaElement.classList.add('tarefa');

        // Checkbox para marcar a tarefa como concluída
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = tarefa.status;
        checkbox.addEventListener('change', () => alterarStatus(index));

        const descricao = document.createElement('span');
        descricao.classList.add('descricao');
        descricao.classList.add(tarefa.status ? 'concluida' : 'nao-concluida');
        descricao.textContent = tarefa.descricao;

        // Botão para excluir a tarefa
        const excluirBtn = document.createElement('button');
        excluirBtn.classList.add('excluir-btn');
        excluirBtn.textContent = 'Excluir';
        excluirBtn.addEventListener('click', () => excluirTarefa(index));

        // Adiciona o checkbox, descrição e botão de excluir à tarefa
        tarefaElement.appendChild(checkbox);
        tarefaElement.appendChild(descricao);
        tarefaElement.appendChild(excluirBtn);

        // Adiciona a tarefa à lista
        listaElement.appendChild(tarefaElement);
    });
}

// Função para adicionar uma nova tarefa
function adicionarTarefa() {
    const campoTarefa = document.getElementById('campo-tarefa');
    const descricao = campoTarefa.value.trim();

    if (descricao) {
        let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []; // Carrega as tarefas do localStorage
        tarefas.push({
            descricao: descricao,
            status: false // Status inicial como não concluído
        });

        // Salva a nova lista de tarefas no localStorage
        localStorage.setItem('tarefas', JSON.stringify(tarefas));

        atualizarLista();

        // Limpa o campo de texto
        campoTarefa.value = '';
    }
}

// Função para alterar o status de uma tarefa
function alterarStatus(index) {
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    tarefas[index].status = !tarefas[index].status; // Altera o status da tarefa

    // Atualiza a lista no localStorage
    localStorage.setItem('tarefas', JSON.stringify(tarefas));

    // Atualiza a lista de tarefas na tela
    atualizarLista();
}

// Função para excluir uma tarefa
function excluirTarefa(index) {
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    // Remove a tarefa do array
    tarefas.splice(index, 1);

    // Atualiza o localStorage com a lista de tarefas atualizada
    localStorage.setItem('tarefas', JSON.stringify(tarefas));

    // Atualiza a lista de tarefas na tela
    atualizarLista();
}

// Evento de clique para adicionar tarefa
document.getElementById('adicionar-btn').addEventListener('click', adicionarTarefa);

// Evento para pressionar Enter e adicionar a tarefa
document.getElementById('campo-tarefa').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        adicionarTarefa();
    }
});

// Carrega as tarefas do localStorage ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    atualizarLista();
});
