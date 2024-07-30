import { validateCity, fetchValidCountries } from "./validation.js";

document.addEventListener('DOMContentLoaded', async () => {
    const searchButton = document.getElementById('searchButton');
    const cityInput = document.getElementById('cityInput');
    const initialView = document.getElementById('initialView');
    const header = document.querySelector('#initialView h1');
    const errorContainer = document.getElementById('errorContainer');

    const morningImage = './../images/morning-sky-background.avif';
    const nightImage = './../images/night-sky-background.jpg';
    const gradientBackground = 'linear-gradient(to bottom, #FFD700, #FF4500)'; // Morning to noon gradient

    const now = new Date();
    const hours = now.getHours();

    let backgroundColor;
    let textColor;

    if (hours >= 6 && hours < 12) { // Morning (6 AM to 12 PM)
        backgroundColor = `url('${morningImage}') no-repeat center center fixed`;
        textColor = 'darkblue'; // Dark color for light background
    } else if (hours >= 18 || hours < 6) { // Night (6 PM to 6 AM)
        backgroundColor = `url('${nightImage}') no-repeat center center fixed`;
        textColor = 'cyan'; // Light color for dark background
    } else { // Noon and Evening (12 PM to 6 PM)
        backgroundColor = gradientBackground;
        textColor = '#333'; // Dark color for lighter gradient
    }

    initialView.style.background = backgroundColor;
    initialView.style.backgroundSize = 'cover';

    header.style.color = textColor;
    errorContainer.style.color = textColor;

    // Fetch valid countries on page load
    await fetchValidCountries();

    searchButton.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if (city) {
            const result = await validateCity(city);
            if (result.valid) {
                window.location.href = `view.html?city=${encodeURIComponent(city)}`;
            } else {
                showError(result.message); // Use message from validation
            }
        } else {
            showError('Please enter a city name.');
        }
    });

    const showError = (message) => {
        if (errorContainer) {
            errorContainer.textContent = message;
            errorContainer.style.display = 'block';
        }
        cityInput.value = ''; // Clear the input field
    };
});
