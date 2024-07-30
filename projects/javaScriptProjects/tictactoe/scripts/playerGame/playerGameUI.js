import { checkWinner, checkDraw, updateLeaderboard, handleDraw } from './gameLogic.js';

export const setupPlayerGame = (startGameButton, board, cells, message, restartButton, menuButton, errorMessage) => {
    let currentPlayer = "Player 1";
    let gameStarted = false;
    let boardState = Array(9).fill(null);

    const getPlayerNames = () => ({
        "Player 1": document.getElementById('player1').value.trim() || "Player 1",
        "Player 2": document.getElementById('player2').value.trim() || "Player 2"
    });

    const updateMessage = () => {
        const playerNames = getPlayerNames();
        if (currentPlayer) {
            message.textContent = `${playerNames[currentPlayer]}'s turn`;
        } else {
            message.textContent = "Please enter your names and click 'Start Game' to begin.";
        }
    };

    const startGame = () => {
        const playerNames = getPlayerNames();
        if (!playerNames["Player 1"] || !playerNames["Player 2"]) {
            message.textContent = "Both players need to enter their names!";
            return;
        }

        currentPlayer = "Player 1";
        gameStarted = true;
        board.style.display = 'grid';
        restartButton.style.display = 'block';
        startGameButton.style.display = 'none';
        updateMessage();
    };

    const handleClick = (index) => {
        if (!gameStarted || boardState[index] || checkWinner(boardState)) return;

        boardState[index] = currentPlayer;
        cells[index].textContent = currentPlayer === "Player 1" ? "X" : "O";

        const winner = checkWinner(boardState);
        if (winner) {
            const playerNames = getPlayerNames();
            message.textContent = `${playerNames[winner]} wins!`;
            updateLeaderboard(playerNames[winner], "Player");
            gameStarted = false;
        } else if (checkDraw(boardState)) {
            message.textContent = "It's a draw!";
            handleDraw(getPlayerNames()["Player 1"]);
            handleDraw(getPlayerNames()["Player 2"]);
            gameStarted = false;
        } else {
            currentPlayer = currentPlayer === "Player 1" ? "Player 2" : "Player 1";
            updateMessage();
        }
    };

    const resetGame = () => {
        boardState = Array(9).fill(null);
        cells.forEach(cell => cell.textContent = "");
        currentPlayer = "Player 1";
        gameStarted = false;
        board.style.display = 'none';
        restartButton.style.display = 'none';
        startGameButton.style.display = 'block';
        updateMessage();
    };

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => handleClick(index));
    });

    restartButton.addEventListener("click", resetGame);

    menuButton.addEventListener("click", () => {
        window.location.href = 'index.html'; // Redirect to menu page
    });

    startGameButton.addEventListener('click', () => {
        const player1Name = document.getElementById('player1').value.trim();
        const player2Name = document.getElementById('player2').value.trim();

        if (player1Name === '' || player2Name === '') {
            errorMessage.textContent = 'Please enter names for both players.';
            return;
        }

        errorMessage.textContent = '';
        startGame();
    });
};
