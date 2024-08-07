export function displayGameOver(game) {
    game.stopTimer();
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.removeEventListener('click', game.cardClickHandler));

    const message = document.getElementById('end-game-message');
    message.style.display = 'block';
    message.innerHTML = game.matchedPairs === game.totalPairs
        ? `<h2>Congratulations!</h2><p>You won!</p>`
        : `<h2>Game Over!</h2><p>Time's up or not all pairs matched.</p>`;

    const restartButton = document.createElement('button');
    restartButton.innerText = 'Restart';
    restartButton.className = 'btn-primary';
    restartButton.addEventListener('click', () => {
        document.getElementById('level-selection').classList.remove('hidden');
        document.getElementById('start-game-btn').classList.remove('hidden');
        message.style.display = 'none';
        location.reload();
    });
    message.appendChild(restartButton);
    document.getElementById('level-selection').classList.add('hidden');
    document.getElementById('start-game-btn').classList.add('hidden');
}
