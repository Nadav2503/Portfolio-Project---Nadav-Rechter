import Validator from './validator.js';
export default class Solver {
    static solve(board) {
        return this.solveRecursive(board);
    }

    static solveRecursive(board) {
        const emptyCell = this.findEmptyCell(board);
        if (!emptyCell) return true; // No empty cells, puzzle solved

        const [row, col] = emptyCell;
        for (let num = 1; num <= 9; num++) {
            if (this.isValid(board, row, col, num)) {
                board.setCell(row, col, num);

                if (this.solveRecursive(board)) return true;

                board.setCell(row, col, null); // Backtrack
            }
        }
        return false; // Trigger backtracking
    }

    static findEmptyCell(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board.getCell(row, col) === null) {
                    return [row, col];
                }
            }
        }
        return null;
    }

    static isValid(board, row, col, num) {
        // Check row
        for (let c = 0; c < 9; c++) {
            if (board.getCell(row, c) === num) return false;
        }

        // Check column
        for (let r = 0; r < 9; r++) {
            if (board.getCell(r, col) === num) return false;
        }

        // Check sub-grid
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let r = startRow; r < startRow + 3; r++) {
            for (let c = startCol; c < startCol + 3; c++) {
                if (board.getCell(r, c) === num) return false;
            }
        }

        return true;
    }

    static solveWithHint(board, row, col, num) {
        const originalValue = board.getCell(row, col);
        board.setCell(row, col, num);

        if (Validator.validateBoard(board)) {
            board.setCell(row, col, originalValue);
            return true; // Hint is valid
        }

        board.setCell(row, col, originalValue); // Reset cell
        return false; // Hint is invalid
    }
}
