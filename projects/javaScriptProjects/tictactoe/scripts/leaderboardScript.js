document.addEventListener('DOMContentLoaded', () => {
    const leaderboardContainerElement = document.querySelector('.leaderboard');
    const backToMenuButtonElement = document.getElementById('back-to-menu');

    function refreshLeaderboard() {
        const leaderboardData = JSON.parse(localStorage.getItem('leaderboard')) || {};
        leaderboardContainerElement.innerHTML = '';

        const sortedPlayerEntries = Object.entries(leaderboardData)
            .sort(([playerNameA, statsA], [playerNameB, statsB]) => {
                if (statsB.wins !== statsA.wins) return statsB.wins - statsA.wins;
                return statsA.games - statsB.games;
            });

        if (sortedPlayerEntries.length > 0) {
            sortedPlayerEntries.forEach(([playerName, { wins, games }], rank) => {
                const leaderboardEntryElement = document.createElement('div');
                leaderboardEntryElement.classList.add('leaderboard-entry');

                let medalClass = '';
                let medalImageSrc = '';

                switch (rank) {
                    case 0:
                        medalClass = 'gold';
                        medalImageSrc = 'images/gold-medal.png';
                        break;
                    case 1:
                        medalClass = 'silver';
                        medalImageSrc = 'images/silver-medal.png';
                        break;
                    case 2:
                        medalClass = 'bronze';
                        medalImageSrc = 'images/bronze-medal.png';
                        break;
                    default:
                        medalClass = 'default';
                        medalImageSrc = '';
                        break;
                }

                leaderboardEntryElement.classList.add(medalClass);
                leaderboardEntryElement.innerHTML = `
                    <img src="${medalImageSrc}" alt="${medalClass} medal">
                    <span>${rank + 1}. ${playerName}</span> 
                    <span>${wins} Wins (${games} Games)</span>
                `;
                leaderboardContainerElement.appendChild(leaderboardEntryElement);
            });
        } else {
            const noDataMessageElement = document.createElement('p');
            noDataMessageElement.textContent = 'No leaderboard data available.';
            leaderboardContainerElement.appendChild(noDataMessageElement);
        }
    }

    refreshLeaderboard();

    backToMenuButtonElement.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});
