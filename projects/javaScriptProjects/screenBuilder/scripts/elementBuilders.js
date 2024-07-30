export function buildDivElement(styles, text, shape) {
    const newElement = document.createElement("div");
    newElement.classList.add("shape");
    if (shape) {
        newElement.classList.add(shape.value);
    }
    applyStyles(newElement, styles);
    newElement.innerText = text;
    if (shape === 'circle') {
        newElement.style.borderRadius = '50%';
    } else if (shape === 'diamond') {
        newElement.style.transform = "rotate(45deg)";
        newElement.style.transformOrigin = "center";
        newElement.style.marginLeft = `${styles.width / 2}px`;
        newElement.style.marginTop = `${styles.height / 2}px`;
        newElement.style.marginRight = `${styles.width / 2}px`;
        newElement.style.marginBottom = `${styles.height / 2}px`;
    }
    return newElement;
}

export function buildParagraphElement(styles, text) {
    const newElement = document.createElement("p");
    applyStyles(newElement, styles);
    newElement.innerText = text;
    return newElement;
}

export function buildHeaderElement(styles, text, headerLevel) {
    const newElement = document.createElement(headerLevel);
    applyStyles(newElement, styles);
    newElement.innerText = text;
    newElement.style.width = `${styles.width}px`;
    return newElement;
}

export function buildListElement(styles, text, listType, numListItems) {
    const newElement = document.createElement(listType);
    applyStyles(newElement, styles);
    newElement.style.padding = `${styles.padding}px`;

    for (let i = 0; i < numListItems; i++) {
        const listItem = document.createElement("li");
        listItem.innerText = `${text} ${i + 1}`;
        newElement.appendChild(listItem);
    }
    return newElement;
}

export function buildTableElement(styles, numRows, numCols, cellContent, cellAlignHorizontal, cellAlignVertical) {
    const newElement = document.createElement("table");
    applyStyles(newElement, styles);

    for (let r = 0; r < numRows; r++) {
        const row = document.createElement("tr");
        for (let c = 0; c < numCols; c++) {
            const cell = document.createElement(r === 0 ? "th" : "td");
            const index = r * numCols + c;
            cell.innerText = cellContent[index] || '';
            cell.style.textAlign = cellAlignHorizontal;
            cell.style.verticalAlign = cellAlignVertical;
            applyStyles(cell, styles);
            row.appendChild(cell);
        }
        newElement.appendChild(row);
    }
    return newElement;
}

export function applyStyles(element, styles) {
    element.style.backgroundColor = styles.bgColor;
    element.style.color = styles.textColor;
    element.style.width = `${styles.width}px`;
    element.style.height = `${styles.height}px`;
    element.style.padding = `${styles.padding}px`;
    element.style.margin = `${styles.margin}px`;
    element.style.border = `${styles.border}px ${styles.borderType} ${styles.borderColor}`;
    element.style.textAlign = styles.textAlignHorizontal;
    element.style.verticalAlign = styles.textAlignVertical;
    element.style.fontSize = `${styles.fontSize}px`;
    element.style.fontStyle = styles.fontStyle;
}
