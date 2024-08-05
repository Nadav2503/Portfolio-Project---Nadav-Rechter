import { playSegmentSound } from "./soundEffects.js";
export function createSequence(rounds) {
    const COLOR_OPTIONS = ['green', 'red', 'yellow', 'blue'];
    const newSequence = [];
    for (let i = 0; i < rounds; i++) {
        const randomIndex = Math.floor(Math.random() * COLOR_OPTIONS.length);
        newSequence.push(COLOR_OPTIONS[randomIndex]);
    }
    return newSequence;
}

export function showSequence(gameState, gameSpeed) {
    let index = 0;
    const sequenceDisplayInterval = setInterval(() => {
        playSegmentSound(gameState.sequence[index]);
        highlightColorSegment(gameState.sequence[index], gameSpeed);
        index++;
        if (index >= gameState.round) {
            clearInterval(sequenceDisplayInterval);
            gameState.isComputerTurn = false;
        }
    }, gameSpeed);
}

export function highlightColorSegment(color, gameSpeed) {
    const segment = document.querySelector(`.segment[data-color="${color}"]`);
    if (segment) {
        segment.classList.add('active');
        setTimeout(() => {
            segment.classList.remove('active');
        }, gameSpeed / 2);
    }
}
