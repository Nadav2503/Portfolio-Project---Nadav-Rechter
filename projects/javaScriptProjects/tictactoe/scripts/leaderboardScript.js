// leaderboardScript.js
document.addEventListener('DOMContentLoaded', () => {
    const leaderboardContainer = document.querySelector('.leaderboard');
    const backToMenuButton = document.getElementById('back-to-menu');

    function updateLeaderboard() {
        const wins = JSON.parse(localStorage.getItem('leaderboard')) || {};
        leaderboardContainer.innerHTML = ''; // Clear existing entries

        // Sort players by win count, then by games played
        const sortedPlayers = Object.entries(wins)
            .sort(([nameA, dataA], [nameB, dataB]) => {
                if (dataB.wins !== dataA.wins) return dataB.wins - dataA.wins;
                return dataA.games - dataB.games;
            });

        // Generate leaderboard entries
        if (sortedPlayers.length > 0) {
            sortedPlayers.forEach(([name, { wins, games }], index) => {
                const entry = document.createElement('div');
                entry.classList.add('leaderboard-entry');

                let rankClass = '';
                let medalImage = '';

                switch (index) {
                    case 0:
                        rankClass = 'gold';
                        medalImage = 'images/gold-medal.png';
                        break;
                    case 1:
                        rankClass = 'silver';
                        medalImage = 'images/silver-medal.png';
                        break;
                    case 2:
                        rankClass = 'bronze';
                        medalImage = 'images/bronze-medal.png';
                        break;
                    default:
                        rankClass = 'default';
                        medalImage = ''; // No medal for other positions
                        break;
                }

                entry.classList.add(rankClass);
                entry.innerHTML = `
                    <img src="${medalImage}" alt="${rankClass} medal">
                    <span>${index + 1}. ${name}</span> 
                    <span>${wins} Wins (${games} Games)</span>
                `;
                leaderboardContainer.appendChild(entry);
            });
        } else {
            const noDataMessage = document.createElement('p');
            noDataMessage.textContent = 'No leaderboard data available.';
            leaderboardContainer.appendChild(noDataMessage);
        }
    }

    updateLeaderboard();

    backToMenuButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});
