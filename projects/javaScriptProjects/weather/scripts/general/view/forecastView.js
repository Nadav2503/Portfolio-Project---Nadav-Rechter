import { handleForecastData } from './../../forecast/forecast.js';
import { showError, updateUI, applyForecastBoxBackgroundColor } from './domManipulations.js';
import { getForecastBoxColor } from './utils.js';

const forecastApiUrl = 'https://api.openweathermap.org/data/2.5/forecast';
const weatherApiKey = '857e6833020a76b352aabbaab070639c';

export const fetchForecast = async (lat, lon, timezoneOffset) => {
    try {
        const response = await fetch(`${forecastApiUrl}?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        handleForecastData(data, timezoneOffset);

        updateUI();

        const forecastBoxColor = getForecastBoxColor();
        applyForecastBoxBackgroundColor(forecastBoxColor);

    } catch (error) {
        showError(`Failed to fetch forecast: ${error.message}`);
    }
};
