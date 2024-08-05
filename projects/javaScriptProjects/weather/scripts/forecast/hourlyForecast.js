import { createForecastBox } from './createForecastBox.js';

export const displayHourlyForecast = (hourlyForecasts, timezoneOffset) => {
    const hourlyForecastContainer = document.getElementById('hourlyForecastContainer');
    if (!hourlyForecastContainer) return;

    hourlyForecastContainer.innerHTML = '';

    const timezoneOffsetInMilliseconds = timezoneOffset * 1000;

    const manualAdjustmentInMilliseconds = 3 * 60 * 60 * 1000;

    const now = new Date();
    const nowTime = now.getTime();
    const endTime = nowTime + 24 * 60 * 60 * 1000;

    const filteredHourlyForecasts = hourlyForecasts.filter((forecast) => {
        const forecastTime = new Date(forecast.dt * 1000 + timezoneOffsetInMilliseconds - manualAdjustmentInMilliseconds).getTime();
        return forecastTime >= nowTime && forecastTime <= endTime;
    });

    filteredHourlyForecasts.sort((a, b) => a.dt - b.dt);

    filteredHourlyForecasts.forEach((forecast) => {
        const forecastItem = createForecastBox(forecast, timezoneOffset);
        hourlyForecastContainer.appendChild(forecastItem);
    });
};
