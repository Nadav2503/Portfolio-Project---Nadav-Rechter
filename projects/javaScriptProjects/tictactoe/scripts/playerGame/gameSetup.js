import { initializePlayerGame } from "./gameView.js";

document.addEventListener('DOMContentLoaded', () => {
    const startGameButtonElement = document.querySelector('.start-game-button');
    const gameBoardElement = document.querySelector('.board');
    const gameCells = document.querySelectorAll('.cell');
    const gameMessageElement = document.querySelector('.message');
    const restartGameButtonElement = document.querySelector('.restart-button');
    const menuButtonElement = document.getElementById('back-to-menu');
    const errorMessageElement = document.getElementById('error-message');

    initializePlayerGame(startGameButtonElement, gameBoardElement, gameCells, gameMessageElement, restartGameButtonElement, menuButtonElement, errorMessageElement);
});
