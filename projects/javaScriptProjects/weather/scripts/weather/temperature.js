import { applyTemperatureClass } from './background.js';

export const updateWeatherDetail = (id, icon, category, value) => {
    const element = document.getElementById(id);
    if (element) {
        const detailBox = document.createElement('div');
        detailBox.className = 'weather-box';

        if (id === 'weatherTemperature' || id === 'weatherFeelsLike') {
            applyTemperatureClass(detailBox, value);
        }

        detailBox.innerHTML = `
            <span class="detail-icon">${icon}</span>
            <span class="detail-category">${category}</span>
            <span class="detail-value">${value}</span>
        `;
        element.innerHTML = '';
        element.appendChild(detailBox);
    }
};
