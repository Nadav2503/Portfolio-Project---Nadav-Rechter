export function displayMessage(message, type = 'info', timeout = 3000) {
    const messageDiv = document.getElementById("messageArea");
    if (!messageDiv) {
        console.error("Element with ID 'messageArea' not found.");
        return;
    }

    messageDiv.innerHTML = `<p class="${type}">${message}</p>`;
    messageDiv.style.display = 'block';

    setTimeout(() => {
        messageDiv.style.display = 'none';
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

export function updateSettingsVisibility() {
    const elementType = document.getElementById("elementTypeSelect").value;
    const settingsSections = {
        list: 'listSettings',
        h: 'headerSettings',
        table: 'tableSettings',
        div: 'shapeSettings',
        p: ['widthInput', 'heightInput']
    };

    Object.values(settingsSections).forEach(sectionId => {
        if (Array.isArray(sectionId)) {
            sectionId.forEach(id => document.getElementById(id).parentElement.classList.add('hidden'));
        } else {
            document.getElementById(sectionId).classList.add('hidden');
        }
    });

    const relevantSettings = settingsSections[elementType];
    if (Array.isArray(relevantSettings)) {
        relevantSettings.forEach(id => document.getElementById(id).parentElement.classList.remove('hidden'));
    } else if (relevantSettings) {
        document.getElementById(relevantSettings).classList.remove('hidden');
    }
}
export function calculateTotalWidth(styles) {
    return styles.width + styles.padding * 2 + styles.margin * 2;
}