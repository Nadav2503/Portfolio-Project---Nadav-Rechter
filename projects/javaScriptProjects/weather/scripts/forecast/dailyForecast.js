import { weatherIconMap, englishToHebrewMap } from './../general/icons.js';

const dayNamesHebrew = {
    'Sunday': 'ראשון',
    'Monday': 'שני',
    'Tuesday': 'שלישי',
    'Wednesday': 'רביעי',
    'Thursday': 'חמישי',
    'Friday': 'שישי',
    'Saturday': 'שבת'
};

export const showDailyForecast = (hourlyData) => {
    if (!hourlyData || !Array.isArray(hourlyData)) {
        document.getElementById('dailyForecastContainer').innerHTML = '<p>התחזית לא זמינה השבוע</p>';
        return;
    }

    const today = new Date();
    const targetDates = [];
    for (let i = 1; i <= 5; i++) {
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + i);
        targetDates.push(targetDate);
    }

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

    const sortedDates = Object.keys(dailyData).sort((a, b) => new Date(a) - new Date(b));
    if (sortedDates.length < 5) {
        document.getElementById('dailyForecastContainer').innerHTML = '<p>אין מספיק נתונים לתחזית שבועית</p>';
        return;
    }

    let dailyHTML = '';
    sortedDates.slice(0, 5).forEach(date => {
        const dateObj = new Date(date);
        const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
        const hebrewDayName = dayNamesHebrew[dayName];

        const tempMinCelsius = Math.round(dailyData[date].temp_min);
        const tempMaxCelsius = Math.round(dailyData[date].temp_max);
        const description = dailyData[date].description;
        const descriptionInHebrew = englishToHebrewMap[description.toLowerCase()] || 'לא ידוע';
        const iconSrc = weatherIconMap[description.toLowerCase()] || 'images/default.png';

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
