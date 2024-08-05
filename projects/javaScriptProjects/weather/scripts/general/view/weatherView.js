import { showWeather } from '../../weather/weather.js';
import { fetchForecast } from './forecastView.js';
import { displayLocalTime } from './utils.js';
import { showError } from './domManipulations.js';

const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const weatherApiKey = '857e6833020a76b352aabbaab070639c';

export const fetchWeather = async (city) => {
    try {
        const response = await fetch(`${weatherApiUrl}?q=${city}&appid=${weatherApiKey}&units=metric`);
        if (!response.ok) throw new Error('City not found or API error');
        const data = await response.json();

        showWeather(data);

        const { lat, lon } = data.coord;
        const timezoneOffset = data.timezone;

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
        showError(error.message);
    }
};
