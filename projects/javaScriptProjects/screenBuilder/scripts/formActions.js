import { displayMessage, calculateTotalWidth } from './settingsUtils.js';
import { createDivElement, createParagraphElement, createHeaderElement, createListElement, createTableElement } from './elementBuilder.js';

export function addNewElement() {
    const elementType = document.getElementById("elementTypeSelect").value;
    const bgColor = document.getElementById("bgColorInput").value;
    const textColor = document.getElementById("textColorInput").value;
    const width = parseInt(document.getElementById("widthInput").value, 10);
    const height = parseInt(document.getElementById("heightInput").value, 10);
    const padding = parseInt(document.getElementById("paddingInput").value, 10);
    const margin = parseInt(document.getElementById("marginInput").value, 10);
    const border = parseInt(document.getElementById("borderInput").value, 10);
    const borderColor = document.getElementById("borderColorInput").value;
    const borderType = document.getElementById("borderTypeInput").value;
    const text = document.getElementById("textInput").value;
    const textAlignHorizontal = document.getElementById("textAlignHorizontalInput").value;
    const textAlignVertical = document.getElementById("textAlignVerticalInput")?.value;
    const fontStyle = document.getElementById("fontStyleInput").value;
    const fontFamily = document.getElementById("fontFamilySelect").value;
    const listType = document.getElementById("listTypeSelect")?.value;
    const numListItems = parseInt(document.getElementById("numListItems")?.value, 10);
    const headerLevel = document.getElementById("headerLevelSelect")?.value;
    const numRows = parseInt(document.getElementById("numRows")?.value, 10);
    const numCols = parseInt(document.getElementById("numCols")?.value, 10);
    const cellContent = document.getElementById("cellContent")?.value.split(',');
    const cellAlignHorizontal = document.getElementById("cellAlignHorizontalInput")?.value;
    const cellAlignVertical = document.getElementById("cellAlignVerticalInput")?.value;
    const shape = document.getElementById("shapeSelect")?.value || 'rectangle';

    const container = document.getElementById("designArea");
    if (!container) {
        displayMessage("Error: Container element not found.", "error");
        return;
    }

    const viewportWidth = window.innerWidth;
    const totalWidth = calculateTotalWidth({ width, padding, margin, border });

    if (totalWidth > viewportWidth) {
        displayMessage("The size of the element is too big. Please adjust the parameters.", "error");
        return;
    }

    let newElement;

    switch (elementType) {
        case 'div':
            newElement = createDivElement(bgColor, textColor, width, height, padding, margin, border, borderColor, borderType, text, textAlignHorizontal, textAlignVertical, fontStyle, fontFamily, shape);
            break;
        case 'p':
            newElement = createParagraphElement(bgColor, textColor, width, padding, margin, border, borderColor, borderType, text, textAlignHorizontal, fontStyle, fontFamily);
            break
        case 'h':
            newElement = createHeaderElement(bgColor, textColor, width, padding, margin, border, borderColor, borderType, text, textAlignHorizontal, fontStyle, fontFamily, headerLevel);
            break;
        case 'list':
            newElement = createListElement(bgColor, textColor, width, padding, margin, border, borderColor, borderType, text, textAlignHorizontal, fontStyle, fontFamily, listType, numListItems);
            break;
        case 'table':
            newElement = createTableElement(bgColor, textColor, width, height, padding, margin, border, borderColor, borderType, fontStyle, fontFamily, numRows, numCols, cellContent, cellAlignHorizontal, cellAlignVertical);
            break;
        default:
            displayMessage("Unknown element type", "error");
            return;
    }

    container.appendChild(newElement);
    document.querySelector(".form-step.active").classList.remove('active');
    document.getElementById("step1").classList.add('active');
    displayMessage('Element added successfully!');
}
