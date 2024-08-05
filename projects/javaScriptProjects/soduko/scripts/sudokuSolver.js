import SudokuValidator from './sudokuValidator.js';

export default class SudokuSolver {
    static solve(board) {
        this.removeMistakes(board);
        return this.solveRecursive(board);
    }

    static solveRecursive(board) {
        const emptyCell = this.findEmptyCell(board);
        if (!emptyCell) return true;
        const [row, col] = emptyCell;
        for (let num = 1; num <= 9; num++) {
            if (this.isValid(board, row, col, num)) {
                board.setCellValue(row, col, num);
                if (this.solveRecursive(board)) return true;
                board.setCellValue(row, col, null);
            }
        }
        return false;
    }

    static findEmptyCell(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board.getCellValue(row, col) === null) {
                    return [row, col];
                }
            }
        }
        return null;
    }

    static isValid(board, row, col, num) {
        for (let c = 0; c < 9; c++) {
            if (board.getCellValue(row, c) === num) return false;
        }

        for (let r = 0; r < 9; r++) {
            if (board.getCellValue(r, col) === num) return false;
        }

        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let r = startRow; r < startRow + 3; r++) {
            for (let c = startCol; c < startCol + 3; c++) {
                if (board.getCellValue(r, c) === num) return false;
            }
        }

        return true;
    }

    static solveWithHint(board, row, col, num) {
        const originalValue = board.getCellValue(row, col);
        board.setCellValue(row, col, num);

        if (SudokuValidator.validateBoard(board)) {
            board.setCellValue(row, col, originalValue);
            return true;
        }

        board.setCellValue(row, col, originalValue);
        return false;
    }

    static removeMistakes(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const value = board.getCellValue(row, col);
                if (value !== null && !this.isValid(board, row, col, value)) {
                    board.setCellValue(row, col, null);
                }
            }
        }
    }
}
