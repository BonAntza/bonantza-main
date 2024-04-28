/**
 * Utility functions for the frontend to handle dates, formatting etc.
 */

/**
 * Return number of days in a given month.
 * @param Number year
 * @param Number month
 * @returns Number - number of days in a given month. 
 */
export function getNumberOfDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Returns the first weekday of a given month (eg. 0 = Sunday, 1 = Monday etc.). Then converts the weekday number to ISO format. 
 * @param Number year
 * @param Number month
 * @returns Number - Number for the first weekday of the month.
 */
export function getMonthsFirstWeekDay(year, month) {
  let weekDay = new Date(year, month, 1).getDay();

  // Convert to using "monday as the start of the week" logic.
  return convertToISO8601Week(weekDay);
}

/**
 * Return the dates which to show in the calendar for the last month.
 * @param Number year
 * @param Number month
 * @param Number days - Number of days to show in the last month.
 * @returns Array - The dates of the last month.
 */
export function getLastMonthsDays(year, month, days) {
  if (month === 1) {
    month = 12;
    year--;
  } else {
    month--;
  }

  const lastMonthsLastDay = getNumberOfDaysInMonth(year, month);

  let lastMonthsDays = [];
  for (let i = 0; i < days; i++) {
    const daysData = {'ui': (lastMonthsLastDay - i), 'data': year + '-' + (month + 1) + '-' + (lastMonthsLastDay - i)};
    lastMonthsDays.push(daysData);
  }
  // Days are returned in ascending order for the calendar.
  return lastMonthsDays.reverse();
}

/**
 * Get all the days to show in the calendar for the selected month.
 * @param Number year
 * @param Number month
 * @param Number days - Number of days to show in the this month.
 * @returns Array - Array containing day numbers for the calendar in the selected month.
 */
export function getThisMonthsDays(year, month, days) {
  const thisMonthsDays = [];

  for (let i = 1; i <= days; i++) {

    // For UI functionalities the leading zeroes are added where needed.
    const dayFormatted = String(i).padStart(2, '0');
    const monthFormatted = String(month + 1).padStart(2, '0');

    const dayData = {
      'ui': i, 
      'data': `${year}-${monthFormatted}-${dayFormatted}`, 
      // Current month flag exposes the day for selection.
      'currentMonth': true
    };
    thisMonthsDays.push(dayData);
  }

  return thisMonthsDays;
}

/**
 * Return all the following month's days to show in the calendar.
 * @param Number year
 * @param Number month
 * @param Number lastDay - The last weekday (number) of the selected month.
 * @returns Array - Next month's day data in array.
 */
export function getNextMonthsDays(year, month, lastDay) {
  let lastWeekDay = new Date(year, month, lastDay).getDay();
  lastWeekDay = convertToISO8601Week(lastWeekDay);

  const nextMonthsDays = [];
  const nextMonth = month === 12 ? 1 : (month + 1);

  for (let i = 1; i < 6 - lastWeekDay + 1; i++) {
    // + 1 is added to the month because the month iterator starts at 0.
    const daysData = {'ui': i, 'data': year + '-' + (nextMonth + 1) + '-' + i};
    nextMonthsDays.push(daysData);
  }

  return nextMonthsDays;
}

/**
 * Groups all the days in weeks for the calendar.
 * @param Array days - All the days to show in a single array.
 * @returns Array - Array that has the days grouped in weeks' sub-arrays.
 */
export function groupDaysToWeeks(days) {
  const groupedDays = [];
  let weeksDays = [];

  for (let i = 0; i < days.length; i++) {
    // Week full, add it to the main array and empty the week's day list.
    if (i !== 0 && i % 7 === 0) {
      groupedDays.push(weeksDays);
      weeksDays = [];
    }
    weeksDays.push(days[i]);
  }
  // Add the remaining days to the array as well.
  if (weeksDays.length) {
    groupedDays.push(weeksDays);
  }

  return groupedDays;
}

/**
 * Description here
 * @param Date date - Date object to convert.
 * @param String format - 'db' = format the date to format for the database queries, otherwise it's converted to human-readable format for the UI needs. Other cases may follow.
 * @returns String - Date in a required format.
 */
export function convertDate(date, format = '') {
  // Make sure the date is in the correct timezone before conversion.
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - (offset * 60 * 1000));

  if (format === 'db') {
    return localDate.toISOString().split('T')[0];
  } else {
    const day = localDate.getDate().toString().padStart(2, '0');
    const month = (localDate.getMonth() + 1).toString().padStart(2, '0');
    const year = localDate.getFullYear();

    return `${day}.${month}.${year}`;
  }
}

/**
 * Converts the weekday to iso format; 1 = Monday, 2 = Tuesday etc. 
 * @param Number weekDay - Week day in 0-based format.
 * @returns Number - Weekday in 1-based format.
 */
function convertToISO8601Week(weekDay) {
  return (weekDay + 6) % 7;
}