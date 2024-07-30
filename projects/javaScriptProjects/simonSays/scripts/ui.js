// ui.js
export function displayMessage(message) {
    const gameMessageElement = document.getElementById('gameMessage');
    if (gameMessageElement) {
        gameMessageElement.textContent = message;
        gameMessageElement.style.display = 'block';
    } else {
        console.error('Game message element not found!');
    }
}

export function addToLeaderboard(playerName, rounds, leaderboardData) {
    leaderboardData.push({ name: playerName, rounds: rounds });
    saveLeaderboardData(leaderboardData);
}

export function saveLeaderboardData(leaderboardData) {
    localStorage.setItem('leaderboardData', JSON.stringify(leaderboardData));
}
