/**
 * Function to format hours(15:00) to minutes(900).
 * 
 * @param hourString
 */
export function convertHourToMinutes(hourString: string) {
    const [hours, minutes] = hourString.split(':').map(Number);

    const minutesAmount = (hours * 60) + minutes;

    return minutesAmount;
}