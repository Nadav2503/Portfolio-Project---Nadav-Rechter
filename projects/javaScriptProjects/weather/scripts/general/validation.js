const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const weatherApiKey = '857e6833020a76b352aabbaab070639c';
const countriesApiUrl = 'https://restcountries.com/v3.1/all';

export let validCountries = [];
const exceptions = [
    'mexico',         // Mexico City
    'singapore',      // Singapore
    'monaco',         // Monaco
    'san marino',    // San Marino
    'bissau',         // Bissau
    'vatican city'    // Vatican City
];

// Fetch and validate city
export const validateCity = async (city) => {
    const cityName = city.toLowerCase().trim();

    // Check if the city is a country, but allow exceptions
    if (validCountries.includes(cityName) && !exceptions.includes(cityName)) {
        return { valid: false, message: "The city is a country" };
    }

    try {
        const response = await fetch(`${weatherApiUrl}?q=${city}&appid=${weatherApiKey}&units=metric`);
        if (!response.ok) {
            return { valid: false, message: "Invalid city or unable to fetch weather data" };
        }
        const weatherData = await response.json();

        // Extract the needed data from the weather response
        const { coord, timezone } = weatherData;
        const { lat, lon } = coord;

        return {
            valid: true,
            data: {
                city: cityName,
                lat,
                lon,
                timezone // Timezone information from OpenWeatherMap
            }
        };
    } catch (error) {
        console.error('Error validating city:', error);
        return { valid: false, message: "An error occurred while validating the city" };
    }
};

// Fetch valid countries
export const fetchValidCountries = async () => {
    try {
        const response = await fetch(countriesApiUrl);
        if (!response.ok) throw new Error('Failed to fetch country list');
        const data = await response.json();
        validCountries = data.map(country => country.name.common.toLowerCase());
    } catch (error) {
        console.error('Error fetching country list:', error);
    }
};
