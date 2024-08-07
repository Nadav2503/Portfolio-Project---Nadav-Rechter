import { validateCityName, fetchAvailableCountries } from "./validation.js";

document.addEventListener('DOMContentLoaded', async () => {
    const searchCityButton = document.getElementById('searchCityButton');
    const citySearchInput = document.getElementById('citySearchInput');
    const initialSearchView = document.getElementById('initialSearchView');
    const pageHeader = document.querySelector('#initialSearchView h1');
    const searchErrorContainer = document.getElementById('searchErrorContainer');

    if (initialSearchView) {
        const morningBackgroundImage = 'images/morning-sky-background.jpg';
        const nightBackgroundImage = 'images/night-sky-background.jpg';
        const noonToEveningGradient = 'linear-gradient(to bottom, #FFD700, #FF4500)';

        const currentDate = new Date();
        const currentHour = currentDate.getHours();

        let backgroundStyle;
        let textColorStyle;

        if (currentHour >= 6 && currentHour < 12) {
            backgroundStyle = `url('${morningBackgroundImage}') no-repeat center center fixed`;
            textColorStyle = 'darkblue';
        } else if (currentHour >= 18 || currentHour < 6) {
            backgroundStyle = `url('${nightBackgroundImage}') no-repeat center center fixed`;
            textColorStyle = 'cyan';
        } else {
            backgroundStyle = noonToEveningGradient;
            textColorStyle = '#333';
        }
        initialSearchView.style.background = backgroundStyle;
        initialSearchView.style.backgroundSize = 'cover';

        if (pageHeader) {
            pageHeader.style.color = textColorStyle;
        }
        if (searchErrorContainer) {
            searchErrorContainer.style.color = textColorStyle;
        }
    }

    await fetchAvailableCountries();

    if (searchCityButton && citySearchInput) {
        searchCityButton.addEventListener('click', async () => {
            const cityName = citySearchInput.value.trim();
            if (cityName) {
                const validationResult = await validateCityName(cityName);
                if (validationResult.isValid) {
                    window.location.href = `weather-details.html?city=${encodeURIComponent(cityName)}`;
                } else {
                    displayError(validationResult.message);
                }
            } else {
                displayError('בבקשה הכנס/י עיר שקיימת בעולם');
            }
        });
    }

    const displayError = (message) => {
        if (searchErrorContainer) {
            searchErrorContainer.textContent = message;
            searchErrorContainer.style.display = 'block';
        }
        if (citySearchInput) {
            citySearchInput.value = '';
        }
    };
});
