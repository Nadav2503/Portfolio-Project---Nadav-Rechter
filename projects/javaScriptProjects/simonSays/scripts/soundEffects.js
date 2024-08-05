export let successSound;
export let failureSound;
export let greenSound;
export let redSound;
export let yellowSound;
export let blueSound;
export let winSound;

export function loadSounds() {
    successSound = new Audio('./audio/success.mp3');
    failureSound = new Audio('./audio/failure.mp3');
    greenSound = new Audio('./audio/simonGreen.mp3');
    redSound = new Audio('./audio/simonRed.mp3');
    yellowSound = new Audio('./audio/simonYellow.mp3');
    blueSound = new Audio('./audio/simonBlue.mp3');
    winSound = new Audio('./audio/winning.mp3');
}

export function playSuccessSound() {
    successSound.play();
}

export function playFailureSound() {
    failureSound.play();
}

export function playWinSound() {
    winSound.play();
}

export function playSegmentSound(color) {
    switch (color) {
        case 'green':
            greenSound.play();
            break;
        case 'red':
            redSound.play();
            break;
        case 'yellow':
            yellowSound.play();
            break;
        case 'blue':
            blueSound.play();
            break;
        default:
            console.error('Unknown color:', color);
    }
}
