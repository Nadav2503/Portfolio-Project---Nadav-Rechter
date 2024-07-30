// weather.js

import { englishToHebrewMap, weatherEmojiMap, weatherIconMap } from './../general/icons.js';
import { showWeatherDetails } from './weatherDetails.js';
import { showWindDetails } from './windDetails.js';
import { showTimeDetails } from './timeDetails.js';

// Main function to show weather data
export const showWeather = (data) => {
    const weatherData = data.weather[0];
    const descriptionInEnglish = weatherData.description.toLowerCase();
    const descriptionInHebrew = englishToHebrewMap[descriptionInEnglish] || 'לא ידוע';
    const emoji = weatherEmojiMap[descriptionInEnglish] || '❓';
    const descriptionImage = weatherIconMap[descriptionInEnglish] || 'images/default.png';

    console.log(`Weather description: ${descriptionInEnglish}`); // Debugging line
    console.log(`Icon path: ${descriptionImage}`); // Debugging line
    // Update City Name
    const weatherCity = document.getElementById('weatherCity');
    if (weatherCity) {
        weatherCity.textContent = `עיר: ${data.name}`;
    }

    // Update Weather Description
    const weatherDescription = document.getElementById('weatherDescription');
    if (weatherDescription) {
        weatherDescription.innerHTML = `
            <div class="weather-box">
                <img src="${descriptionImage}" alt="${descriptionInEnglish} icon">
                <div>
                    <span class="detail-category">מצב:</span>
                    <span class="detail-value">${descriptionInHebrew} ${emoji}</span>
                </div>
            </div>
        `;
    }

    // Update Weather and Wind Details
    showWeatherDetails(data);
    showWindDetails(data.wind);
    showTimeDetails(data);

    // Show Weather Container and Hide Error Container
    const weatherContainer = document.getElementById('weatherContainer');
    if (weatherContainer) {
        weatherContainer.style.display = 'flex';
    }

    const errorContainer = document.getElementById('errorContainer');
    if (errorContainer) {
        errorContainer.style.display = 'none';
    }
};
