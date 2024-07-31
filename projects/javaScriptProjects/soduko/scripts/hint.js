import Validator from './validator.js';

export function provideHint(sudokuGrid, hintCount, updateHintCount, updateHintButton, showMessage) {
    if (hintCount >= 3) {
        showMessage('No more hints available.');
        updateHintButton(hintCount);
        return;
    }

    const emptyCells = [];
    const incorrectCells = [];

    // Collect empty cells and incorrect cells
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cellValue = sudokuGrid.getCell(row, col);
            if (cellValue === null && !sudokuGrid.isInitialCell(row, col)) {
                emptyCells.push({ row, col });
            } else if (cellValue !== null && !Validator.isCellValid(sudokuGrid, row, col, cellValue)) {
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

    // Iterate over possible numbers to find a valid hint
    for (let num = 1; num <= 9; num++) {
        const originalValue = sudokuGrid.getCell(row, col); // Save the current value
        sudokuGrid.setCell(row, col, num); // Temporarily set the cell to the current number

        if (Validator.isCellValid(sudokuGrid, row, col, num)) {
            sudokuGrid.setCell(row, col, num);

            const cellElement = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            const originalColor = cellElement.style.backgroundColor; // Store the original background color
            cellElement.textContent = num;
            cellElement.style.backgroundColor = 'blue';
            cellElement.style.color = 'white'; // Optional: Change text color for better visibility

            // Reset the background color after 5 seconds
            setTimeout(() => {
                cellElement.style.backgroundColor = originalColor;
                cellElement.style.color = ''; // Optionally reset text color
            }, 5000);

            updateHintCount(hintCount + 1);
            updateHintButton(hintCount + 1);
            showMessage(`Hint provided: Cell [${row + 1}, ${col + 1}] should be ${num}.`);
            return;
        }

        // Reset the cell to its original state
        sudokuGrid.setCell(row, col, originalValue);
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
