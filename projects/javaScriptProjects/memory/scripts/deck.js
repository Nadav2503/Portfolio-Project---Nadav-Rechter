import Card from './card.js';
import { imageCategories } from './images.js';


export default class Deck {
    constructor() {
        this.cards = [];
        this.imageUrls = [];
        this.category = 'nature'; // Default category, can be set externally
        this.cardBackImage = ''; // To hold the back image URL
    }

    async createDeck(category, numPairs) {
        this.category = category; // Set the category
        this.cardBackImage = this.getCardBackImage(); // Get the back image based on category
        this.imageUrls = this.loadImages(category, numPairs);
        this.cards = []; // Reset the cards array

        // Create card pairs
        for (let i = 0; i < numPairs; i++) {
            const imageUrl = this.imageUrls[i];
            this.cards.push(new Card(i, imageUrl));
            this.cards.push(new Card(i, imageUrl)); // Add the pair
        }

        this.shuffle();
    }

    loadImages(category, numPairs) {
        const imageUrls = imageCategories[category] || [];
        if (imageUrls.length < numPairs) {
            console.error('Not enough images available in the category.');
            return [];
        }

        // Ensure unique images and select the needed number
        const selectedImages = [];
        const shuffled = imageUrls.sort(() => 0.5 - Math.random());
        for (let i = 0; i < numPairs; i++) {
            selectedImages.push(shuffled[i]);
        }
        return selectedImages;
    }

    getCardBackImage() {
        // Return the back image based on the category
        switch (this.category) {
            case 'nature':
                return './../assets/nature/backCard.jpg';
            case 'animals':
                return './../assets/animals/backCard.jpg';
            case 'sports':
                return './../assets/sports/backCard.jpg';
            default:
                return './../assets/nature/backCard.jpg'; // Fallback
        }
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    deal(cardClickHandler) {
        const gameBoard = document.getElementById('game-board');
        gameBoard.innerHTML = ''; // Clear existing content

        // Determine the grid layout based on the board size
        const boardSize = Math.sqrt(this.cards.length); // Assuming board is square
        gameBoard.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;


        this.cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.id = card.id;
            cardElement.dataset.value = card.value; // Store card value for match checking
            cardElement.style.backgroundImage = `url(${this.cardBackImage})`; // Set card back image

            // Add event listener correctly
            cardElement.addEventListener('click', (event) => cardClickHandler(card, cardElement));

            // Append card to the game board
            gameBoard.appendChild(cardElement);
        });
    }
}
