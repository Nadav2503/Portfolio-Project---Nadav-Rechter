// windDetails.js

import { getCompassDirection } from './background.js';
import { windIconMap, englishToHebrewMap } from './../general/icons.js';

// Update Wind Details
export const showWindDetails = (windData) => {
    const windDirection = getCompassDirection(windData.deg || 0);
    const windDirectionInHebrew = englishToHebrewMap[windDirection] || 'לא ידוע';
    const windImage = windIconMap[windDirection] || 'images/default.png';

    const windElement = document.getElementById('weatherWind');
    if (windElement) {
        windElement.innerHTML = `
            <div class="background-image" style="background-image: url(${windImage});"></div>
            <div class="wind-box">
                <div class="wind-icon"></div>
                <div class="wind-details">
                    <div class="wind-detail">
                        <span class="detail-category">מהירות הרוח:</span>
                        <div class="detail-value">
                            <span class="detail-icon">🌬️</span>
                            ${(windData.speed || 0).toFixed(2)} קמ"ש
                        </div>
                    </div>
                    <div class="wind-detail">
                        <span class="detail-category">כיוון הרוח:</span>
                        <div class="detail-value">${windDirectionInHebrew}</div>
                    </div>
                </div>
            </div>
        `;
    }
};
