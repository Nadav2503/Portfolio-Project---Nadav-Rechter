import { showMessage } from './helperFunctions.js';
import * as elementBuilders from './elementBuilders.js';

const shapeSelect = document.getElementById("shapeSelect");

export function addElement() {
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
    const textAlignVertical = document.getElementById("textAlignVerticalInput").value;
    const fontSize = parseInt(document.getElementById("fontSizeInput").value, 10);
    const fontStyle = document.getElementById("fontStyleInput").value;
    const listType = document.getElementById("listTypeSelect")?.value;
    const numListItems = parseInt(document.getElementById("numListItems")?.value, 10);
    const headerLevel = document.getElementById("headerLevelSelect")?.value;
    const numRows = parseInt(document.getElementById("numRows")?.value, 10);
    const numCols = parseInt(document.getElementById("numCols")?.value, 10);
    const cellContent = document.getElementById("cellContent")?.value.split(',');
    const cellAlignHorizontal = document.getElementById("cellAlignHorizontalInput")?.value;
    const cellAlignVertical = document.getElementById("cellAlignVerticalInput")?.value;
    const shape = shapeSelect.value;

    let newElement;
    const container = document.getElementById("emptySpace");
    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;

    const totalWidth = width + (padding * 2) + (margin * 2) + (border * 2);
    const totalHeight = height + (padding * 2) + (margin * 2) + (border * 2);

    if (totalWidth > containerWidth) {
        showMessage('Warning: The element width exceeds the container width.', 'warning');
        return;
    }

    if (totalHeight > containerHeight) {
        showMessage('Warning: The element height exceeds the container height.', 'warning');
        return;
    }

    const styles = {
        bgColor,
        textColor,
        width,
        height,
        padding,
        margin,
        border,
        borderColor,
        borderType,
        textAlignHorizontal,
        textAlignVertical,
        fontSize,
        fontStyle
    };

    switch (elementType) {
        case 'div':
            newElement = elementBuilders.buildDivElement(styles, text, shape);
            break;
        case 'p':
            newElement = elementBuilders.buildParagraphElement(styles, text);
            break;
        case 'h':
            newElement = elementBuilders.buildHeaderElement(styles, text, headerLevel);
            break;
        case 'list':
            newElement = elementBuilders.buildListElement(styles, text, listType, numListItems);
            break;
        case 'table':
            newElement = elementBuilders.buildTableElement(styles, numRows, numCols, cellContent, cellAlignHorizontal, cellAlignVertical);
            break;
        default:
            showMessage("Unknown element type", "error");
            return;
    }

    container.appendChild(newElement);
    document.querySelector(".form-step.active").classList.remove('active');
    document.getElementById("step1").classList.add('active');
    showMessage('Element added successfully!');
}
