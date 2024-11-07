<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Aplicativo de Tarefas</title>
    <link rel="stylesheet" href="style.css" />
</head>
<body>
    <div class="container">
        <div class="todo-header">
            <h2>Lista de Tarefas</h2>
            <img src="images/notebook.svg" height="50px" />
        </div>
        <div class="todo-body">
            <input
                type="text"
                id="todoText"
                class="todo-input"
                placeholder="Adicione sua tarefa"
            />
            <select id="taskStatus">
                <option value="a fazer">A Fazer</option>
                <option value="em progresso">Em Progresso</option>
                <option value="concluido">Concluído</option>
            </select>
            <img
                src="images/plus.png"
                alt="Adicionar"
                id="AddUpdateClick"
                onclick="CreateToDoItems();"
            />
        </div>
        <h5 id="Alert"></h5>
        <div class="todo-sections">
            <h3>A Fazer</h3>
            <ul id="todo-list" class="list-items"></ul>
            <h3>Em Progresso</h3>
            <ul id="in-progress-list" class="list-items"></ul>
            <h3>Concluído</h3>
            <ul id="completed-list" class="list-items"></ul>
        </div>
    </div>
    <script type="text/javascript" src="script.js"></script>
</body>
</html>
