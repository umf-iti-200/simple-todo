const tableBody = document.querySelector("#table-todos tbody");
const formToDo = document.getElementById("form-todo");

async function removeTodo(id) {

    const url = "/api/todos/remove";

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id
        }),
    });

    // If the status code is 200 then the request returned a successful result.
    if (response.status === 200) {
        // Remove what the user typed
        document.getElementById("title").value = "";
        // Reload all the data from the backend
        getData();
    }
}

function appendRow(todo) {

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${todo.id}</td>
        <td>${todo.title}</td>
        <td><button class="btn btn-danger btn-sm btn-remove" onclick="removeTodo(${todo.id})"><i class="bi bi-trash"></i></button></td>
    `;

    tableBody.appendChild(row);
}

function updateTodosTable(todos) {

    tableBody.innerHTML = "";

    for (const todo of todos) {
        appendRow(todo);
    }
}

async function getData() {

    const url = "/api/todos";

    const request = await fetch(url);

    const todos = await request.json();

    updateTodosTable(todos);
}

async function saveToDo(event) {
    // Don't submit the form. We are going to submit the data asynchronously
    event.preventDefault();

    const title = document.getElementById("title").value;

    const url = "/api/todos/save";

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title
        }),
    });

    const data = await response.json();

    // If the status code is 200 then the request returned a successful result.
    if (response.status === 200) {
        // Remove what the user typed
        document.getElementById("title").value = "";
        // Reload all the data from the backend
        getData();
    } else {
        alert(data.message);
    }
}

formToDo.addEventListener("submit", saveToDo);

// Every time the app is loaded, bring all the data from the backend
getData();
