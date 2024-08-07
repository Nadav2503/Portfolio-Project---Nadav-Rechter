import { isWinningCombo, isBoardFull, incrementPlayerWin, recordGameDraw } from './gameRules.js';

export const initializeGameUi = (startGameBtn, gameBoard, gameCells, gameStatusMessage, restartGameBtn, backToMenuBtn, errorStatusMessage) => {
    let playerName = '';
    let activePlayer = 'Player';
    let gameInProgress = false;

    function startNewGame() {
        playerName = document.getElementById('playerName').value.trim();
        if (!playerName) {
            errorStatusMessage.textContent = "Please enter your name!";
            return;
        }

        document.querySelector('.name-inputs').style.display = 'none';
        gameBoard.style.display = 'grid';
        restartGameBtn.style.display = 'block';
        gameStatusMessage.textContent = `${playerName}'s Turn`;
        activePlayer = 'Player';
        gameInProgress = true;
        resetGameBoard();
    }

    function resetGameBoard() {
        gameCells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('disabled');
            cell.addEventListener('click', handlePlayerMove, { once: true });
        });
    }

    function handlePlayerMove(event) {
        if (activePlayer === 'Player' && gameInProgress) {
            event.target.textContent = 'X';
            if (isWinningCombo(gameCells, 'X')) {
                gameStatusMessage.textContent = `${playerName} Wins!`;
                gameInProgress = false;
                incrementPlayerWin(playerName);
                return;
            }
            if (isBoardFull(gameCells)) {
                gameStatusMessage.textContent = "It's a Draw!";
                gameInProgress = false;
                recordGameDraw(playerName);
                return;
            }
            gameStatusMessage.textContent = "Computer's Turn";
            activePlayer = 'Computer';
            setTimeout(makeComputerMove, 500);
        }
    }

    function makeComputerMove() {
        const availableCells = Array.from(gameCells).filter(cell => cell.textContent === '');
        if (availableCells.length === 0) {
            gameStatusMessage.textContent = "It's a Draw!";
            recordGameDraw(playerName);
            return;
        }
        const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
        randomCell.textContent = 'O';
        if (isWinningCombo(gameCells, 'O')) {
            gameStatusMessage.textContent = "Computer Wins!";
            gameInProgress = false;
            return;
        }
        gameStatusMessage.textContent = `${playerName}'s Turn`;
        activePlayer = 'Player';
    }

    function resetGame() {
        document.getElementById('playerName').value = '';
        document.querySelector('.name-inputs').style.display = 'flex';
        gameBoard.style.display = 'none';
        restartGameBtn.style.display = 'none';
        gameStatusMessage.textContent = 'Please enter your name and click "Start Game" to begin.';
    }

    function navigateToMenu() {
        window.location.href = './index.html';
    }

    startGameBtn.addEventListener('click', startNewGame);
    restartGameBtn.addEventListener('click', resetGame);
    backToMenuBtn.addEventListener('click', navigateToMenu);
};
