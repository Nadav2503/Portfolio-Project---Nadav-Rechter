import Board from './board.js';
import Solver from './solver.js';

export default class Generator {
    static generate(difficulty) {
        const board = new Board();
        this.fillBoard(board); // Fill board with a valid Sudoku puzzle
        this.removeCells(board, difficulty); // Remove cells based on difficulty
        return board;
    }

    static fillBoard(board) {
        // Use the Solver class to fill the board with a valid solution
        Solver.solve(board);
        // Mark all cells as initially set after filling
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                board.initialCells[row * 9 + col] = true; // Initially set cells
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

            if (board.getCell(row, col) !== null) {
                board.setCell(row, col, null);
                board.initialCells[row * 9 + col] = false; // Mark as editable
                removed++;
            }
        }
    }
}
