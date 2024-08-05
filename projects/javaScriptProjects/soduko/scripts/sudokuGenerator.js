import SudokuBoard from './sudokuBoard.js';
import SudokuSolver from './sudokuSolver.js';

export default class SudokuGenerator {
    static generate(difficulty) {
        const board = new SudokuBoard();
        this.fillBoard(board);
        this.removeCells(board, difficulty);
        return board;
    }

    static fillBoard(board) {

        SudokuSolver.solve(board);
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                board.markCellAsInitiallySet(row, col);
            }
        }
    }

    static removeCells(board, difficulty) {
        let cellsToRemove;
        switch (difficulty) {
            case 'easy':
                cellsToRemove = 45;
                break;
            case 'medium':
                cellsToRemove = 55;
                break;
            case 'hard':
                cellsToRemove = 65;
                break;
            default:
                cellsToRemove = 40;
        }

        let removed = 0;
        while (removed < cellsToRemove) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);

            if (board.getCellValue(row, col) !== null) {
                board.setCellValue(row, col, null);
                board.isInitialCell[row * 9 + col] = false;
                removed++;
            }
        }
    }
}
