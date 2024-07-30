import { formatTimeWithAMPM } from './../../forecast/formatTime.js'; // Corrected import path

export const displayLocalTime = (timezoneOffset, sunrise, sunset) => {
    // Convert timezone offset from seconds to milliseconds
    const timezoneOffsetInMilliseconds = timezoneOffset * 1000;

    // Manually adjust by subtracting 3 hours (10,800,000 milliseconds)
    const manualAdjustmentInMilliseconds = 3 * 60 * 60 * 1000;

    // Get the current UTC time
    const nowUtc = new Date(); // This is UTC

    // Calculate the local time by applying the timezone offset and adjusting manually
    const localTime = new Date(nowUtc.getTime() + timezoneOffsetInMilliseconds - manualAdjustmentInMilliseconds);

    // Calculate sunrise and sunset times in the local timezone with manual adjustment
    const sunriseTime = new Date(sunrise * 1000 + timezoneOffsetInMilliseconds - manualAdjustmentInMilliseconds);
    const sunsetTime = new Date(sunset * 1000 + timezoneOffsetInMilliseconds - manualAdjustmentInMilliseconds);

    // Format the times for display
    const localTimeStr = `⏰ Current Time: ${formatTimeWithAMPM(localTime)}`;
    const sunriseStr = `🌞 Sunrise Time: ${formatTimeWithAMPM(sunriseTime)}`;
    const sunsetStr = `🌜 Sunset Time: ${formatTimeWithAMPM(sunsetTime)}`;

    // Update the DOM with the formatted times
    document.getElementById('weatherTime').innerHTML = `${localTimeStr}<br>${sunriseStr}<br>${sunsetStr}`;
};

export const getForecastBoxColor = () => {
    const now = new Date();
    const hours = now.getHours();

    let forecastBoxColor;

    if (hours >= 6 && hours < 12) { // Morning
        forecastBoxColor = '#E1F5FE'; // Light blue
    } else if (hours >= 18 || hours < 6) { // Night
        forecastBoxColor = '#01579B'; // Dark blue
    } else { // Noon and Evening
        forecastBoxColor = '#90A4AE'; // Greyish blue
    }

    return forecastBoxColor;
};