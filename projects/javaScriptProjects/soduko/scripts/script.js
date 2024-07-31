import Board from './board.js';
import Generator from './generator.js';
import Validator from './validator.js';
import Solver from './solver.js';
import { provideHint, updateHintButton } from './hint.js';
import { renderBoard, checkBoard } from './boardUtils.js';

document.addEventListener('DOMContentLoaded', () => {
    const sudokuContainer = document.getElementById('sudoku-grid');
    let sudokuGrid = new Board();
    let hintCount = 0;

    function showMessage(message) {
        const messageArea = document.getElementById('message-area');
        messageArea.innerHTML = message;
    }

    function updateHintCount(newHintCount) {
        hintCount = newHintCount;
        updateHintButton(hintCount); // Ensure button state is updated
    }

    document.getElementById('new-puzzle').addEventListener('click', () => {
        const difficulty = document.getElementById('difficulty').value;
        const board = Generator.generate(difficulty);

        // Set initial cells
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board.getCell(row, col) !== null) {
                    board.setInitialCell(row, col);
                }
            }
        }

        sudokuGrid = board;
        hintCount = 0;
        updateHintCount(hintCount);
        renderBoard(sudokuGrid, sudokuContainer, true); // Pass sudokuGrid here
        showMessage('New puzzle generated. You can now start filling it.');
    });

    document.getElementById('check-solution').addEventListener('click', () => {
        checkBoard(sudokuGrid, showMessage);
    });

    document.getElementById('solve-puzzle').addEventListener('click', () => {
        Validator.removeMistakes(sudokuGrid);

        if (Solver.solve(sudokuGrid)) {
            showMessage('Board solved successfully.');
        } else {
            showMessage('Failed to solve the board.');
        }
        renderBoard(sudokuGrid, sudokuContainer, false); // Ensure cells are non-editable
    });

    document.getElementById('hint-button').addEventListener('click', () => {
        provideHint(sudokuGrid, hintCount, updateHintCount, updateHintButton, showMessage);
    });

    // Initial render of an empty board
    renderBoard(sudokuGrid, sudokuContainer, false); // Start with non-editable cells
});
