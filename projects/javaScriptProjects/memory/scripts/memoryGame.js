import CardDeck from './cardDeck.js';
import { levels } from './gameLevels.js';
import { checkCardMatch } from './utilities.js';
import { startTimer, stopTimer, resumeTimer, formatTime } from './timer.js';
import { renderBoard, updateCardImages } from './ui.js';
import { handleCardFlip } from './cardFlip.js';
import { displayGameOver } from './gameOver.js';

export default class MemoryGame {
    constructor(level = 'easy', category = 'animals') {
        this.level = level;
        this.category = category;
        this.deck = new CardDeck();
        this.timerId = null;
        this.timeLeft = 0;
        this.totalPairs = 0;
        this.matchedPairs = 0;
        this.flippedCards = [];
        this.cardClickHandler = this.handleCardFlip.bind(this);
        this.busy = false;
        this.remainingTime = 0;
    }

    async start() {
        const levelConfig = levels[this.level] || levels.easy;
        const boardSize = levelConfig.boardSize;
        this.totalPairs = (boardSize * boardSize) / 2;
        await this.deck.initializeDeck(this.category, this.totalPairs);
        this.deck.renderDeck(this.cardClickHandler);
        renderBoard(this.deck, this.level, this.cardClickHandler);
        this.startTimer();
        document.getElementById('level-selection').classList.add('hidden');
        document.getElementById('start-game-btn').classList.add('hidden');
    }

    setLevel(level) {
        this.level = level;
        this.start();
    }

    startTimer() {
        this.timerId = startTimer(
            levels[this.level],
            this.remainingTime,
            (timeLeft) => {
                this.timeLeft = timeLeft;
                document.getElementById('timer').innerText = formatTime(timeLeft);
            },
            () => this.endGame()
        );
    }

    stopTimer() {
        if (this.timerId) {
            stopTimer(this.timerId);
            this.timerId = null;
            this.remainingTime = this.timeLeft;
        }
    }

    resumeTimer() {
        if (!this.timerId) {
            this.timerId = resumeTimer(
                this.timerId,
                levels[this.level],
                this.remainingTime,
                (timeLeft) => {
                    this.timeLeft = timeLeft;
                    document.getElementById('timer').innerText = formatTime(timeLeft);
                },
                () => this.endGame()
            );
        }
    }

    handleCardFlip(event) {
        handleCardFlip(event, this);
    }

    checkCardMatch() {
        checkCardMatch(this.flippedCards, this.deck, this);
    }

    updateCardImages() {
        updateCardImages(this.deck);
    }

    endGame() {
        displayGameOver(this);
    }
}
