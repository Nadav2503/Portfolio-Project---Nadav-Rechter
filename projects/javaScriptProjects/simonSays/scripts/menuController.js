document.addEventListener('DOMContentLoaded', function () {
    const startGameButton = document.getElementById('startGame');
    const playerNameInput = document.getElementById('playerName');
    const difficultyLevelSelect = document.getElementById('difficultyLevel');
    const messageElement = document.getElementById('message');

    function showMessage(message) {
        if (messageElement) {
            messageElement.textContent = message;
            messageElement.style.display = 'block';
        }
    }

    startGameButton.addEventListener('click', function () {
        const playerName = playerNameInput.value.trim();
        const selectedLevel = difficultyLevelSelect.value;

        if (playerName && selectedLevel) {
            window.location.href = `./game.html?playerName=${encodeURIComponent(playerName)}&level=${encodeURIComponent(selectedLevel)}`;
        } else {
            showMessage('Please enter your name and select a difficulty level.');
        }
    });
    document.getElementById('viewLeaderboard').addEventListener('click', function () {
        window.location.href = './leaderboard.html';
    });
});

