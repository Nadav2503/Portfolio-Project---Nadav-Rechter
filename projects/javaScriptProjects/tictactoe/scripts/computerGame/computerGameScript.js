
import { setupGame } from './uiHandler.js';

document.addEventListener('DOMContentLoaded', () => {
    const startGameButton = document.querySelector('.start-game-button');
    const board = document.querySelector('.board');
    const cells = document.querySelectorAll('.cell');
    const message = document.querySelector('.message');
    const restartButton = document.querySelector('.restart-button');
    const backToMenuButton = document.querySelector('#back-to-menu');
    const errorMessage = document.getElementById('error-message');

    setupGame(startGameButton, board, cells, message, restartButton, backToMenuButton, errorMessage);
});
