import { TodoManager } from './todoManager.js';
import { disableInteractions, enableInteractions } from './utils.js';
import { formatDate } from './formatDate.js';

// Initialize TodoManager and load existing tasks
const taskManager = new TodoManager();
window.taskManager = taskManager;
window.makeRowEditable = function (index) {
    const rowOnHtml = document.getElementById("row" + index);
    if (!rowOnHtml) {
        console.error(`Element with ID 'row${index}' not found.`);
        return;
    }

    const task = taskManager.tasks[index];
    if (!task) {
        console.error(`Task with index ${index} not found.`);
        return;
    }

    const { isComplete, id, description, creationDate } = task;

    const newRow = `
        <td class="todo-cell">
            <input type="checkbox" ${isComplete ? 'checked' : ''} onclick="taskManager.toggleIsComplete(${index})" />
        </td>
        <td class="todo-cell ${isComplete ? 'completed' : ''}">${isComplete}</td>
        <td class="todo-cell ${isComplete ? 'completed' : ''}">${id}</td>
        <td class="todo-cell ${isComplete ? 'completed' : ''}">
            <input id="editInput${index}" value="${description}" />
        </td>
        <td class="todo-cell ${isComplete ? 'completed' : ''}">${formatDate(creationDate)}</td>
        <td class="todo-cell">
            <button class="todo-edit" onclick="editTask(${index})">Save</button>
        </td>
        <td class="todo-cell">
            <button class="todo-delete" onclick="confirmDelete(${index})">Delete</button>
        </td>
    `;
    rowOnHtml.innerHTML = newRow;
};

window.editTask = function (index) {
    const editInput = document.getElementById("editInput" + index);
    if (editInput && editInput.value) {
        taskManager.updateTask(index, editInput.value);
    }
};

window.confirmDelete = function (index) {
    // Disable interactions with other elements
    disableInteractions();

    // Create and show the confirmation dialog
    const dialog = document.createElement('div');
    dialog.className = 'confirmation-dialog';
    dialog.innerHTML = `
        <p>Are you sure you want to delete this task?</p>
        <div class="confirmation-button-container">
        <button id="confirmYes" class="confirmation-button yes" onclick="deleteTask(${index})">Yes</button>
        <button id="confirmNo" class="confirmation-button no" onclick="closeConfirmation()">No</button>
        </div>
    `;
    document.body.appendChild(dialog);
};

window.closeConfirmation = function () {
    const dialog = document.querySelector('.confirmation-dialog');
    if (dialog) {
        document.body.removeChild(dialog);
    }
    // Re-enable interactions with other elements
    enableInteractions();
};

window.deleteTask = function (index) {
    taskManager.removeTask(index);
    closeConfirmation();
};

window.sortTable = function (column, direction) {
    taskManager.sortTasks(column, direction);
};

// Event listener for adding new tasks
document.getElementById('addTaskBtn').addEventListener('click', () => {
    const newTaskInput = document.getElementById('newTaskInput');
    if (newTaskInput.value) {
        taskManager.addTask(newTaskInput.value);
        newTaskInput.value = '';
    }
});
