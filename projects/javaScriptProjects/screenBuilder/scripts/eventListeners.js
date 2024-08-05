import { addNewElement } from './formActions.js';
import { updateSettingsVisibility } from './settingsUtils.js';
import { saveCurrentPage, loadSavedPage, clearCurrentPage } from './localStorageUtils.js';

document.addEventListener('DOMContentLoaded', initializeEventListeners);

function initializeEventListeners() {
    document.querySelectorAll(".navigate-button").forEach(button => {
        button.addEventListener('click', () => {
            const currentStep = document.querySelector(".form-step.active");
            const nextStepId = button.getAttribute('data-step');
            if (currentStep && nextStepId) {
                currentStep.classList.remove('active');
                const nextStep = document.getElementById(`step${nextStepId}`);
                if (nextStep) {
                    nextStep.classList.add('active');
                    updateSettingsVisibility();
                }
            }
        });
    });

    const addElementButton = document.getElementById("addElementButton");
    if (addElementButton) {
        addElementButton.addEventListener('click', addNewElement);
    }


    const savePageButton = document.getElementById("savePageButton");
    const loadPageButton = document.getElementById("loadPageButton");
    const clearPageButton = document.getElementById("clearPageButton");

    if (savePageButton) {
        savePageButton.addEventListener('click', saveCurrentPage);
    }
    if (loadPageButton) {
        loadPageButton.addEventListener('click', loadSavedPage);
    }
    if (clearPageButton) {
        clearPageButton.addEventListener('click', clearCurrentPage);
    }
}
