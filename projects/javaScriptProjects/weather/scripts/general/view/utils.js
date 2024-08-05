import { formatTimeWithAMPM } from './../../forecast/formatTime.js';

export const displayLocalTime = (timezoneOffset, sunrise, sunset) => {

    const timezoneOffsetInMilliseconds = timezoneOffset * 1000;

    const manualAdjustmentInMilliseconds = 3 * 60 * 60 * 1000;

    const nowUtc = new Date();

    const localTime = new Date(nowUtc.getTime() + timezoneOffsetInMilliseconds - manualAdjustmentInMilliseconds);

    const sunriseTime = new Date(sunrise * 1000 + timezoneOffsetInMilliseconds - manualAdjustmentInMilliseconds);
    const sunsetTime = new Date(sunset * 1000 + timezoneOffsetInMilliseconds - manualAdjustmentInMilliseconds);

    const localTimeStr = `⏰ שעת נוכחית: ${formatTimeWithAMPM(localTime)}`;
    const sunriseStr = `🌞 שעת זריחה: ${formatTimeWithAMPM(sunriseTime)}`;
    const sunsetStr = `🌜 שעת שקיעה: ${formatTimeWithAMPM(sunsetTime)}`;

    document.getElementById('weatherTime').innerHTML = `${localTimeStr}<br>${sunriseStr}<br>${sunsetStr}`;
};

export const getForecastBoxColor = () => {
    const now = new Date();
    const hours = now.getHours();

    let forecastBoxColor;

    if (hours >= 6 && hours < 12) {
        forecastBoxColor = '#E1F5FE';
    } else if (hours >= 18 || hours < 6) {
        forecastBoxColor = '#01579B';
    } else {
        forecastBoxColor = '#90A4AE';
    }

    return forecastBoxColor;
};