import Deck from './deck.js';
import { levels } from './level.js';
import { checkMatch } from './util.js';
import { startTimer, stopTimer, resumeTimer, formatTime } from './time.js';
import { renderBoard, updateCardImages } from './ui.js';
import { flipCard } from './flipCard.js';
import { endGame } from './endGame.js';

export default class Game {
    constructor(level = 'easy', category = 'animals') {
        this.level = level;
        this.category = category;
        this.deck = new Deck();
        this.timerId = null;
        this.timeLeft = 0;
        this.totalPairs = 0;
        this.matchedPairs = 0;
        this.flippedCards = [];
        this.cardClickHandler = this.flipCard.bind(this);
        this.busy = false; // Flag to prevent clicks while cards are flipping
        this.remainingTime = 0; // Store the remaining time
    }

    async start() {
        const levelConfig = levels[this.level] || levels.easy; // Fallback to 'easy'
        const boardSize = levelConfig.boardSize;
        this.totalPairs = (boardSize * boardSize) / 2;
        await this.deck.createDeck(this.category, this.totalPairs);
        this.deck.deal(this.cardClickHandler);
        renderBoard(this.deck, this.level, this.cardClickHandler);
        this.startTimer();
    }

    setLevel(level) {
        this.level = level;
        this.start();
    }

    startTimer() {
        this.timerId = startTimer(
            levels[this.level], // Pass level configuration
            this.remainingTime,
            (timeLeft) => {
                this.timeLeft = timeLeft;
                document.getElementById('time').innerText = formatTime(timeLeft);
            },
            () => this.endGame() // Timeout callback
        );
    }

    stopTimer() {
        if (this.timerId) {
            stopTimer(this.timerId);
            this.timerId = null;
            this.remainingTime = this.timeLeft; // Store remaining time when stopping
        }
    }

    resumeTimer() {
        if (!this.timerId) {
            this.timerId = resumeTimer(
                this.timerId,
                levels[this.level], // Pass level configuration
                this.remainingTime,
                (timeLeft) => {
                    this.timeLeft = timeLeft;
                    document.getElementById('time').innerText = formatTime(timeLeft);
                },
                () => this.endGame() // Timeout callback
            );
        }
    }

    flipCard(event) {
        flipCard(event, this); // Call the imported flipCard function
    }

    checkMatch() {
        checkMatch(this.flippedCards, this.deck, this); // Call the imported checkMatch function
    }

    updateCardImages() {
        updateCardImages(this.deck); // Call the imported updateCardImages function
    }

    endGame() {
        endGame(this); // Call the imported endGame function
    }
}
