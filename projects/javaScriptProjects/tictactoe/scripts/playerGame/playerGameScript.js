import { setupPlayerGame } from "./../playerGame/playerGameUi.js"

document.addEventListener('DOMContentLoaded', () => {
    const startGameButton = document.querySelector('.start-game-button');
    const board = document.querySelector('.board');
    const cells = document.querySelectorAll('.cell');
    const message = document.querySelector('.message');
    const restartButton = document.querySelector('.restart-button');
    const menuButton = document.getElementById('back-to-menu');
    const errorMessage = document.getElementById('error-message');

    setupPlayerGame(startGameButton, board, cells, message, restartButton, menuButton, errorMessage);
});