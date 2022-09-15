/**
 * Function to format minutes(900) to hours(15:00).
 * 
 * @param minuteString
 */
 export function convertMinutesToHours(minuteString: number) {
    const hours = Math.floor(minuteString / 60);
    const minutes = minuteString % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}