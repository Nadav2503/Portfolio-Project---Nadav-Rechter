import { formatTimeWithAMPM } from './formatTime.js';
import { weatherIconMap, englishToHebrewMap } from './../general/icons.js';

export const createForecastBox = (forecast, timezoneOffset) => {
    const { dt, main, weather } = forecast;
    const { description } = weather[0];

    const date = new Date(dt * 1000 + timezoneOffset * 1000 - 3 * 60 * 60 * 1000);

    const formattedTime = formatTimeWithAMPM(date);

    const descriptionInHebrew = englishToHebrewMap[description.toLowerCase()] || 'לא ידוע';

    const iconSrc = weatherIconMap[description.toLowerCase()] || 'images/default.png';

    const forecastItem = document.createElement('div');
    forecastItem.className = 'forecast-box';

    const icon = document.createElement('img');
    icon.src = iconSrc;
    icon.alt = descriptionInHebrew;
    icon.className = 'forecast-icon';
    forecastItem.appendChild(icon);

    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'forecast-description';
    descriptionDiv.innerHTML = `
        <span class="hour">${formattedTime}</span>
        <span class="temperature">${Math.round(main.temp)}°C</span>
        <span class="desc">${descriptionInHebrew}</span>
    `;
    forecastItem.appendChild(descriptionDiv);

    return forecastItem;
};
