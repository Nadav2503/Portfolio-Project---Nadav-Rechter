import MemoryGame from './memoryGame.js';

document.getElementById('start-game-btn').addEventListener('click', () => {
    const level = document.getElementById('level-select').value;
    const category = document.getElementById('category-select').value;

    const startButton = document.getElementById('start-game-btn');
    startButton.disabled = true;

    const game = new MemoryGame(level, category);
    game.start();
});
