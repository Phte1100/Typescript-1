"use strict";
console.log("hejhejhej");
class TodoList {
    constructor() {
        this.todos = [];
        this.loadFromLocalStorage();
    }
    addTodo(task, priority) {
        if (task === '' || !['1', '2', '3'].includes(priority)) {
            return false;
        }
        const newTodo = {
            task: task,
            completed: false,
            priority: priority,
        };
        this.todos.push(newTodo);
        this.saveToLocalStorage();
        return true;
    }
    markTodoCompleted(index) {
        if (index >= 0 && index < this.todos.length) {
            this.todos[index].completed = true;
            this.saveToLocalStorage();
        }
    }
    getTodos() {
        return this.todos;
    }
    saveToLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
    loadFromLocalStorage() {
        const data = localStorage.getItem('todos');
        if (data) {
            this.todos = JSON.parse(data);
        }
    }
    clearTodos() {
        this.todos = [];
        this.saveToLocalStorage();
    }
    printUserDetails() {
        const userDetailsDiv = document.getElementById("todoDetails");
        if (userDetailsDiv) {
            userDetailsDiv.innerHTML = '';
            this.todos.forEach(todo => {
                const todoDiv = document.createElement('div');
                todoDiv.innerHTML = `
          <ul>
            <li><strong>Att göra:</strong> ${todo.task}</li>
            <li><strong>Prioritering:</strong> ${todo.priority}</li>
            <li><strong>Genomförd:</strong> ${todo.completed ? "Ja" : "Nej"}</li>
          </ul>
        `;
                userDetailsDiv.appendChild(todoDiv);
            });
        }
    }
}
console.log('domInteractions.ts is loaded');
document.addEventListener('DOMContentLoaded', () => {
    const todoList = new TodoList();
    todoList.printUserDetails();
    console.log("DOM fully loaded and parsed");
    const form = document.getElementById('todoForm');
    console.log('Form:', form);
    const taskInput = document.getElementById('task');
    const priorityInput = document.getElementById('priority');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const added = todoList.addTodo(taskInput.value, priorityInput.value);
        if (added) {
            form.reset();
            todoList.printUserDetails();
        }
        else {
            alert('Ogiltig inmatning. Kontrollera uppgiften och prioritet.');
        }
    });
    const clearTodosButton = document.getElementById('clearTodosButton');
    clearTodosButton.addEventListener('click', () => {
        todoList.clearTodos();
        todoList.printUserDetails();
    });
});
