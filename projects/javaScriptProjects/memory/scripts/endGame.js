export function endGame(game) {
    game.stopTimer();
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.removeEventListener('click', game.cardClickHandler));

    const message = document.getElementById('end-message');
    message.style.display = 'block'; // Show the message container
    message.innerHTML = game.matchedPairs === game.totalPairs
        ? `<h2>Congratulations!</h2><p>You won!</p>`
        : `<h2>Game Over!</h2><p>Time's up or not all pairs matched.</p>`;

    const restartButton = document.createElement('button');
    restartButton.innerText = 'Restart';
    restartButton.className = 'btn-primary';
    restartButton.addEventListener('click', () => location.reload());
    message.appendChild(restartButton);
}
