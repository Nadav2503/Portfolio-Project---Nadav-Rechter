export default class Validator {
    static removeMistakes(board) {
        const cells = document.querySelectorAll('.grid-cell');
        cells.forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            const value = board.getCell(row, col);

            // Reset background color
            const originalColor = cell.style.backgroundColor;

            if (!board.isInitialCell(row, col) && value !== null) {
                if (!this.isCellValid(board, row, col, value)) {
                    board.setCell(row, col, null); // Clear the mistake
                    cell.textContent = ''; // Clear cell display
                    cell.style.backgroundColor = 'red'; // Highlight incorrect cells

                    // Reset background color after 5 seconds
                    setTimeout(() => {
                        cell.style.backgroundColor = originalColor;
                    }, 5000);
                }
            }
        });
    }

    static isCellValid(board, row, col, value) {
        if (value === null) return true; // Empty cells are considered valid
        // Check row
        for (let c = 0; c < 9; c++) {
            if (c !== col && board.getCell(row, c) === value) {
                return false;
            }
        }

        // Check column
        for (let r = 0; r < 9; r++) {
            if (r !== row && board.getCell(r, col) === value) {
                return false;
            }
        }

        // Check sub-grid
        const subGridIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3);
        const subGrid = board.subGrids[subGridIndex];
        for (const cell of subGrid.cells) {
            if (cell.row === row && cell.col === col) {
                continue; // Skip the cell we're checking
            }
            const cellValue = board.getCell(cell.row, cell.col);
            if (cellValue === value) {
                return false;
            }
        }

        return true;
    }

    static validatePuzzle(board) {
        let isValid = true;
        const grid = [];

        // Convert the 1D grid to a 2D grid
        for (let i = 0; i < 9; i++) {
            grid[i] = [];
            for (let j = 0; j < 9; j++) {
                grid[i][j] = board.getCell(i, j);
            }
        }

        // Use validateBoard logic
        isValid = this.validateBoard(board);

        return isValid;
    }

    static validateBoard(board) {
        let isValid = true;
        const cells = document.querySelectorAll('.grid-cell');

        cells.forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            const value = board.getCell(row, col);

            // Reset background color
            const originalColor = cell.style.backgroundColor;

            if (!board.isInitialCell(row, col) && value !== null) {
                if (!this.isCellValid(board, row, col, value)) {
                    cell.style.backgroundColor = 'red'; // Highlight incorrect cells
                    isValid = false;

                    // Reset background color after 5 seconds
                    setTimeout(() => {
                        cell.style.backgroundColor = originalColor;
                    }, 5000);
                }
            }
        });

        return isValid;
    }
}
