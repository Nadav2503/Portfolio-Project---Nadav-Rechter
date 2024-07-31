// board.js
import SubGrid from './subGrid.js';

export default class Board {
    constructor() {
        this.grid = Array(81).fill(null); // 9x9 grid flattened into a 1D array
        this.subGrids = [];
        this.initialCells = Array(81).fill(false); // Track initially set cells
        this.initSubGrids();
    }

    initSubGrids() {
        for (let i = 0; i < 9; i++) {
            const subGrid = new SubGrid(i, this);
            this.subGrids.push(subGrid);
        }
    }

    getCell(row, col) {
        return this.grid[row * 9 + col];
    }

    setCell(row, col, value) {
        this.grid[row * 9 + col] = value;
        const subGridIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3);
        this.subGrids[subGridIndex].updateCell(row, col, value);
    }

    isInitialCell(row, col) {
        return this.initialCells[row * 9 + col];
    }

    setInitialCell(row, col) {
        this.initialCells[row * 9 + col] = true;
    }

    validate() {
        return this.subGrids.every(subGrid => subGrid.validate()) &&
            this.validateRows() &&
            this.validateColumns();
    }

    validateRows() {
        for (let row = 0; row < 9; row++) {
            const seen = new Set();
            for (let col = 0; col < 9; col++) {
                const value = this.getCell(row, col);
                if (value && seen.has(value)) {
                    return false;
                }
                seen.add(value);
            }
        }
        return true;
    }

    validateColumns() {
        for (let col = 0; col < 9; col++) {
            const seen = new Set();
            for (let row = 0; row < 9; row++) {
                const value = this.getCell(row, col);
                if (value && seen.has(value)) {
                    return false;
                }
                seen.add(value);
            }
        }
        return true;
    }
}
