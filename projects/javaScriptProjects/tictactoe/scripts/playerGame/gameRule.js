export const determineWinner = (boardState) => {
    const winningPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let pattern of winningPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return boardState[a];
        }
    }
    return null;
};

export const isDraw = (boardState) => boardState.every(cell => cell !== null);

export const recordWin = (playerName) => {
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || {};
    if (!leaderboard[playerName]) {
        leaderboard[playerName] = { wins: 0, games: 0 };
    }
    leaderboard[playerName].wins += 1;
    leaderboard[playerName].games += 1;
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
};

export const recordDraw = (playerName) => {
    if (!playerName) return;
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || {};
    if (!leaderboard[playerName]) {
        leaderboard[playerName] = { wins: 0, games: 0 };
    }
    leaderboard[playerName].games += 1;
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
};
