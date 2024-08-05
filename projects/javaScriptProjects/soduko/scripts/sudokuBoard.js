import SudokuSubGrid from './sudokuSubGrid.js';

export default class SudokuBoard {
    constructor() {
        this.cells = Array(81).fill(null);
        this.subGridContainers = [];
        this.isInitialCell = Array(81).fill(false);
        this.initializeSubGrids();
    }

    initializeSubGrids() {
        for (let i = 0; i < 9; i++) {
            const subGrid = new SudokuSubGrid(i, this);
            this.subGridContainers.push(subGrid);
        }
    }

    getCellValue(row, col) {
        return this.cells[row * 9 + col];
    }

    setCellValue(row, col, value) {
        this.cells[row * 9 + col] = value;
        const subGridIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3);
        this.subGridContainers[subGridIndex].updateCellValue(row, col, value);
    }

    isCellInitiallySet(row, col) {
        return this.isInitialCell[row * 9 + col];
    }

    markCellAsInitiallySet(row, col) {
        this.isInitialCell[row * 9 + col] = true;
    }

    isBoardValid() {
        return this.subGridContainers.every(subGrid => subGrid.validate()) &&
            this.areRowsValid() &&
            this.areColumnsValid();
    }

    areRowsValid() {
        for (let row = 0; row < 9; row++) {
            const seen = new Set();
            for (let col = 0; col < 9; col++) {
                const value = this.getCellValue(row, col);
                if (value && seen.has(value)) {
                    return false;
                }
                seen.add(value);
            }
        }
        return true;
    }

    areColumnsValid() {
        for (let col = 0; col < 9; col++) {
            const seen = new Set();
            for (let row = 0; row < 9; row++) {
                const value = this.getCellValue(row, col);
                if (value && seen.has(value)) {
                    return false;
                }
                seen.add(value);
            }
        }
        return true;
    }
}
