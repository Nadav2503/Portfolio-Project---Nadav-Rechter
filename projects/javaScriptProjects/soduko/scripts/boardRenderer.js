import SudokuValidator from './sudokuValidator.js';

export function renderSudokuBoard(board, container, editable = false) {
    container.innerHTML = '';

    function handleCellInput(event) {
        const cell = event.target;
        const row = parseInt(cell.dataset.row, 10);
        const col = parseInt(cell.dataset.col, 10);
        const value = cell.textContent.trim();

        if (/^[1-9]$/.test(value)) {
            board.setCellValue(row, col, parseInt(value, 10));
        } else {
            board.setCellValue(row, col, null);
            cell.textContent = '';
        }
    }

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.dataset.row = row;
            cell.dataset.col = col;
            const value = board.getCellValue(row, col);
            cell.textContent = value !== null ? value : '';

            if (board.isCellInitiallySet(row, col)) {
                cell.contentEditable = false;
                cell.classList.add('initial-cell');
            } else {
                cell.contentEditable = editable;
                if (editable) {
                    cell.addEventListener('input', handleCellInput);
                } else {
                    cell.removeEventListener('input', handleCellInput);
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

export function validateSudokuBoard(board, showMessage) {
    const isValid = SudokuValidator.validateSudokuBoard(board);
    const cells = document.querySelectorAll('.grid-cell');

    if (isValid) {
        showMessage('Puzzle is correctly filled!');
        cells.forEach(cell => {
            const row = parseInt(cell.dataset.row, 10);
            const col = parseInt(cell.dataset.col, 10);
            const value = board.getCellValue(row, col);
            if (value !== null && SudokuValidator.isSudokuCellValid(board, row, col, value)) {
                cell.style.backgroundColor = 'lightgreen';
                cell.style.color = 'black';
            } else {
                cell.style.backgroundColor = '';
                cell.style.color = 'black';
            }
        });
    } else {
        showMessage('Puzzle is not correctly filled. Incorrect cells are highlighted in red.');
        cells.forEach(cell => {
            const row = parseInt(cell.dataset.row, 10);
            const col = parseInt(cell.dataset.col, 10);
            const value = board.getCellValue(row, col);
            if (value !== null && !SudokuValidator.isSudokuCellValid(board, row, col, value)) {
                cell.style.backgroundColor = 'red';
                cell.style.color = 'black';
            } else {
                cell.style.backgroundColor = '';
                cell.style.color = 'black';
            }
        });
    }
}
