import { displayMessage } from './settingsUtils.js';

export function saveCurrentPage() {
    const emptySpace = document.getElementById("designArea");
    const serializedElements = [];

    emptySpace.querySelectorAll('*').forEach(element => {
        serializedElements.push(element.outerHTML);
    });

    localStorage.setItem('savedPage', JSON.stringify(serializedElements));
    displayMessage('Page saved successfully!');
}

export function loadSavedPage() {
    const savedPage = localStorage.getItem('savedPage');
    if (!savedPage) {
        displayMessage('No saved page found.', 'error');
        return;
    }

    const emptySpace = document.getElementById("designArea");
    emptySpace.innerHTML = '';

    const elements = JSON.parse(savedPage);

    elements.forEach(html => {
        const temp = document.createElement('div');
        temp.innerHTML = html.trim();
        emptySpace.appendChild(temp.firstChild);
    });

    displayMessage('Page loaded successfully!');
}

export function clearCurrentPage() {
    document.getElementById("designArea").innerHTML = '';
    displayMessage('Page cleared successfully!', 'info');
}