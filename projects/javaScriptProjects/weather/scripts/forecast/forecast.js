// forecast.js

import { displayHourlyForecast } from './hourlyForecast.js';
import { showDailyForecast } from './dailyForecast.js';

// Function to handle forecast data
export const handleForecastData = (forecastData, timezoneOffset) => {
    displayHourlyForecast(forecastData.list, timezoneOffset);
    showDailyForecast(forecastData.list); // Assuming this doesn't need timezone adjustment
};
