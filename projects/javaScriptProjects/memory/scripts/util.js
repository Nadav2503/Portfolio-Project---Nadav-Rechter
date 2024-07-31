export function checkMatch(flippedCards, deck, game) {
    const [firstCardData, secondCardData] = flippedCards;
    const firstCard = firstCardData.card;
    const secondCard = secondCardData.card;
    const firstCardElement = firstCardData.element;
    const secondCardElement = secondCardData.element;

    game.busy = true; // Set the busy flag to true to disable clicks

    if (firstCard.value === secondCard.value) {
        // Cards match
        firstCard.match();
        secondCard.match();
        firstCardElement.removeEventListener('click', game.cardClickHandler);
        secondCardElement.removeEventListener('click', game.cardClickHandler);
        game.matchedPairs++;

        if (game.matchedPairs === game.totalPairs) {
            game.endGame();
        }

        game.busy = false; // Re-enable clicks immediately after a match
    } else {
        // Cards don't match
        game.stopTimer(); // Stop the timer during the mismatch
        setTimeout(() => {
            firstCard.hide();
            secondCard.hide();
            firstCardElement.style.backgroundImage = `url(${deck.cardBackImage})`;
            secondCardElement.style.backgroundImage = `url(${deck.cardBackImage})`;
            game.busy = false; // Re-enable clicks after hiding cards
            game.resumeTimer(); // Resume the timer from the stored remaining time
        }, 1000);
    }

    flippedCards.length = 0; // Clear flipped cards
}