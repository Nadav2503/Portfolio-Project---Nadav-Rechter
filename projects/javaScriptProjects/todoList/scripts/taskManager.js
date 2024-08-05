import { TodoItem } from './todoItem.js';
import { sortTasks } from './taskSorter.js';
import { formatDate } from './dateFormatter.js';

export class TaskManager {
    constructor() {
        this.tasks = this.loadTasksFromStorage() || [];
        this.updateTasksDisplay();
    }

    addNewTask(description) {
        const newTask = new TodoItem(Date.now(), description);
        this.tasks.push(newTask);
        this.saveTasksToStorage();
        this.updateTasksDisplay();
    }

    removeTaskByIndex(index) {
        this.tasks.splice(index, 1);
        this.saveTasksToStorage();
        this.updateTasksDisplay();
    }

    updateTaskDescription(index, newDescription) {
        this.tasks[index].description = newDescription;
        this.saveTasksToStorage();
        this.updateTasksDisplay();
    }

    toggleTaskCompletion(index) {
        this.tasks[index].isComplete = !this.tasks[index].isComplete;
        this.saveTasksToStorage();
        this.updateTasksDisplay();
    }

    sortTasks(property, direction) {
        this.tasks = sortTasks(this.tasks, property, direction);
        this.updateTasksDisplay();
    }

    updateTasksDisplay() {
        const tableBody = document.getElementById("todoTableBody");
        if (!tableBody) {
            return;
        }

        tableBody.innerHTML = this.tasks.map((task, index) => {
            const checked = task.isComplete ? 'checked' : '';
            const rowClass = task.isComplete ? 'completed' : '';
            const cellClass = task.isComplete ? 'completed' : '';

            return `<tr class="todo-row ${rowClass}" id="row${index}">
                <td class="todo-cell" data-label="Complete">
                    <input type="checkbox" ${checked} onclick="taskManager.toggleTaskCompletion(${index})" />
                </td>
                <td class="todo-cell ${cellClass}" data-label="Is Complete">${task.isComplete}</td>
                <td class="todo-cell ${cellClass}" data-label="ID">${task.id}</td>
                <td class="todo-cell ${cellClass}" data-label="Description">${task.description}</td>
                <td class="todo-cell ${cellClass}" data-label="Creation Time">${formatDate(task.creationDate)}</td>
                <td class="todo-cell" data-label="Edit">
                    <button class="todo-edit" onclick="makeRowEditable(${index})">Edit</button>
                </td>
                <td class="todo-cell" data-label="Delete">
                    <button class="todo-delete" onclick="showDeleteConfirmation(${index})">Delete</button>
                </td>
            </tr>`;
        }).join('');
    }

    saveTasksToStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasksFromStorage() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks).map(task => {
            const t = new TodoItem(task.id, task.description);
            t.creationDate = new Date(task.creationDate);
            t.isComplete = task.isComplete;
            return t;
        }) : [];
    }
}
