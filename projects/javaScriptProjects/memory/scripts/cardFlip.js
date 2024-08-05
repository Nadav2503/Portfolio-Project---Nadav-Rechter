export function handleCardFlip(event, game) {
    if (game.busy) return;

    const cardId = event.currentTarget.dataset.id;
    const card = game.deck.cards.find(c => c.id === cardId);

    if (card && !card.isFlipped && !card.isMatched) {
        card.toggleFlip();
        event.currentTarget.style.backgroundImage = `url(${card.imageUrl})`;

        game.flippedCards.push({ card, element: event.currentTarget });

        if (game.flippedCards.length === 2) {
            game.checkCardMatch();
        }
    }
}
