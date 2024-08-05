export function displayMessage(message) {
    const messageElement = document.getElementById('gameMessage');
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.style.display = 'block';
    }
}

export function addToLeaderboard(playerName, rounds, leaderboardData) {
    leaderboardData.push({ name: playerName, rounds: rounds });
}

export function saveLeaderboardData(leaderboardData) {
    localStorage.setItem('leaderboardData', JSON.stringify(leaderboardData));
}
