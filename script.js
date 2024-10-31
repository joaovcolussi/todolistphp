const todoValue = document.getElementById("todoText");
const taskStatus = document.getElementById("taskStatus");
const todoAlert = document.getElementById("Alert");
const todoList = document.getElementById("todo-list");
const inProgressList = document.getElementById("in-progress-list");
const completedList = document.getElementById("completed-list");
const addUpdate = document.getElementById("AddUpdateClick");

let todo = JSON.parse(localStorage.getItem("todo-list")) || [];
let currentEditItemIndex = null;

function CreateToDoItems() {
    if (todoValue.value === "") {
        todoAlert.innerText = "Por favor, insira sua tarefa!";
        todoValue.focus();
        return;
    }

    let isPresent = todo.some(element => element.item === todoValue.value);
    if (isPresent) {
        setAlertMessage("Esse item já está presente na lista!");
        return;
    }

    const selectedStatus = taskStatus.value;
    const itemList = { item: todoValue.value, status: selectedStatus };

    todo.push(itemList);
    setLocalStorage();
    addToList(itemList);
    todoValue.value = "";
    taskStatus.selectedIndex = 0;
    setAlertMessage("Tarefa criada com sucesso!");
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

function ReadToDoItems() {
    todo.forEach(item => addToList(item));
}

ReadToDoItems();

function UpdateToDoItems(e) {
    const itemDiv = e.parentElement.parentElement.querySelector("div");
    todoValue.value = itemDiv.innerText;
    currentEditItemIndex = todo.findIndex(item => item.item === todoValue.value);
    addUpdate.setAttribute("onclick", "UpdateOnSelectionItems()");
    addUpdate.setAttribute("src", "images/save.svg");
    todoValue.focus();
}

function UpdateOnSelectionItems() {
    if (currentEditItemIndex === null) return;

    let updatedItem = {
        item: todoValue.value,
        status: taskStatus.value
    };

    todo[currentEditItemIndex] = updatedItem;
    setLocalStorage();
    clearLists();
    ReadToDoItems();

    addUpdate.setAttribute("onclick", "CreateToDoItems()");
    addUpdate.setAttribute("src", "images/plus.png");
    todoValue.value = "";
    currentEditItemIndex = null;
    setAlertMessage("Tarefa atualizada com sucesso!");
}

function DeleteToDoItems(e) {
    const itemDiv = e.parentElement.parentElement.querySelector("div");
    const deleteValue = itemDiv.innerText;

    if (confirm(`Tem certeza que deseja excluir "${deleteValue}"?`)) {
        todo = todo.filter(item => item.item !== deleteValue);
        setLocalStorage();
        clearLists();
        ReadToDoItems();
        setAlertMessage("Tarefa excluída com sucesso!");
    }
}

function clearLists() {
    todoList.innerHTML = "";
    inProgressList.innerHTML = "";
    completedList.innerHTML = "";
}

function CompletedToDoItems(e) {
    const itemDiv = e.parentElement.querySelector("div");
    const itemText = itemDiv.innerText.trim();
    const item = todo.find(item => item.item === itemText);

    if (item) {
        if (item.status !== "concluido") {
            item.status = "concluido";
            setLocalStorage();
            clearLists();
            ReadToDoItems();
            setAlertMessage("Tarefa marcada como concluída!");
        }
    }
}

function setLocalStorage() {
    localStorage.setItem("todo-list", JSON.stringify(todo));
}

function setAlertMessage(message) {
    todoAlert.innerText = message;
    setTimeout(() => {
        todoAlert.classList.add("toggleMe");
    }, 1000);
}
