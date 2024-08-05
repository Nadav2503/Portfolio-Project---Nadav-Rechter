import { initializeGameUi } from './gameUiSetup.js';

document.addEventListener('DOMContentLoaded', () => {
    const startGameBtn = document.querySelector('.start-game-button');
    const gameBoard = document.querySelector('.board');
    const gameCells = document.querySelectorAll('.cell');
    const gameStatusMessage = document.querySelector('.message');
    const restartGameBtn = document.querySelector('.restart-button');
    const backToMenuBtn = document.querySelector('#back-to-menu');
    const errorStatusMessage = document.getElementById('error-message');

    initializeGameUi(startGameBtn, gameBoard, gameCells, gameStatusMessage, restartGameBtn, backToMenuBtn, errorStatusMessage);
});
