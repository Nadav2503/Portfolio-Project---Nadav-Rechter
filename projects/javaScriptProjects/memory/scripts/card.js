export default class Card {
    constructor(value, imageUrl) {
        this.id = this.generateUniqueId();
        this.value = value;
        this.imageUrl = imageUrl;
        this.isFlipped = false;
        this.isMatched = false;
    }

    generateUniqueId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    flip() {
        this.isFlipped = !this.isFlipped;
    }

    hide() {
        this.isFlipped = false;
    }

    match() {
        this.isMatched = true;
    }
}
