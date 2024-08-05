export default class Card {
    constructor(value, imageUrl) {
        this.id = this.generateId();
        this.value = value;
        this.imageUrl = imageUrl;
        this.isFlipped = false;
        this.isMatched = false;
    }

    generateId() {
        return '_' + Math.random().toString(36).substring(2, 9);
    }

    toggleFlip() {
        this.isFlipped = !this.isFlipped;
    }

    hide() {
        this.isFlipped = false;
    }

    markAsMatched() {
        this.isMatched = true;
    }
}
