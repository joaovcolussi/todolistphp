const todoValue = document.getElementById("todoText");
const taskStatus = document.getElementById("taskStatus");
const todoAlert = document.getElementById("Alert");
const todoList = document.getElementById("todo-list");
const inProgressList = document.getElementById("in-progress-list");
const completedList = document.getElementById("completed-list");

async function CreateToDoItems() {
    if (todoValue.value === "") {
        todoAlert.innerText = "Por favor, insira sua tarefa!";
        todoValue.focus();
        return;
    }

    const item = todoValue.value;
    const status = taskStatus.value;

    const response = await fetch("banco.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ item, status }),
    });

    const result = await response.json();
    todoAlert.innerText = result.message;
    todoValue.value = "";
    taskStatus.selectedIndex = 0;
    ReadToDoItems();
}

async function ReadToDoItems() {
    const response = await fetch("banco.php", { method: "GET" });
    const tasks = await response.json();
    clearLists();
    tasks.forEach(addToList);
}

function addToList(item) {
    let li = document.createElement("li");
    const todoItems = `<div title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">${item.item}</div>
                       <div>
                           <img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="images/pencil.svg" />
                           <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="images/delete.svg" />
                       </div>`;
    li.innerHTML = todoItems;

    if (item.status === "a fazer") {
        todoList.appendChild(li);
    } else if (item.status === "em progresso") {
        inProgressList.appendChild(li);
    } else if (item.status === "concluido") {
        completedList.appendChild(li);
    }
}

function clearLists() {
    todoList.innerHTML = "";
    inProgressList.innerHTML = "";
    completedList.innerHTML = "";
}

ReadToDoItems();
