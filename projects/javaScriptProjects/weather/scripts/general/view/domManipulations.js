// domManipulations.js

const morningImage = './../images/morning-sky-background.avif';
const nightImage = './../images/night-sky-background.jpg';
const gradientBackground = 'linear-gradient(to bottom, #87CEFA, #FFD700)';

const applyForecastBoxBackgroundColor = (color) => {
    const forecastBoxes = document.querySelectorAll('.forecast-box');
    forecastBoxes.forEach(box => {
        box.style.backgroundColor = color;
    });
};

export const updateUI = () => {
    const now = new Date();
    const hours = now.getHours();

    let backgroundColor;
    let textColor;
    let forecastBoxColor;

    if (hours >= 6 && hours < 12) { // Morning (6 AM to 12 PM)
        backgroundColor = `url('${morningImage}') no-repeat center center fixed`;
        textColor = 'darkblue';
        forecastBoxColor = '#E1F5FE'; // Light blue
    } else if (hours >= 18 || hours < 6) { // Night (6 PM to 6 AM)
        backgroundColor = `url('${nightImage}') no-repeat center center fixed`;
        textColor = 'cyan';
        forecastBoxColor = '#01579B'; // Dark blue
    } else { // Noon and Evening (12 PM to 6 PM)
        backgroundColor = gradientBackground;
        textColor = '#333';
        forecastBoxColor = '#90A4AE'; // Greyish blue
    }

    const viewContainer = document.getElementById('viewContainer');
    if (viewContainer) {
        viewContainer.style.background = backgroundColor;
        viewContainer.style.backgroundSize = 'cover';
    }

    const header = document.querySelector('#viewContainer h1');
    if (header) {
        header.style.color = textColor;
    }

    const errorContainer = document.getElementById('errorContainer');
    if (errorContainer) {
        errorContainer.style.color = textColor;
    }

    const forecastHeaders = document.querySelectorAll('#hourlyForecast h3, #dailyForecast h3');
    forecastHeaders.forEach(header => {
        header.style.color = textColor;
        header.style.textAlign = 'center';
    });

    // Ensure forecast boxes are updated with the correct color
    applyForecastBoxBackgroundColor(forecastBoxColor);
};

const showError = (message) => {
    const errorContainer = document.getElementById('errorContainer');
    if (errorContainer) {
        errorContainer.textContent = message;
        errorContainer.style.display = 'block';
    }
    const weatherContainer = document.getElementById('weatherContainer');
    if (weatherContainer) {
        weatherContainer.style.display = 'none';
    }
    const hourlyForecast = document.getElementById('hourlyForecast');
    if (hourlyForecast) {
        hourlyForecast.style.display = 'none';
    }
    const dailyForecast = document.getElementById('dailyForecast');
    if (dailyForecast) {
        dailyForecast.style.display = 'none';
    }
};

export { showError, applyForecastBoxBackgroundColor };
