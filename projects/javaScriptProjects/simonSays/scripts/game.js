// game.js
import { playSuccessSound, playFailureSound, playWinSound, playSegmentSound } from './sounds.js';
import { displayMessage, addToLeaderboard, saveLeaderboardData } from './ui.js';
export function startGame(gameState, gameSpeed, maxRounds) {
    gameState.round = 0;
    gameState.score = 0;
    gameState.sequence = generateSequence(maxRounds);
    gameState.playerSequence = [];
    gameState.gameStarted = true;
    startRound(gameState, gameSpeed, maxRounds);
}

export function checkPlayerInput(gameState, gameSpeed, maxRounds, leaderboardData, playerName) {
    const lastIndex = gameState.playerSequence.length - 1;
    if (gameState.playerSequence[lastIndex] !== gameState.sequence[lastIndex]) {
        gameOver(gameState, leaderboardData, playerName);
    } else if (gameState.playerSequence.length === gameState.round) {
        if (gameState.round === maxRounds) {
            gameWon(gameState, leaderboardData, playerName);
        } else {
            gameState.score++;
            playSuccessSound();
            setTimeout(() => startRound(gameState, gameSpeed, maxRounds), 1000);
        }
    }
}

function startRound(gameState, gameSpeed) {
    gameState.round++;
    gameState.playerSequence = [];
    updateScore(gameState);
    displaySequence(gameState, gameSpeed);
    gameState.isComputerTurn = true;
}

function generateSequence(rounds) {
    const COLORS = ['green', 'red', 'yellow', 'blue'];
    const newSequence = [];
    for (let i = 0; i < rounds; i++) {
        const randomIndex = Math.floor(Math.random() * COLORS.length);
        newSequence.push(COLORS[randomIndex]);
    }
    return newSequence;
}

function displaySequence(gameState, gameSpeed) {
    let i = 0;
    const interval = setInterval(() => {
        playSegmentSound(gameState.sequence[i]);
        highlightSegment(gameState.sequence[i], gameSpeed);
        i++;
        if (i >= gameState.round) {
            clearInterval(interval);
            gameState.isComputerTurn = false;
        }
    }, gameSpeed);
}

function highlightSegment(color, gameSpeed) {
    const segment = document.querySelector(`.segment[data-color="${color}"]`);
    if (segment) {
        segment.classList.add('active');
        setTimeout(() => {
            segment.classList.remove('active');
        }, gameSpeed / 2);
    } else {
        console.error('Segment not found:', color);
    }
}

function updateScore(gameState) {
    const scoreElement = document.querySelector('.score');
    if (scoreElement) {
        scoreElement.textContent = `Score: ${gameState.score}`;
    } else {
        console.error('Score element not found!');
    }
}

function gameOver(gameState, leaderboardData, playerName) {
    gameState.gameStarted = false;
    playFailureSound();
    displayMessage('Game Over! You made a mistake.');
    if (playerName) {
        addToLeaderboard(playerName, gameState.round, leaderboardData);
        saveLeaderboardData(leaderboardData);
    }
}

function gameWon(gameState, leaderboardData, playerName) {
    gameState.gameStarted = false;
    playWinSound();
    if (playerName) {
        addToLeaderboard(playerName, gameState.round, leaderboardData);
        saveLeaderboardData(leaderboardData);
    }
    displayMessage(`Congratulations ${playerName}! You completed all rounds.`);
}
