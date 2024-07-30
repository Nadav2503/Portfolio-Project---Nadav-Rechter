import { showMessage } from './helperFunctions.js';

export function savePage() {
    const emptySpace = document.getElementById("emptySpace");
    const serializedElements = [];

    emptySpace.querySelectorAll('*').forEach(element => {
        serializedElements.push(element.outerHTML);
    });

    localStorage.setItem('savedPage', JSON.stringify(serializedElements));
    showMessage('Page saved successfully!');
}

export function loadPage() {
    const savedPage = localStorage.getItem('savedPage');
    if (!savedPage) {
        showMessage('No saved page found.', 'error');
        return;
    }

    const emptySpace = document.getElementById("emptySpace");
    emptySpace.innerHTML = '';  // Clear the existing content

    const elements = JSON.parse(savedPage);

    elements.forEach(html => {
        const temp = document.createElement('div');
        temp.innerHTML = html.trim();
        emptySpace.appendChild(temp.firstChild);
    });

    showMessage('Page loaded successfully!');
}

export function clearPage() {
    document.getElementById("emptySpace").innerHTML = '';
    showMessage('Page cleared successfully!');
}
