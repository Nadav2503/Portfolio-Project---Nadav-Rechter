import Validator from './validator.js';

export function renderBoard(board, container, editable = false) {
    container.innerHTML = ''; // Clear existing content

    // Closure to retain reference to sudokuGrid
    function handleCellInput(event) {
        const cell = event.target;
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        const value = cell.textContent.trim();

        if (/^[1-9]$/.test(value)) {
            board.setCell(row, col, parseInt(value)); // Use board instead of sudokuGrid
        } else {
            board.setCell(row, col, null);
            cell.textContent = '';
        }
    }

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.dataset.row = row;
            cell.dataset.col = col;
            const value = board.getCell(row, col);
            cell.textContent = value !== null ? value : '';

            if (board.isInitialCell(row, col)) {
                cell.contentEditable = false; // Make it read-only
                cell.classList.add('initial-cell'); // Optional: Add a specific class
            } else {
                cell.contentEditable = editable; // Set editable based on the parameter
                if (editable) {
                    cell.addEventListener('input', handleCellInput);
                } else {
                    cell.removeEventListener('input', handleCellInput); // Remove event listener if not editable
                }
            }

            if (row % 3 === 2 && row < 8) {
                cell.style.borderBottom = '2px solid #000';
            }
            if (col % 3 === 2 && col < 8) {
                cell.style.borderRight = '2px solid #000';
            }

            container.appendChild(cell);
        }
    }
}

export function checkBoard(board, showMessage) {
    const isValid = Validator.validateBoard(board);
    const cells = document.querySelectorAll('.grid-cell');

    if (isValid) {
        showMessage('Puzzle is correctly filled!');
        cells.forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            const value = board.getCell(row, col);
            if (value !== null && Validator.isCellValid(board, row, col, value)) {
                cell.style.backgroundColor = 'lightgreen'; // Highlight correct cells
                cell.style.color = 'black'; // Reset text color to black
            } else {
                cell.style.backgroundColor = ''; // Reset background color for correct cells
                cell.style.color = 'black'; // Reset text color to black
            }
        });
    } else {
        showMessage('Puzzle is not correctly filled. Incorrect cells are highlighted in red.');
        cells.forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            const value = board.getCell(row, col);
            if (value !== null && !Validator.isCellValid(board, row, col, value)) {
                cell.style.backgroundColor = 'red'; // Highlight incorrect cells
                cell.style.color = 'black'; // Reset text color to black
            } else {
                cell.style.backgroundColor = ''; // Reset background color for correct cells
                cell.style.color = 'black'; // Reset text color to black
            }
        });
    }
}