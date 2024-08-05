export function startTimer(level, remainingTime, onUpdate, onTimeout) {
    const levelTimer = level?.timer || 60;
    let timeLeft = remainingTime || levelTimer;

    const timerId = setInterval(() => {
        timeLeft--;
        onUpdate(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(timerId);
            onTimeout();
        }
    }, 1000);

    return timerId;
}

export function stopTimer(timerId) {
    clearInterval(timerId);
}

export function resumeTimer(timerId, level, remainingTime, onUpdate, onTimeout) {
    if (!timerId) {
        return startTimer(level, remainingTime, onUpdate, onTimeout);
    }
    return timerId;
}

export function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
