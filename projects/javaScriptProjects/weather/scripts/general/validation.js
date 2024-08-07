const weatherApiEndpoint = 'https://api.openweathermap.org/data/2.5/weather';
const weatherApiKey = '857e6833020a76b352aabbaab070639c';
const countriesApiEndpoint = 'https://restcountries.com/v3.1/all';

export let availableCountries = [];
const countryExceptions = [
    'mexico',
    'singapore',
    'monaco',
    'san marino',
    'bissau',
    'vatican city'
];

export const validateCityName = async (cityName) => {
    const normalizedCityName = cityName.toLowerCase().trim();

    const isEnglishOnly = /^[a-zA-Z\s]+$/.test(normalizedCityName);

    if (!isEnglishOnly) {
        return { isValid: false, message: "העיר חייבת להיכתב באנגלית ובלי מספרים" };
    }

    if (availableCountries.includes(normalizedCityName) && !countryExceptions.includes(normalizedCityName)) {
        return { isValid: false, message: "העיר שבחרת היא מדינה, נא בחר/י עיר ולא מדינה" };
    }

    try {
        const response = await fetch(`${weatherApiEndpoint}?q=${cityName}&appid=${weatherApiKey}&units=metric`);
        if (!response.ok) {
            const errorData = await response.json();
            if (errorData.message) {
                return { isValid: false, message: `העיר לא כתובה נכון` };
            }
            return { isValid: false, message: "העיר לא קיימת במערכת" };
        }
        const weatherResponse = await response.json();

        if (!weatherResponse.coord) {
            return { isValid: false, message: "העיר לא קיימת במערכת" };
        }

        const { coord, timezone } = weatherResponse;
        const { lat, lon } = coord;

        return {
            isValid: true,
            data: {
                city: normalizedCityName,
                latitude: lat,
                longitude: lon,
                timezone
            }
        };
    } catch (error) {
        return { isValid: false, message: "העיר לא קיימת במערכת" };
    }
};


export const fetchAvailableCountries = async () => {
    try {
        const response = await fetch(countriesApiEndpoint);
        if (!response.ok) throw new Error('העיר לא קיימת במערכת');
        const countryData = await response.json();
        availableCountries = countryData.map(country => country.name.common.toLowerCase());
    } catch {
        return { isValid: false, message: "העיר לא קיימת במערכת" };
    }
};
