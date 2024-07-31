export function flipCard(event, game) {
    if (game.busy) return; // Ignore clicks while busy

    const cardId = event.currentTarget.dataset.id;
    const card = game.deck.cards.find(c => c.id === cardId);

    if (card && !card.isFlipped && !card.isMatched) {
        card.flip();
        event.currentTarget.style.backgroundImage = `url(${card.imageUrl})`;

        game.flippedCards.push({ card, element: event.currentTarget });

        if (game.flippedCards.length === 2) {
            game.checkMatch();
        }
    }
}
