export function getNumberOfDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function getMonthsFirstWeekDay(year, month) {
  let weekDay = new Date(year, month, 1).getDay();

  // Convert to using "monday as the start of the week" logic.
  weekDay = convertToISO8601Week(weekDay);
  return weekDay;
}

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

  return lastMonthsDays.reverse();
}

export function getThisMonthsDays(year, month, days) {
  const thisMonthsDays = [];

  for (let i = 1; i < days + 1; i++) {
    const dayData = {'ui': i, 'data': year + '-' + (month + 1) + '-' + i, 'currentMonth': true};
    thisMonthsDays.push(dayData);
  }

  return thisMonthsDays;
}

export function getNextMonthsDays(year, month, lastDay) {
  let lastWeekDay = new Date(year, month, lastDay).getDay();
  lastWeekDay = convertToISO8601Week(lastWeekDay);

  const nextMonthsDays = [];
  const nextMonth = month === 12 ? 1 : (month + 1);

  for (let i = 1; i < 6 - lastWeekDay + 1; i++) {
    const daysData = {'ui': i, 'data': year + '-' + (nextMonth + 1) + '-' + i};
    nextMonthsDays.push(daysData);
  }

  return nextMonthsDays;
}

export function groupDaysToWeeks(days) {
  const groupedDays = [];
  let weeksDays = [];

  for (let i = 0; i < days.length; i++) {
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

function convertToISO8601Week(weekDay) {
  return (weekDay + 6) % 7;
}