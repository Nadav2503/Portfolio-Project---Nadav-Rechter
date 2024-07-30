// main.js
import { loadSounds, playSegmentSound } from './sounds.js';
import { startGame, checkPlayerInput } from './game.js';


document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const playerName = urlParams.get('playerName');
    const level = urlParams.get('level');


    // Retrieve leaderboard data from local storage if available
    let leaderboardData = JSON.parse(localStorage.getItem('leaderboardData')) || [];

    // Default game settings in case level is not provided or invalid
    let gameSpeed = 1000;
    let maxRounds = 10;

    // Define game levels
    const levels = {
        easy: { gameSpeed: 1500, maxRounds: 5 },
        medium: { gameSpeed: 1000, maxRounds: 10 },
        hard: { gameSpeed: 750, maxRounds: 15 },
        impossible: { gameSpeed: 350, maxRounds: 30 }
    };

    // Check if level is valid and set game parameters accordingly
    if (level && levels[level]) {
        gameSpeed = levels[level].gameSpeed;
        maxRounds = levels[level].maxRounds;
    } else {
        console.error('Invalid level or level not provided. Using default game settings.');
        console.log('Levels:', levels);
        console.log('Level found:', levels[level]);
    }

    // Initialize game state variables
    const gameState = {
        round: 0,
        score: 0,
        sequence: [],
        playerSequence: [],
        gameStarted: false,
        isComputerTurn: false
    };

    // Load sound functions
    loadSounds();

    // Attach event listeners
    document.getElementById('startGame').addEventListener('click', () => startGame(gameState, gameSpeed, maxRounds, leaderboardData, playerName));
    document.getElementById('viewLeaderboard').addEventListener('click', () => window.location.href = './leaderboard.html');
    document.getElementById('returnToMenu').addEventListener('click', () => window.location.href = './index.html');

    // Attach segment click handlers
    const segments = document.querySelectorAll('.segment');
    segments.forEach(segment => {
        segment.addEventListener('click', () => {
            if (!gameState.isComputerTurn && gameState.gameStarted) {
                const color = segment.getAttribute('data-color');
                gameState.playerSequence.push(color);
                playSegmentSound(color);
                checkPlayerInput(gameState, gameSpeed, maxRounds, leaderboardData, playerName);
            }
        });
    });
});
