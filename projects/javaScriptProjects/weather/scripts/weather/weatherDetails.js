import { updateWeatherDetail } from './temperature.js';
import { getHumidityColor } from './background.js';

export const showWeatherDetails = (data) => {
    updateWeatherDetail('weatherTemperature', '🌡️', 'טמפרטורה:', Math.round(data.main.temp || 0));
    updateWeatherDetail('weatherFeelsLike', '😓', 'מרגיש כמו:', Math.round(data.main.feels_like || 0));
    updatePressureDetail(data.main.pressure || 0);
    updateWeatherDetail('weatherUvIndex', '☀️', 'מדד קרינה:', data.current?.uvi?.toFixed(1) || 0);
    updateRainChance(data.rain?.["1h"] || 0);
    updateHumidity(data.main.humidity || 0);
};

const updatePressureDetail = (pressure) => {
    const pressureElement = document.getElementById('weatherPressure');
    if (pressureElement) {
        let pressureClass = '';
        if (pressure < 1000) pressureClass = 'low-pressure';
        else if (pressure <= 1020) pressureClass = 'normal-pressure';
        else pressureClass = 'high-pressure';

        pressureElement.className = `weather-box ${pressureClass}`;
        pressureElement.innerHTML = `
            <span class="detail-icon">🌀</span>
            <span class="detail-category">לחץ אוויר:</span>
            <span class="detail-value">${pressure} hPa</span>
        `;
    }
};

const updateRainChance = (rainChance) => {
    const rainChanceElement = document.getElementById('weatherRainChance');
    if (rainChanceElement) {
        let rainClass = rainChance > 50 ? 'high-rain' : rainChance > 10 ? 'low-rain' : 'no-rain';
        rainChanceElement.className = `weather-box ${rainClass}`;
        rainChanceElement.innerHTML = `
            <span class="detail-icon">🌧️</span>
            <span class="detail-category">סיכוי לגשם:</span>
            <span class="detail-value">${rainChance}%</span>
        `;
    }
};

const updateHumidity = (humidity) => {
    const humidityElement = document.getElementById('weatherHumidity');
    if (humidityElement) {
        const { start, end } = getHumidityColor(humidity);
        humidityElement.style.background = `linear-gradient(135deg, ${start} 0%, ${end} 100%)`;

        humidityElement.innerHTML = `
            <div class="weather-box">
                <span class="detail-icon">💧</span>
                <span class="detail-category">לחות:</span>
                <span class="detail-value">${humidity}%</span>
            </div>
        `;
    }
};
