// Select elements
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Get todo list from local storage
let todoListArray = JSON.parse(localStorage.getItem('todoList')) || [];

// Render todo list
renderTodoList();

// Add event listener to add button
addBtn.addEventListener('click', addTask);

// Function to add task
function addTask() {
    const task = taskInput.value.trim();
    if (task) {
        const newTask = {
            text: task,
            completed: false,
            editing: false
        };
        todoListArray.push(newTask);
        localStorage.setItem('todoList', JSON.stringify(todoListArray));
        renderTodoList();
        taskInput.value = '';
    }
}

// Function to render todo list
function renderTodoList() {
    todoList.innerHTML = '';
    todoListArray.forEach((task, index) => {
        const taskHTML = `
            <li>
                <input type="checkbox" onchange="completeTask(${index})" ${task.completed ? 'checked' : ''}>
                <span ${task.completed ? 'class="completed"' : ''}>${task.text}</span>
                <button class="edit-btn" onclick="editTask(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            </li>
        `;
        todoList.insertAdjacentHTML('beforeend', taskHTML);
    });
}

// Function to complete task
function completeTask(index) {
    todoListArray[index].completed = !todoListArray[index].completed;
    localStorage.setItem('todoList', JSON.stringify(todoListArray));
    renderTodoList();
}

// Function to edit task
function editTask(index) {
    const taskLi = todoList.children[index];
    const taskSpan = taskLi.querySelector('span');
    const taskText = taskSpan.textContent;
    taskSpan.innerHTML = `
        <input type="text" value="${taskText}">
    `;
    taskLi.classList.add('editing');
    const editInput = taskLi.querySelector('input[type="text"]');
    editInput.focus();
    editInput.addEventListener('blur', () => {
        todoListArray[index].text = editInput.value;
        localStorage.setItem('todoList', JSON.stringify(todoListArray));
        renderTodoList();
    });
}

// Function to delete task
function deleteTask(index) {
    todoListArray.splice(index, 1);
    localStorage.setItem('todoList', JSON.stringify(todoListArray));
    renderTodoList();
}