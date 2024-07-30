// uiHandler.js
import { checkWinner, checkDraw, updateLeaderboard, handleDraw } from './gameLogic.js';

export const setupGame = (startGameButton, board, cells, message, restartButton, backToMenuButton, errorMessage) => {
    let playerName = '';
    let currentPlayer = 'Player'; // 'Player' or 'Computer'
    let gameEnded = false;

    function startGame() {
        playerName = document.getElementById('player1').value;
        if (!playerName) {
            errorMessage.textContent = "Please enter your name!";
            return;
        }

        document.querySelector('.name-inputs').style.display = 'none';
        board.style.display = 'grid';
        restartButton.style.display = 'block';
        message.textContent = `${playerName}'s Turn`;
        currentPlayer = 'Player';
        gameEnded = false;
        resetBoard();
    }

    function resetBoard() {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('disabled');
            cell.addEventListener('click', handleCellClick, { once: true });
        });
    }

    function handleCellClick(event) {
        if (currentPlayer === 'Player' && !gameEnded) {
            event.target.textContent = 'X';
            if (checkWinner(cells, 'X')) {
                message.textContent = `${playerName} Wins!`;
                gameEnded = true;
                updateLeaderboard(playerName, 'Player');
                return;
            }
            if (checkDraw(cells)) {
                message.textContent = "It's a Draw!";
                gameEnded = true;
                handleDraw(playerName);
                return;
            }
            message.textContent = `Computer's Turn`;
            currentPlayer = 'Computer';
            setTimeout(computerMove, 500);
        }
    }

    function computerMove() {
        const availableCells = Array.from(cells).filter(cell => cell.textContent === '');
        if (availableCells.length === 0) {
            message.textContent = "It's a Draw!";
            handleDraw(playerName);
            return;
        }
        const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
        randomCell.textContent = 'O';
        if (checkWinner(cells, 'O')) {
            message.textContent = "Computer Wins!";
            gameEnded = true;
            return;
        }
        message.textContent = `${playerName}'s Turn`;
        currentPlayer = 'Player';
    }

    function restartGame() {
        document.querySelector('.name-inputs').style.display = 'flex';
        board.style.display = 'none';
        restartButton.style.display = 'none';
        message.textContent = 'Please enter your name and click "Start Game" to begin.';
    }

    function goToMenu() {
        window.location.href = './index.html';
    }

    startGameButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', restartGame);
    backToMenuButton.addEventListener('click', goToMenu);
};
