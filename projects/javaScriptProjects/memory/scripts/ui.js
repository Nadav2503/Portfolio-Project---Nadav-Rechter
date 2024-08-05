import { levels } from './gameLevels.js';

export function renderBoard(deck, level, cardClickHandler) {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    gameBoard.className = `level-${levels[level].boardSize}`;

    deck.cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card.id;
        cardElement.style.backgroundImage = `url(${deck.cardBackImage})`;
        cardElement.addEventListener('click', cardClickHandler);
        gameBoard.appendChild(cardElement);
    });
}

export function updateCardImages(deck) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(cardElement => {
        const card = deck.cards.find(c => c.id === cardElement.dataset.id);
        if (card) {
            cardElement.style.backgroundImage = `url(${card.isFlipped ? card.imageUrl : deck.cardBackImage})`;
        }
    });
}
