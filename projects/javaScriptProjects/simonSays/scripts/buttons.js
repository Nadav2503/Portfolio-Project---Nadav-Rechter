export function enableBoard(enabled) {
    const segments = document.querySelectorAll('.segment');
    segments.forEach(segment => {
        segment.classList.toggle('disabled', !enabled);
        segment.style.pointerEvents = enabled ? 'auto' : 'none';
    });
}

export function enableStartButton(enabled) {
    const startButton = document.getElementById('startGame');
    if (startButton) {
        startButton.disabled = !enabled;
        startButton.style.backgroundColor = "grey";
        startButton.style.cursor = "none";
    }
}

export function showRestartButton() {
    const restartButton = document.getElementById('restartGame');
    if (restartButton) {
        restartButton.classList.remove('hidden');
    }
}

export function hideRestartButton() {
    const restartButton = document.getElementById('restartGame');
    if (restartButton) {
        restartButton.classList.add('hidden');
    }
}
