import { playSuccessSound, playFailureSound, playWinSound } from './soundEffects.js';
import { displayMessage, addToLeaderboard, saveLeaderboardData } from './userInterface.js';
import { enableBoard, enableStartButton, showRestartButton, hideRestartButton } from './buttons.js';
import { createSequence, showSequence } from './gameLogic.js';

export function initializeGame(gameState, gameSpeed, maxRounds) {
    gameState.round = 0;
    gameState.score = 0;
    gameState.maxRounds = maxRounds;
    gameState.sequence = createSequence(maxRounds);
    gameState.playerSequence = [];
    gameState.gameStarted = true;
    proceedToNextRound(gameState, gameSpeed, maxRounds);
    enableBoard(true);
    enableStartButton(false);
    hideRestartButton();
    displayMessage("");
}

export function validatePlayerInput(gameState, gameSpeed, maxRounds, leaderboardData, playerName) {
    const lastIndex = gameState.playerSequence.length - 1;

    if (gameState.playerSequence[lastIndex] !== gameState.sequence[lastIndex]) {
        endGame(gameState, leaderboardData, playerName);
    } else if (gameState.playerSequence.length === gameState.round) {
        if (gameState.round === maxRounds) {
            handleVictory(gameState, leaderboardData, playerName);
        } else {
            gameState.score = gameState.round;
            playSuccessSound();
            setTimeout(() => proceedToNextRound(gameState, gameSpeed, maxRounds), 1000);
        }
    }
}

function proceedToNextRound(gameState, gameSpeed) {
    gameState.round++;
    gameState.playerSequence = [];
    refreshScoreDisplay(gameState);
    showSequence(gameState, gameSpeed);
    gameState.isComputerTurn = true;
}

function refreshScoreDisplay(gameState) {
    const scoreElement = document.querySelector('.score');
    if (scoreElement) {
        scoreElement.textContent = `Score: ${gameState.score}`;
    }
}

function endGame(gameState, leaderboardData, playerName) {
    gameState.gameStarted = false;
    playFailureSound();
    displayMessage('Game Over! You made a mistake.');
    enableBoard(false);
    enableStartButton(false);
    showRestartButton();
    if (playerName) {
        addToLeaderboard(playerName, gameState.score, leaderboardData);
        saveLeaderboardData(leaderboardData);
    }
}

function handleVictory(gameState, leaderboardData, playerName) {
    gameState.gameStarted = false;
    playWinSound();
    displayMessage(`Congratulations ${playerName}! You completed all rounds.`);
    enableBoard(false);
    enableStartButton(false);
    showRestartButton();
    gameState.score = gameState.maxRounds;
    refreshScoreDisplay(gameState);
    if (playerName) {
        addToLeaderboard(playerName, gameState.score, leaderboardData);
        saveLeaderboardData(leaderboardData);
    }
}
