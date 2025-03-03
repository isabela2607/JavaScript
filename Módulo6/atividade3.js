// Array para armazenar as tarefas
let tarefas = [];

// Função para atualizar a lista de tarefas na tela
function atualizarLista() {
    const listaElement = document.getElementById('tarefa-lista');
    listaElement.innerHTML = ''; 

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

        // Adiciona o checkbox e a descrição à tarefa
        tarefaElement.appendChild(checkbox);
        tarefaElement.appendChild(descricao);

        // Adiciona a tarefa à lista
        listaElement.appendChild(tarefaElement);
    });
}

// Função para adicionar uma nova tarefa
function adicionarTarefa() {
    const campoTarefa = document.getElementById('campo-tarefa');
    const descricao = campoTarefa.value.trim();

    if (descricao) {
        tarefas.push({
            descricao: descricao,
            status: false // Status inicial como não concluído
        });

        atualizarLista();

        // Limpa o campo de texto
        campoTarefa.value = '';
    }
}

// Função para alterar o status de uma tarefa
function alterarStatus(index) {
    tarefas[index].status = !tarefas[index].status;

    // Atualiza a lista na tela
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
