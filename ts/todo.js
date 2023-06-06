"use strict";
exports.__esModule = true;
var todoInput = document.querySelector('.todo_input');
var todoButton = document.querySelector('.todo_button');
var todoList = document.querySelector('.todo_list');
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
document.addEventListener("DOMContentLoaded", getTodos);
function addTodo(event) {
    event.preventDefault();
    var todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    var newTodo = document.createElement('li');
    newTodo.innerHTML = todoInput.value;
    newTodo.classList.add('todo_item');
    todoDiv.appendChild(newTodo);
    saveLocalTodos(todoInput.value);
    var completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="bi bi-check2"></i>';
    completedButton.classList.add('complete_btn');
    todoDiv.appendChild(completedButton);
    var trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="bi bi-trash"></i>';
    trashButton.classList.add('trash_btn');
    todoDiv.appendChild(trashButton);
    todoList.appendChild(todoDiv);
    todoInput.value = '';
}
function deleteCheck(e) {
    var item = e.target;
    if (item.classList[0] === 'trash_btn') {
        var todo_1 = item.parentElement;
        todo_1.classList.add('fall');
        removeLocalTodos(todo_1);
        todo_1.addEventListener('transitionend', function () {
            todo_1.remove();
        });
    }
    if (item.classList[0] === 'complete_btn') {
        var todo = item.parentElement;
        todo.classList.add('completed');
    }
}
function saveLocalTodos(todo) {
    var todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodos() {
    var todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        var todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        var newTodo = document.createElement("li");
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo_item');
        todoDiv.appendChild(newTodo);
        var complateButton = document.createElement('button');
        complateButton.innerHTML = '<i class="fas fa-check"></i>';
        complateButton.classList.add("complate_btn");
        todoDiv.appendChild(complateButton);
        var trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash_btn");
        todoDiv.appendChild(trashButton);
        todoList.appendChild(todoDiv);
    });
}
function removeLocalTodos(todo) {
    var todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    var todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
