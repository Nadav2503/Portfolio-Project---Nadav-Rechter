export function showMessage(message, type = 'info', timeout = 3000) {
    messageContainer.innerHTML = `<p class="${type}">${message}</p>`;
    messageContainer.style.display = 'block'; // Show the message container

    // Hide the message after a specified timeout
    setTimeout(() => {
        messageContainer.style.display = 'none';
        // Show the "Next" button again after hiding the message
        document.querySelectorAll(".next-step").forEach(button => button.classList.remove('hidden'));
    }, timeout);
}

export function hideAllSettings() {
    listSettings.classList.add('hidden');
    headerSettings.classList.add('hidden');
    tableSettings.classList.add('hidden');
    shapeSettings.classList.add('hidden');
    widthInput.parentElement.classList.add('hidden');
    heightInput.parentElement.classList.add('hidden');
}

export function showSettingsForElementType() {
    hideAllSettings();

    const elementType = elementTypeSelect.value;

    switch (elementType) {
        case 'list':
            listSettings.classList.remove('hidden');
            widthInput.parentElement.classList.add('hidden');
            heightInput.parentElement.classList.add('hidden');
            break;
        case 'h':
            headerSettings.classList.remove('hidden');
            widthInput.parentElement.classList.add('hidden');
            heightInput.parentElement.classList.add('hidden');
            break;
        case 'table':
            tableSettings.classList.remove('hidden');
            widthInput.parentElement.classList.remove('hidden');
            heightInput.parentElement.classList.remove('hidden');
            break;
        case 'div':
            shapeSettings.classList.remove('hidden');
            widthInput.parentElement.classList.remove('hidden');
            heightInput.parentElement.classList.remove('hidden');
            break;
        case 'p':
            widthInput.parentElement.classList.remove('hidden');
            heightInput.parentElement.classList.remove('hidden');
            break;
        default:
            showMessage("Unknown element type", "error");
            return;
    }
}