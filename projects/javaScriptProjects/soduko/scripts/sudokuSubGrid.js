export default class SudokuSubGrid {
    constructor(subGridIndex, board) {
        this.subGridIndex = subGridIndex;
        this.board = board;
        this.cellPositions = [];
        this.initializeCellPositions();
    }

    initializeCellPositions() {
        const rowOffset = Math.floor(this.subGridIndex / 3) * 3;
        const colOffset = (this.subGridIndex % 3) * 3;
        for (let i = 0; i < 9; i++) {
            const row = rowOffset + Math.floor(i / 3);
            const col = colOffset + (i % 3);
            this.cellPositions.push({ row, col });
        }
    }

    updateCellValue(row, col, value) {
        const cellInSubGrid = this.cellPositions.find(cell => cell.row === row && cell.col === col);
        if (cellInSubGrid) {
            const index = this.cellPositions.indexOf(cellInSubGrid);
            this.cellPositions[index] = { row, col, value };
        }
    }

    validate() {
        const seen = new Set();
        for (const cell of this.cellPositions) {
            const value = this.board.getCellValue(cell.row, cell.col);
            if (value && seen.has(value)) {
                return false;
            }
            seen.add(value);
        }
        return true;
    }
}
