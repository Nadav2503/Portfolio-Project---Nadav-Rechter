import { addElement } from './formLogic.js';
import { showSettingsForElementType } from './helperFunctions.js';
import { savePage, loadPage, clearPage } from './localStorage.js';


document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners for form step navigation
    document.querySelectorAll(".next-step").forEach(button => {
        button.addEventListener('click', () => {
            const currentStep = document.querySelector(".form-step.active");
            const nextStepId = button.getAttribute('data-step');
            currentStep.classList.remove('active');
            document.getElementById(`step${nextStepId}`).classList.add('active');
            showSettingsForElementType();  // Update settings visibility when moving to the next step
        });
    });

    document.querySelectorAll(".prev-step").forEach(button => {
        button.addEventListener('click', () => {
            const currentStep = document.querySelector(".form-step.active");
            const prevStepId = button.getAttribute('data-step');
            currentStep.classList.remove('active');
            document.getElementById(`step${prevStepId}`).classList.add('active');
            showSettingsForElementType();  // Update settings visibility when moving to the previous step
        });
    });

    const addBtn = document.getElementById("addBtn");
    const saveBtn = document.getElementById("saveBtn");
    const loadBtn = document.getElementById("loadBtn");
    const clearBtn = document.getElementById("clearBtn");

    addBtn.addEventListener('click', addElement);
    saveBtn.addEventListener('click', savePage);
    loadBtn.addEventListener('click', loadPage);
    clearBtn.addEventListener('click', clearPage);
});
