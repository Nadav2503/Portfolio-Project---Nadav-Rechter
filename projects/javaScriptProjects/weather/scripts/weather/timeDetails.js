import { formatTime } from './background.js';

export const showTimeDetails = (data) => {
    const now = new Date();
    const sunriseTime = formatTime(data.sys.sunrise * 1000);
    const sunsetTime = formatTime(data.sys.sunset * 1000);
    const currentTime = formatTime(now);

    const isDayTime = now >= new Date(data.sys.sunrise * 1000) && now <= new Date(data.sys.sunset * 1000);
    const timeImage = isDayTime ? 'images/sun.png' : 'images/moon.png';

    const sunriseSunsetElement = document.getElementById('weatherTime');
    if (sunriseSunsetElement) {
        sunriseSunsetElement.style.backgroundImage = `url(${timeImage})`;
        sunriseSunsetElement.innerHTML = `
            <div class="weather-box time-box">
                <div class="time-details">
                    <div class="time-category">
                        <span class="detail-category">⏰ שעה נוכחית:</span>
                        <span class="detail-value">${currentTime}</span>
                    </div>
                    <div class="time-category">
                        <span class="detail-category">🌞 שעת זריחה:</span>
                        <span class="detail-value">${sunriseTime}</span>
                    </div>
                    <div class="time-category">
                        <span class="detail-category">🌜 שעת שקיעה:</span>
                        <span class="detail-value">${sunsetTime}</span>
                    </div>
                </div>
            </div>
        `;
    }
};
