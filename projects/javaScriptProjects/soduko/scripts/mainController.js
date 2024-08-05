import SudokuBoard from './sudokuBoard.js';
import SudokuGenerator from './sudokuGenerator.js';
import SudokuSolver from './sudokuSolver.js';
import { provideHint, updateHintButton } from './hintProvider.js';
import { renderSudokuBoard, validateSudokuBoard } from './boardRenderer.js';

document.addEventListener('DOMContentLoaded', () => {
    const sudokuContainer = document.getElementById('sudoku-grid');
    let sudokuGrid = new SudokuBoard();
    let hintCount = 0;

    function showMessage(message) {
        const messageArea = document.getElementById('message-area');
        messageArea.innerHTML = message;
    }

    function updateHintCount(newHintCount) {
        hintCount = newHintCount;
        updateHintButton(hintCount);
    }

    document.getElementById('new-puzzle').addEventListener('click', () => {
        const difficulty = document.getElementById('difficulty').value;
        const board = SudokuGenerator.generate(difficulty);


        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board.getCellValue(row, col) !== null) {
                    board.markCellAsInitiallySet(row, col);
                }
            }
        }

        sudokuGrid = board;
        hintCount = 0;
        updateHintCount(hintCount);
        renderSudokuBoard(sudokuGrid, sudokuContainer, true);
        showMessage('New puzzle generated. You can now start filling it.');
    });

    document.getElementById('check-solution').addEventListener('click', () => {
        validateSudokuBoard(sudokuGrid, showMessage);
    });

    document.getElementById('solve-puzzle').addEventListener('click', () => {
        SudokuSolver.removeMistakes(sudokuGrid);

        if (SudokuSolver.solve(sudokuGrid)) {
            showMessage('Board solved successfully.');
        } else {
            showMessage('Failed to solve the board.');
        }
        renderSudokuBoard(sudokuGrid, sudokuContainer, false);
    });

    document.getElementById('hint-button').addEventListener('click', () => {
        provideHint(sudokuGrid, hintCount, updateHintCount, updateHintButton, showMessage);
    });

    renderSudokuBoard(sudokuGrid, sudokuContainer, false);
});
