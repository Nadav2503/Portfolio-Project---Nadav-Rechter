export default class SudokuValidator {

    static validateSudokuBoard(board) {
        if (!board.subGridContainers.every(subGrid => subGrid.validate())) {
            return false;
        }

        if (!this.areRowsValid(board)) {
            return false;
        }

        if (!this.areColumnsValid(board)) {
            return false;
        }

        return true;
    }

    static areRowsValid(board) {
        for (let row = 0; row < 9; row++) {
            const seen = new Set();
            for (let col = 0; col < 9; col++) {
                const value = board.getCellValue(row, col);
                if (value && seen.has(value)) {
                    return false;
                }
                seen.add(value);
            }
        }
        return true;
    }

    static areColumnsValid(board) {
        for (let col = 0; col < 9; col++) {
            const seen = new Set();
            for (let row = 0; row < 9; row++) {
                const value = board.getCellValue(row, col);
                if (value && seen.has(value)) {
                    return false;
                }
                seen.add(value);
            }
        }
        return true;
    }

    static isSudokuCellValid(board, row, col, value) {
        if (!this.isValueValidInRow(board, row, value)) {
            return false;
        }

        if (!this.isValueValidInColumn(board, col, value)) {
            return false;
        }

        const subGridIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3);
        const subGrid = board.subGridContainers[subGridIndex];
        for (const cell of subGrid.cellPositions) {
            if (cell.row === row && cell.col === col) {
                continue;
            }
            if (board.getCellValue(cell.row, cell.col) === value) {
                return false;
            }
        }
        return true;
    }

    static isValueValidInRow(board, row, value) {
        const seen = new Set();
        for (let col = 0; col < 9; col++) {
            const cellValue = board.getCellValue(row, col);
            if (cellValue === value && seen.has(value)) {
                return false;
            }
            seen.add(cellValue);
        }
        return true;
    }

    static isValueValidInColumn(board, col, value) {
        const seen = new Set();
        for (let row = 0; row < 9; row++) {
            const cellValue = board.getCellValue(row, col);
            if (cellValue === value && seen.has(value)) {
                return false;
            }
            seen.add(cellValue);
        }
        return true;
    }
}
