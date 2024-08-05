import { determineWinner, isDraw, recordWin, recordDraw } from './gameRule.js';

export const initializePlayerGame = (startGameButton, gameBoard, gameCells, gameMessage, restartGameButton, menuButton, errorMessage) => {
    let currentPlayer = "Player 1";
    let isGameActive = false;
    let boardState = Array(9).fill(null);

    const getPlayerNames = () => ({
        "Player 1": document.getElementById('player1NameInput').value.trim() || "Player 1",
        "Player 2": document.getElementById('player2NameInput').value.trim() || "Player 2"
    });

    const updateGameMessage = () => {
        const playerNames = getPlayerNames();
        if (currentPlayer) {
            gameMessage.textContent = `${playerNames[currentPlayer]}'s turn`;
        } else {
            gameMessage.textContent = "Please enter your names and click 'Start Game' to begin.";
        }
    };

    const startGame = () => {
        const playerNames = getPlayerNames();
        if (!playerNames["Player 1"] || !playerNames["Player 2"]) {
            gameMessage.textContent = "Both players need to enter their names!";
            return;
        }

        currentPlayer = "Player 1";
        isGameActive = true;
        gameBoard.style.display = 'grid';
        restartGameButton.style.display = 'block';
        startGameButton.style.display = 'none';
        document.querySelector('.name-inputs').style.display = 'none';
        updateGameMessage();
    };

    const handleCellClick = (index) => {
        if (!isGameActive || boardState[index] || determineWinner(boardState)) return;

        boardState[index] = currentPlayer;
        gameCells[index].textContent = currentPlayer === "Player 1" ? "X" : "O";

        const winner = determineWinner(boardState);
        if (winner) {
            const playerNames = getPlayerNames();
            gameMessage.textContent = `${playerNames[winner]} wins!`;
            recordWin(playerNames[winner]);
            isGameActive = false;
        } else if (isDraw(boardState)) {
            gameMessage.textContent = "It's a draw!";
            recordDraw(getPlayerNames()["Player 1"]);
            recordDraw(getPlayerNames()["Player 2"]);
            isGameActive = false;
        } else {
            currentPlayer = currentPlayer === "Player 1" ? "Player 2" : "Player 1";
            updateGameMessage();
        }
    };

    const resetGame = () => {
        boardState = Array(9).fill(null);
        gameCells.forEach(cell => cell.textContent = "");
        currentPlayer = "Player 1";
        isGameActive = false;
        gameBoard.style.display = 'none';
        restartGameButton.style.display = 'none';
        startGameButton.style.display = 'block';
        document.querySelector('.name-inputs').style.display = 'flex';
        document.getElementById('player1NameInput').value = '';
        document.getElementById('player2NameInput').value = '';
        updateGameMessage();
    };

    gameCells.forEach((cell, index) => {
        cell.addEventListener("click", () => handleCellClick(index));
    });

    restartGameButton.addEventListener("click", resetGame);

    menuButton.addEventListener("click", () => {
        window.location.href = 'index.html';
    });

    startGameButton.addEventListener('click', () => {
        const player1Name = document.getElementById('player1NameInput').value.trim();
        const player2Name = document.getElementById('player2NameInput').value.trim();

        if (player1Name === '' || player2Name === '') {
            errorMessage.textContent = 'Please enter names for both players.';
            return;
        }

        errorMessage.textContent = '';
        startGame();
    });
};
