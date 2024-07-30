// createForecastBox.js

import { formatTimeWithAMPM } from './formatTime.js';
import { weatherIconMap, englishToHebrewMap } from './../general/icons.js';

// Create and append forecast item to container
export const createForecastBox = (forecast, timezoneOffset) => {
    const { dt, main, weather } = forecast;
    const { description } = weather[0];

    // Convert UNIX timestamp to Date object and apply timezone offset and manual adjustment
    const date = new Date(dt * 1000 + timezoneOffset * 1000 - 3 * 60 * 60 * 1000);

    // Format time
    const formattedTime = formatTimeWithAMPM(date);

    // Get Hebrew description
    const descriptionInHebrew = englishToHebrewMap[description.toLowerCase()] || 'לא ידוע';

    // Get weather icon based on description
    const iconSrc = weatherIconMap[description.toLowerCase()] || 'images/default.png';

    // Create forecast item
    const forecastItem = document.createElement('div');
    forecastItem.className = 'forecast-box';

    // Create and append icon
    const icon = document.createElement('img');
    icon.src = iconSrc;
    icon.alt = descriptionInHebrew;
    icon.className = 'forecast-icon';
    forecastItem.appendChild(icon);

    console.log(`Weather Description: ${description}`);
    console.log(`Icon Source: ${iconSrc}`);
    // Create and append description
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
