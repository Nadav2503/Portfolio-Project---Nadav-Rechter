import Card from './card.js';
import { imageCategories, cardBackImages } from './imageSources.js';

export default class CardDeck {
    constructor() {
        this.cards = [];
        this.category = 'nature';
        this.cardBackImage = '';
    }

    async initializeDeck(category, pairCount) {
        this.category = category;
        this.cardBackImage = cardBackImages[this.category] || cardBackImages['nature'];
        this.imageUrls = this.fetchImages(category, pairCount);
        this.cards = [];

        for (let i = 0; i < pairCount; i++) {
            const imageUrl = this.imageUrls[i];
            this.cards.push(new Card(i, imageUrl));
            this.cards.push(new Card(i, imageUrl));
        }

        this.shuffleDeck();
    }

    fetchImages(category, pairCount) {
        const imageUrls = imageCategories[category] || [];
        if (imageUrls.length < pairCount) {
            return [];
        }

        const selectedImages = [];
        const shuffled = imageUrls.sort(() => 0.5 - Math.random());
        for (let i = 0; i < pairCount; i++) {
            selectedImages.push(shuffled[i]);
        }
        return selectedImages;
    }

    shuffleDeck() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    renderDeck(onCardClick) {
        const gameBoard = document.getElementById('game-board');
        gameBoard.innerHTML = '';
        const gridSize = Math.sqrt(this.cards.length);
        gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
        this.cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.id = card.id;
            cardElement.dataset.value = card.value;
            cardElement.style.backgroundImage = `url(${this.cardBackImage})`;
            cardElement.addEventListener('click', () => onCardClick(card, cardElement));
            gameBoard.appendChild(cardElement);
        });
    }
}
