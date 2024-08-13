export function createDivElement(bgColor, textColor, width, height, padding, margin, border, borderColor, borderType, text, textAlignHorizontal, textAlignVertical, fontStyle, fontFamily, shape) {
    const newElement = document.createElement("div");
    newElement.classList.add("shape");
    if (shape) {
        newElement.classList.add(shape);
    }
    newElement.style.backgroundColor = bgColor;
    newElement.style.color = textColor;
    newElement.style.width = `${width}px`;
    newElement.style.height = `${height}px`;
    newElement.style.padding = `${padding}px`;
    newElement.style.margin = `${margin}px`;
    newElement.style.border = `${border}px ${borderType} ${borderColor}`;
    newElement.style.textAlign = textAlignHorizontal;
    newElement.style.verticalAlign = textAlignVertical;
    newElement.style.fontStyle = fontStyle;
    newElement.style.fontFamily = fontFamily;
    newElement.innerText = text;
    newElement.style.overflowWrap = 'break-word';
    newElement.style.overflow = 'hidden';

    if (shape === 'circle') {
        newElement.style.borderRadius = '50%';
    } else if (shape === 'diamond') {
        newElement.style.transform = "rotate(45deg)";
        newElement.style.transformOrigin = "center";
        newElement.style.marginLeft = `${width / 2}px`;
        newElement.style.marginTop = `${height / 2}px`;
        newElement.style.marginRight = `${width / 2}px`;
        newElement.style.marginBottom = `${height / 2}px`;
    }
    return newElement;
}

export function createParagraphElement(bgColor, textColor, width, padding, margin, border, borderColor, borderType, text, textAlignHorizontal, fontStyle, fontFamily) {
    const newElement = document.createElement("p");
    newElement.style.backgroundColor = bgColor;
    newElement.style.color = textColor;
    newElement.style.width = `${width}px`;
    newElement.style.padding = `${padding}px`;
    newElement.style.margin = `${margin}px`;
    newElement.style.border = `${border}px ${borderType} ${borderColor}`;
    newElement.style.textAlign = textAlignHorizontal;
    newElement.style.fontStyle = fontStyle;
    newElement.style.fontFamily = fontFamily;
    newElement.style.overflowWrap = 'break-word';
    newElement.style.overflow = 'hidden';
    newElement.innerText = text;
    return newElement;
}

export function createHeaderElement(bgColor, textColor, width, padding, margin, border, borderColor, borderType, text, textAlignHorizontal, fontStyle, fontFamily, headerLevel) {
    const newElement = document.createElement(headerLevel);
    newElement.style.backgroundColor = bgColor;
    newElement.style.color = textColor;
    newElement.style.width = `${width}px`;
    newElement.style.padding = `${padding}px`;
    newElement.style.margin = `${margin}px`;
    newElement.style.border = `${border}px ${borderType} ${borderColor}`;
    newElement.style.textAlign = textAlignHorizontal;
    newElement.style.fontStyle = fontStyle;
    newElement.style.fontFamily = fontFamily;
    newElement.style.overflowWrap = 'break-word';
    newElement.style.overflow = 'hidden';
    newElement.innerText = text;
    return newElement;
}

export function createListElement(bgColor, textColor, width, padding, margin, border, borderColor, borderType, text, textAlignHorizontal, fontStyle, fontFamily, listType, numListItems) {
    const newElement = document.createElement(listType);
    newElement.style.backgroundColor = bgColor;
    newElement.style.color = textColor;
    newElement.style.width = `${width}px`;
    newElement.style.padding = `${padding}px`;
    newElement.style.margin = `${margin}px`;
    newElement.style.border = `${border}px ${borderType} ${borderColor}`;
    newElement.style.textAlign = textAlignHorizontal;
    newElement.style.fontStyle = fontStyle;
    newElement.style.fontFamily = fontFamily;
    newElement.style.overflowWrap = 'break-word';
    newElement.style.overflow = 'hidden';

    for (let i = 0; i < numListItems; i++) {
        const listItem = document.createElement("li");
        listItem.innerText = `${text} ${i + 1}`;
        newElement.appendChild(listItem);
    }
    return newElement;
}

export function createTableElement(bgColor, textColor, width, height, padding, margin, border, borderColor, borderType, fontStyle, fontFamily, numRows, numCols, cellContent, cellAlignHorizontal, cellAlignVertical) {
    const newElement = document.createElement("table");
    newElement.style.backgroundColor = bgColor;
    newElement.style.color = textColor;
    newElement.style.width = `${width}px`;
    newElement.style.height = `${height}px`;
    newElement.style.padding = `${padding}px`;
    newElement.style.margin = `${margin}px`;
    newElement.style.border = `${border}px ${borderType} ${borderColor}`;
    newElement.style.fontStyle = fontStyle;
    newElement.style.fontFamily = fontFamily;
    newElement.style.overflowWrap = 'break-word';
    newElement.style.overflow = 'hidden';

    for (let r = 0; r < numRows; r++) {
        const row = document.createElement("tr");
        for (let c = 0; c < numCols; c++) {
            const cell = document.createElement(r === 0 ? "th" : "td");
            const index = r * numCols + c;
            cell.innerText = cellContent[index] || '';
            cell.style.textAlign = cellAlignHorizontal;
            cell.style.verticalAlign = cellAlignVertical;
            cell.style.backgroundColor = bgColor;
            cell.style.color = textColor;
            cell.style.overflowWrap = 'break-word';
            cell.style.overflow = 'hidden';
            applyStyles(cell, { padding, margin, border, borderColor, borderType, fontStyle, fontFamily });
            row.appendChild(cell);
        }
        newElement.appendChild(row);
    }
    return newElement;
}

