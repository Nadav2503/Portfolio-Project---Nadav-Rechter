export function checkCardMatch(flippedCards, deck, game) {
    const [firstCardData, secondCardData] = flippedCards;
    const firstCard = firstCardData.card;
    const secondCard = secondCardData.card;
    const firstCardElement = firstCardData.element;
    const secondCardElement = secondCardData.element;

    game.busy = true;

    if (firstCard.value === secondCard.value) {
        firstCard.markAsMatched();
        secondCard.markAsMatched();
        firstCardElement.removeEventListener('click', game.cardClickHandler);
        secondCardElement.removeEventListener('click', game.cardClickHandler);
        game.matchedPairs++;

        if (game.matchedPairs === game.totalPairs) {
            game.endGame();
        }

        game.busy = false;
    } else {
        game.stopTimer();
        setTimeout(() => {
            firstCard.hide();
            secondCard.hide();
            firstCardElement.style.backgroundImage = `url(${deck.cardBackImage})`;
            secondCardElement.style.backgroundImage = `url(${deck.cardBackImage})`;
            game.busy = false;
            game.resumeTimer();
        }, 1000);
    }

    flippedCards.length = 0;
}
