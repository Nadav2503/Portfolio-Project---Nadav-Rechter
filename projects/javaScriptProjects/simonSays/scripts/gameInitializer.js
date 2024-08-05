import { playSegmentSound, loadSounds } from './soundEffects.js';
import { initializeGame, validatePlayerInput } from './gameController.js';

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const playerName = urlParams.get('playerName');
    const level = urlParams.get('level');

    let leaderboardData = JSON.parse(localStorage.getItem('leaderboardData')) || [];

    let gameSpeed = 1000;
    let maxRounds = 10;

    const difficultyLevels = {
        easy: { gameSpeed: 1500, maxRounds: 5 },
        medium: { gameSpeed: 1000, maxRounds: 10 },
        hard: { gameSpeed: 750, maxRounds: 15 },
        impossible: { gameSpeed: 350, maxRounds: 30 }
    };

    if (level && difficultyLevels[level]) {
        gameSpeed = difficultyLevels[level].gameSpeed;
        maxRounds = difficultyLevels[level].maxRounds;
    }

    const gameState = {
        round: 0,
        score: 0,
        sequence: [],
        playerSequence: [],
        gameStarted: false,
        isComputerTurn: false
    };

    loadSounds();

    document.getElementById('startGame').addEventListener('click', () => initializeGame(gameState, gameSpeed, maxRounds, leaderboardData, playerName));
    document.getElementById('viewLeaderboard').addEventListener('click', () => window.location.href = './leaderboard.html');
    document.getElementById('returnToMenu').addEventListener('click', () => window.location.href = './index.html');
    document.getElementById('restartGame').addEventListener('click', () => initializeGame(gameState, gameSpeed, maxRounds, leaderboardData, playerName));

    const segments = document.querySelectorAll('.segment');
    segments.forEach(segment => {
        segment.addEventListener('click', () => {
            if (!gameState.isComputerTurn && gameState.gameStarted) {
                const color = segment.getAttribute('data-color');
                gameState.playerSequence.push(color);
                playSegmentSound(color);
                validatePlayerInput(gameState, gameSpeed, maxRounds, leaderboardData, playerName);
            }
        });
    });
});
