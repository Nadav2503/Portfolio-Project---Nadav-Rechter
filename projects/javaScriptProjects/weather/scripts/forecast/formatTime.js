// formatTime.js

// Function to format time without leading zeros
export const formatTimeWithAMPM = (date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        return 'לא ידוע'; // Return 'Unknown' if the date is invalid
    }

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'אחה"צ' : 'לפנה"צ';

    if (hours === 0) {
        hours = 12; // Midnight case
    } else if (hours > 12) {
        hours -= 12; // Convert 24-hour format to 12-hour format
    }

    return `${hours}:${minutes} ${ampm}`;
};
