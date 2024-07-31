import Game from './game.js';

document.getElementById('start-game').addEventListener('click', () => {
    const level = document.getElementById('level').value;
    const category = document.getElementById('category').value;

    const startButton = document.getElementById('start-game');
    startButton.disabled = true; // Disable the button

    const game = new Game(level, category);
    game.start();
});
