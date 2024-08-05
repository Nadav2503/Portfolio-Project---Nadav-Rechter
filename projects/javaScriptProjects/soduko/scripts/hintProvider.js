import SudokuValidator from './sudokuValidator.js';

export function provideHint(sudokuGrid, hintCount, updateHintCount, updateHintButton, showMessage) {
    if (hintCount >= 3) {
        showMessage('No more hints available.');
        updateHintButton(hintCount);
        return;
    }

    const emptyCells = [];
    const incorrectCells = [];


    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cellValue = sudokuGrid.getCellValue(row, col);
            if (cellValue === null && !sudokuGrid.isCellInitiallySet(row, col)) {
                emptyCells.push({ row, col });
            } else if (cellValue !== null && !SudokuValidator.isSudokuCellValid(sudokuGrid, row, col, cellValue)) {
                incorrectCells.push({ row, col });
            }
        }
    }

    let cellToHint;
    if (emptyCells.length > 0) {
        cellToHint = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    } else if (incorrectCells.length > 0) {
        cellToHint = incorrectCells[Math.floor(Math.random() * incorrectCells.length)];
    } else {
        showMessage('No hints available.');
        updateHintButton(hintCount);
        return;
    }

    const { row, col } = cellToHint;

    for (let num = 1; num <= 9; num++) {
        const originalValue = sudokuGrid.getCellValue(row, col);
        sudokuGrid.setCellValue(row, col, num);

        if (SudokuValidator.isSudokuCellValid(sudokuGrid, row, col, num)) {
            sudokuGrid.setCellValue(row, col, num);

            const cellElement = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            const originalColor = cellElement.style.backgroundColor;
            cellElement.textContent = num;
            cellElement.style.backgroundColor = 'blue';
            cellElement.style.color = 'white';

            setTimeout(() => {
                cellElement.style.backgroundColor = originalColor;
                cellElement.style.color = '';
            }, 5000);

            updateHintCount(hintCount + 1);
            updateHintButton(hintCount + 1);
            showMessage(`Hint provided: Cell [${row + 1}, ${col + 1}] should be ${num}.`);
            return;
        }

        sudokuGrid.setCellValue(row, col, originalValue);
    }

    showMessage('Failed to provide a valid hint.');
}

export function updateHintButton(hintCount) {
    const hintButton = document.getElementById('hint-button');
    if (hintCount >= 3) {
        hintButton.disabled = true;
    } else {
        hintButton.disabled = false;
    }
}
