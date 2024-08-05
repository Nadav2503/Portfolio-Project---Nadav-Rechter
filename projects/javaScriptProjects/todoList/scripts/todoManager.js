import { Todo } from './todo.js';
import { sortTasks } from './sortTasks.js';
import { formatDate } from './formatDate.js';

export class TodoManager {
    constructor() {
        this.tasks = this.loadTasksFromStorage() || [];
        this.addTasksToScreen();
    }

    addTask(description) {
        const newTask = new Todo(Date.now(), description);
        this.tasks.push(newTask);
        this.saveTasksToStorage();
        this.addTasksToScreen();
    }

    removeTask(index) {
        this.tasks.splice(index, 1);
        this.saveTasksToStorage();
        this.addTasksToScreen();
    }

    updateTask(index, newDescription) {
        this.tasks[index].description = newDescription;
        this.saveTasksToStorage();
        this.addTasksToScreen();
    }

    toggleIsComplete(index) {
        this.tasks[index].isComplete = !this.tasks[index].isComplete;
        this.saveTasksToStorage();
        this.addTasksToScreen();
    }

    sortTasks(property, direction) {
        this.tasks = sortTasks(this.tasks, property, direction);
        this.addTasksToScreen();
    }

    addTasksToScreen() {
        const tableBody = document.getElementById("todoListBody");
        if (!tableBody) {
            console.error('Table body with ID "todoListBody" not found.');
            return;
        }

        tableBody.innerHTML = this.tasks.map((task, index) => {
            const checked = task.isComplete ? 'checked' : '';
            const rowClass = task.isComplete ? 'completed' : '';
            const cellClass = task.isComplete ? 'completed' : '';

            return `
                <tr class="todo-row ${rowClass}" id="row${index}">
                    <td class="todo-cell" data-label="Complete">
                        <input type="checkbox" ${checked} onclick="taskManager.toggleIsComplete(${index})" />
                    </td>
                    <td class="todo-cell ${cellClass}" data-label="Is Complete">${task.isComplete}</td>
                    <td class="todo-cell ${cellClass}" data-label="ID">${task.id}</td>
                    <td class="todo-cell ${cellClass}" data-label="Description">${task.description}</td>
                    <td class="todo-cell ${cellClass}" data-label="Creation Time">${formatDate(task.creationDate)}</td>
                    <td class="todo-cell" data-label="Edit">
                        <button class="todo-edit" onclick="makeRowEditable(${index})">Edit</button>
                    </td>
                    <td class="todo-cell" data-label="Delete">
                        <button class="todo-delete" onclick="confirmDelete(${index})">Delete</button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    saveTasksToStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasksFromStorage() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks).map(task => {
            const t = new Todo(task.id, task.description);
            t.creationDate = new Date(task.creationDate);
            t.isComplete = task.isComplete;
            return t;
        }) : [];
    }
}
