// background.js

export const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'אחה"צ' : 'לפנה"צ';

    // Check if the time is exactly midnight or noon
    if (hours === 0) {
        return `חצות`;
    }

    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'

    return `${hours}:${minutes} ${ampm}`;
};

export const getCompassDirection = (degree) => {
    const directions = [
        'north', 'north-east', 'east', 'south-east',
        'south', 'south-west', 'west', 'north-west'
    ];
    const index = Math.round(degree / 45) % 8;
    return directions[index];
};

export const getHumidityColor = (humidity) => {
    if (humidity < 30) return { start: '#00aaff', end: '#aaffff' };
    if (humidity < 60) return { start: '#00ffaa', end: '#aaffaa' };
    return { start: '#aa0000', end: '#ffaaaa' };
};

export const applyTemperatureClass = (element, temperature) => {
    if (temperature < 0) {
        element.classList.add('cold');
    } else if (temperature > 30) {
        element.classList.add('hot');
    } else {
        element.classList.add('mild');
    }
};
