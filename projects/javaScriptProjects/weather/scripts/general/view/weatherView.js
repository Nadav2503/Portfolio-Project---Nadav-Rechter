import { showWeather } from '../../weather/weather.js';
import { fetchForecast } from './forecastView.js';
import { displayLocalTime } from './utils.js';
import { showError } from './domManipulations.js'; // Import should match the export

const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const weatherApiKey = '857e6833020a76b352aabbaab070639c';

export const fetchWeather = async (city) => {
    try {
        console.log(`Fetching weather for city: ${city}`);
        const response = await fetch(`${weatherApiUrl}?q=${city}&appid=${weatherApiKey}&units=metric`);
        if (!response.ok) throw new Error('City not found or API error');
        const data = await response.json();
        console.log('Weather data:', data);

        showWeather(data);

        const { lat, lon } = data.coord;
        const timezoneOffset = data.timezone; // Timezone offset in seconds from UTC

        console.log(`Timezone offset: ${timezoneOffset} seconds`);

        if (!lat || !lon) {
            throw new Error('Latitude and Longitude information not available');
        }

        fetchForecast(lat, lon, timezoneOffset);
        displayLocalTime(timezoneOffset, data.sys.sunrise, data.sys.sunset);

        const weatherContainer = document.getElementById('weatherContainer');
        const hourlyForecast = document.getElementById('hourlyForecast');
        const dailyForecast = document.getElementById('dailyForecast');

        if (weatherContainer) {
            weatherContainer.style.display = 'flex';
        }
        if (hourlyForecast) {
            hourlyForecast.style.display = 'block';
        }
        if (dailyForecast) {
            dailyForecast.style.display = 'block';
        }
    } catch (error) {
        console.error('Error fetching weather:', error);
        showError(error.message); // Now it should work
    }
};
