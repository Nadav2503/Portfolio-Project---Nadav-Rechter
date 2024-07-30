document.addEventListener('DOMContentLoaded', function () {
    const leaderboardContainer = document.querySelector('.leaderboard');
    const backToMenuButton = document.getElementById('back-to-menu');

    if (backToMenuButton) {
        backToMenuButton.addEventListener('click', () => {
            window.location.href = './index.html';
        });
    } else {
        console.error('Back to menu button not found.');
    }

    let leaderboardData = JSON.parse(localStorage.getItem('leaderboardData')) || [];

    updateLeaderboardDisplay();

    function updateLeaderboardDisplay() {
        leaderboardData.sort((a, b) => {
            // Sort by rounds descending, then by level (high > medium > easy)
            if (b.rounds !== a.rounds) {
                return b.rounds - a.rounds; // Sort rounds by descending order
            } else {
                const levelsOrder = { impossible: 4, high: 3, medium: 2, easy: 1 };
                return levelsOrder[b.level] - levelsOrder[a.level]; // Sort levels by difficulty
            }
        });

        leaderboardData.forEach((player, index) => {
            const entryElement = document.createElement('div');
            entryElement.classList.add('leaderboard-entry');

            if (index === 0) {
                entryElement.classList.add('gold');
                // Gold medal for first place
                const medalElement = document.createElement('img');
                medalElement.src = './images/gold-medal.png';
                medalElement.alt = 'Gold Medal';
                entryElement.appendChild(medalElement);
            } else if (index === 1) {
                entryElement.classList.add('silver');
                // Silver medal for second place
                const medalElement = document.createElement('img');
                medalElement.src = './images/silver-medal.png';
                medalElement.alt = 'Silver Medal';
                entryElement.appendChild(medalElement);
            } else if (index === 2) {
                entryElement.classList.add('bronze');
                // Bronze medal for third place
                const medalElement = document.createElement('img');
                medalElement.src = './images/bronze-medal.png';
                medalElement.alt = 'Bronze Medal';
                entryElement.appendChild(medalElement);
            }

            const textElement = document.createElement('span');
            textElement.textContent = `${player.name} - Rounds: ${player.rounds}`;
            entryElement.appendChild(textElement);

            leaderboardContainer.appendChild(entryElement);
        });
    }
});
