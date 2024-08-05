import { TaskManager } from './taskManager.js';
import { disableUserInteractions, enableUserInteractions } from './utilityFunctions.js';
import { formatDate } from './dateFormatter.js';

const taskManager = new TaskManager();
window.taskManager = taskManager;
window.makeRowEditable = function (taskIndex) {
    const rowElement = document.getElementById("row" + taskIndex);
    if (!rowElement) {
        return;
    }

    const task = taskManager.tasks[taskIndex];
    if (!task) {
        return;
    }

    const { isComplete, id, description, creationDate } = task;

    const updatedRow =
        `<td class="todo-cell">
            <input type="checkbox" ${isComplete ? 'checked' : ''} onclick="taskManager.toggleTaskCompletion(${taskIndex})" />
        </td>
        <td class="todo-cell ${isComplete ? 'completed' : ''}">${isComplete}</td>
        <td class="todo-cell ${isComplete ? 'completed' : ''}">${id}</td>
        <td class="todo-cell ${isComplete ? 'completed' : ''}">
            <input id="editInput${taskIndex}" value="${description}" />
        </td>
        <td class="todo-cell ${isComplete ? 'completed' : ''}">${formatDate(creationDate)}</td>
        <td class="todo-cell">
            <button class="todo-edit" onclick="saveTaskChanges(${taskIndex})">Save</button>
        </td>
        <td class="todo-cell">
            <button class="todo-delete" onclick="showDeleteConfirmation(${taskIndex})">Delete</button>
        </td>`;
    rowElement.innerHTML = updatedRow;
};

window.saveTaskChanges = function (taskIndex) {
    const editInput = document.getElementById("editInput" + taskIndex);
    if (editInput && editInput.value) {
        taskManager.updateTaskDescription(taskIndex, editInput.value);
    }
};

window.showDeleteConfirmation = function (taskIndex) {
    disableUserInteractions();

    const confirmationDialog = document.createElement('div');
    confirmationDialog.className = 'confirmation-dialog';
    confirmationDialog.innerHTML =
        `<p>Are you sure you want to delete this task?</p>
        <div class="confirmation-button-container">
            <button id="confirmYes" class="confirmation-button-yes" onclick="confirmTaskDeletion(${taskIndex})">Yes</button>
            <button id="confirmNo" class="confirmation-button-no" onclick="hideConfirmationDialog()">No</button>
        </div>`;
    document.body.appendChild(confirmationDialog);
};

window.hideConfirmationDialog = function () {
    const dialog = document.querySelector('.confirmation-dialog');
    if (dialog) {
        document.body.removeChild(dialog);
    }
    enableUserInteractions();
};

window.confirmTaskDeletion = function (taskIndex) {
    taskManager.removeTaskByIndex(taskIndex);
    hideConfirmationDialog();
};

window.sortTasksBy = function (column, direction) {
    taskManager.sortTasks(column, direction);
};

document.getElementById('addTaskButton').addEventListener('click', () => {
    const newTaskInput = document.getElementById('newTaskInput');
    if (newTaskInput.value) {
        taskManager.addNewTask(newTaskInput.value);
        newTaskInput.value = '';
    }
});
