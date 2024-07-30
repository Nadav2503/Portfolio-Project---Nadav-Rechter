// dailyForecast.js

import { weatherIconMap, englishToHebrewMap } from './../general/icons.js';

// Hebrew day names
const dayNamesHebrew = {
    'Sunday': 'ראשון',
    'Monday': 'שני',
    'Tuesday': 'שלישי',
    'Wednesday': 'רביעי',
    'Thursday': 'חמישי',
    'Friday': 'שישי',
    'Saturday': 'שבת'
};

// Display daily forecast
export const showDailyForecast = (hourlyData) => {
    if (!hourlyData || !Array.isArray(hourlyData)) {
        console.error('Daily data is missing or not an array');
        document.getElementById('dailyForecastContainer').innerHTML = '<p>No daily forecast data available.</p>';
        return;
    }

    const today = new Date();
    const targetDates = [];
    // Collect target dates for the next 5 days starting from tomorrow
    for (let i = 1; i <= 5; i++) {
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + i);
        targetDates.push(targetDate);
    }

    // Aggregate daily data from hourly data
    const dailyData = {};
    hourlyData.forEach(entry => {
        const date = new Date(entry.dt * 1000);
        const dateString = date.toDateString();
        if (targetDates.some(targetDate => targetDate.toDateString() === dateString)) {
            if (!dailyData[dateString]) {
                dailyData[dateString] = {
                    temp_min: entry.main.temp,
                    temp_max: entry.main.temp,
                    description: entry.weather[0].description
                };
            } else {
                dailyData[dateString].temp_min = Math.min(dailyData[dateString].temp_min, entry.main.temp);
                dailyData[dateString].temp_max = Math.max(dailyData[dateString].temp_max, entry.main.temp);
                dailyData[dateString].description = entry.weather[0].description;
            }
        }
    });

    // Ensure we have exactly 5 days of data
    const sortedDates = Object.keys(dailyData).sort((a, b) => new Date(a) - new Date(b));
    if (sortedDates.length < 5) {
        console.error('Not enough daily forecast data available.');
        document.getElementById('dailyForecastContainer').innerHTML = '<p>Not enough daily forecast data available.</p>';
        return;
    }

    let dailyHTML = '';
    sortedDates.slice(0, 5).forEach(date => {
        const dateObj = new Date(date);
        const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' }); // Get English day name
        const hebrewDayName = dayNamesHebrew[dayName]; // Convert to Hebrew

        const tempMinCelsius = Math.round(dailyData[date].temp_min); // Round temperatures to nearest integer
        const tempMaxCelsius = Math.round(dailyData[date].temp_max);
        const description = dailyData[date].description;
        const descriptionInHebrew = englishToHebrewMap[description.toLowerCase()] || 'לא ידוע';
        const iconSrc = weatherIconMap[description.toLowerCase()] || 'images/default.png';

        console.log(`Forecast description: ${description.toLowerCase()}`); // Debugging line
        console.log(`Forecast icon path: ${iconSrc}`); // Debugging line

        dailyHTML += `
            <div class="daily-forecast-item forecast-box">
                <img src="${iconSrc}" alt="${descriptionInHebrew}" class="forecast-icon">
                <div class="forecast-description">
                    <span class="date">${hebrewDayName}</span>
                    <span class="temp">טמפרטורה מינימלית: ${tempMinCelsius}°C</span>
                    <span class="temp">טמפרטורה מקסימלית: ${tempMaxCelsius}°C</span>
                    <span class="desc">${descriptionInHebrew}</span>
                </div>
            </div>
        `;
    });

    document.getElementById('dailyForecastContainer').innerHTML = dailyHTML;
};
