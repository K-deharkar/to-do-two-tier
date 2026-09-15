let todos = [];

function addTodo() {

    const input = document.getElementById("todoInput");
    const text = input.value.trim();

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    const todo = {
        id: Date.now(),
        title: text,
        completed: false
    };

    todos.push(todo);

    input.value = "";

    displayTodos();
}

function displayTodos() {

    const todoList = document.getElementById("todoList");

    todoList.innerHTML = "";

    todos.forEach(todo => {

        const li = document.createElement("li");

        li.className = "todo-item";

        if (todo.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${todo.title}</span>

            <div class="todo-actions">

                <button
                    class="complete-btn"
                    onclick="completeTodo(${todo.id})">
                    Complete
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTodo(${todo.id})">
                    Delete
                </button>

            </div>
        `;

        todoList.appendChild(li);
    });
}

function completeTodo(id) {

    const todo = todos.find(todo => todo.id === id);

    if (todo) {
        todo.completed = !todo.completed;
    }

    displayTodos();
}

function deleteTodo(id) {

    todos = todos.filter(todo => todo.id !== id);

    displayTodos();
}