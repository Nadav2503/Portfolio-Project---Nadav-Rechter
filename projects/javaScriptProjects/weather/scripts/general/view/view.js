import { fetchWeather } from './weatherView.js';
import { updateUI } from './domManipulations.js';

document.addEventListener('DOMContentLoaded', () => {
    updateUI();

    const returnButton = document.getElementById('returnButton');
    returnButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    const params = new URLSearchParams(window.location.search);
    const city = params.get('city');

    if (city) {
        fetchWeather(city);
    }
});
