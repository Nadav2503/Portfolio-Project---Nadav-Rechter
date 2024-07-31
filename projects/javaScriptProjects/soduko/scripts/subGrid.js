// subGrid.js
export default class SubGrid {
    constructor(index, board) {
        this.index = index;
        this.board = board;
        this.cells = [];
        this.initCells();
    }

    initCells() {
        const rowOffset = Math.floor(this.index / 3) * 3;
        const colOffset = (this.index % 3) * 3;
        for (let i = 0; i < 9; i++) {
            const row = rowOffset + Math.floor(i / 3);
            const col = colOffset + (i % 3);
            this.cells.push({ row, col });
        }
    }

    updateCell(row, col, value) {
        const cellInSubGrid = this.cells.find(cell => cell.row === row && cell.col === col);
        if (cellInSubGrid) {
            const index = this.cells.indexOf(cellInSubGrid);
            this.cells[index] = { row, col, value }; // Update the cell value with new value
        }
    }

    validate() {
        const seen = new Set();
        for (const cell of this.cells) {
            const value = this.board.getCell(cell.row, cell.col);
            if (value && seen.has(value)) {
                console.log(`Duplicate in sub-grid ${this.index}: Cell [${cell.row}, ${cell.col}]`);
                return false;
            }
            seen.add(value);
        }
        return true;
    }
}
