import { displayHourlyForecast } from './hourlyForecast.js';
import { showDailyForecast } from './dailyForecast.js';

export const handleForecastData = (forecastData, timezoneOffset) => {
    displayHourlyForecast(forecastData.list, timezoneOffset);
    showDailyForecast(forecastData.list);
};
