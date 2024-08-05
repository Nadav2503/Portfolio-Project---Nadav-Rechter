export const isWinningCombo = (cells, symbol) => {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    return winningCombos.some(combo => {
        const [a, b, c] = combo;
        return cells[a].textContent === symbol &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent;
    });
};

export const isBoardFull = (cells) => {
    return Array.from(cells).every(cell => cell.textContent !== '');
};

export const incrementPlayerWin = (playerName) => {
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || {};
    if (!leaderboard[playerName]) {
        leaderboard[playerName] = { wins: 0, games: 0 };
    }
    leaderboard[playerName].wins += 1;
    leaderboard[playerName].games += 1;
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
};

export const recordGameDraw = (playerName) => {
    if (!playerName) return;
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || {};
    if (!leaderboard[playerName]) {
        leaderboard[playerName] = { wins: 0, games: 0 };
    }
    leaderboard[playerName].games += 1;
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
};
