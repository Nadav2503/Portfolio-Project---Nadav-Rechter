export const formatTimeWithAMPM = (date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        return 'לא ידוע';
    }

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'אחה"צ' : 'לפנה"צ';

    if (hours === 0) {
        hours = 12;
    } else if (hours > 12) {
        hours -= 12;
    }

    return `${hours}:${minutes} ${ampm}`;
};
