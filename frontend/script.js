const API_URL = "http://16.192.171.239:8000";

document.addEventListener("DOMContentLoaded", fetchTodos);

async function fetchTodos() {
    const res = await fetch(`${API_URL}/todos`);
    const todos = await res.json();
    displayTodos(todos);
}

async function addTodo() {
    const input = document.getElementById("todoInput");
    const text = input.value.trim();

    if (!text) {
        alert("Please enter a task.");
        return;
    }

    await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: text })
    });

    input.value = "";
    fetchTodos();
}

function displayTodos(todos) {
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = "";

    todos.forEach(todo => {
        const li = document.createElement("li");
        li.className = "todo-item" + (todo.completed ? " completed" : "");

        li.innerHTML = `
            <span>${todo.title}</span>
            <div class="todo-actions">
                <button class="complete-btn" onclick="completeTodo(${todo.id})">
                    ${todo.completed ? "Undo" : "Complete"}
                </button>
                <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
            </div>
        `;
        todoList.appendChild(li);
    });
}

async function completeTodo(id) {
    await fetch(`${API_URL}/todos/${id}`, { method: "PUT" });
    fetchTodos();
}

async function deleteTodo(id) {
    await fetch(`${API_URL}/todos/${id}`, { method: "DELETE" });
    fetchTodos();
}
