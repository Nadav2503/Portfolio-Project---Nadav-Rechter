// hourlyForecast.js

import { createForecastBox } from './createForecastBox.js';

// Display hourly forecast
export const displayHourlyForecast = (hourlyForecasts, timezoneOffset) => {
    const hourlyForecastContainer = document.getElementById('hourlyForecastContainer');
    if (!hourlyForecastContainer) return;

    // Clear previous content
    hourlyForecastContainer.innerHTML = '';

    // Convert timezone offset from seconds to milliseconds
    const timezoneOffsetInMilliseconds = timezoneOffset * 1000;

    // Manually adjust by subtracting 3 hours (10,800,000 milliseconds)
    const manualAdjustmentInMilliseconds = 3 * 60 * 60 * 1000;

    // Get the current time and create a reference to the next 24 hours
    const now = new Date();
    const nowTime = now.getTime();
    const endTime = nowTime + 24 * 60 * 60 * 1000; // 24 hours from now

    // Filter hourly forecasts for the next 24 hours
    const filteredHourlyForecasts = hourlyForecasts.filter((forecast) => {
        const forecastTime = new Date(forecast.dt * 1000 + timezoneOffsetInMilliseconds - manualAdjustmentInMilliseconds).getTime();
        return forecastTime >= nowTime && forecastTime <= endTime;
    });

    // Ensure forecasts are displayed in hourly order
    filteredHourlyForecasts.sort((a, b) => a.dt - b.dt);

    // Create and append forecast items
    filteredHourlyForecasts.forEach((forecast) => {
        const forecastItem = createForecastBox(forecast, timezoneOffset);
        hourlyForecastContainer.appendChild(forecastItem);
    });
};
