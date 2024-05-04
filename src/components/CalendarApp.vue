<template>
  <div id="calendar-app">
    <div id="calendar-wrapper">
      <div id="year-month-selector">
        <div id="year-selector">
          <div id="arrow-left" @click="selectMonthOrYear((selYear - 1), 0)" class="arrow">‹</div>
          <div id="year">{{ selYear }}</div>
          <div id="arrow-right" @click="selectMonthOrYear((selYear + 1), 0)" class="arrow">›</div>
        </div>
        <div id="month-selector">
          <div v-for="(month, i) in months" @click="selectMonthOrYear(selYear, i)" :class="{'month': true, 'selected': i === selMonth}" :key="month">
            {{ month }}
          </div>
        </div>
      </div>
      <div id="calendar">
        <div class="week-header">
          <div v-for="weekDay in weekDays" class="weekday" :key="weekDay">
            {{ weekDay }}
          </div>
        </div>
        <div v-for="week in calendarDays" class="week" :key="week">
          <DayBlock v-for="day in week" @click="selectDay(day.data)" :dayNumber="day.ui" :dataDate="day.data" :class="{'day': true, 'saved-notes': dailyNotes.includes(day.data), 'current-month': day.currentMonth ? 'current-month' : '', 'selected': day.data === selectedDay}" />
        </div>
        <div v-if="calendarDays.length < 6" class="extra-week week" :key="'extra-week'">
          <DayBlock v-for="day in 7" :dayNumber="null" :dataDate="null" class="no-day" />
        </div>
      </div>
      <DaysNotes @refreshCalendar="handleRefresh" :day="date" />
    </div>
    <div id="main-page-link"><a href="./">Back to Main page</a></div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';

import { getNumberOfDaysInMonth, getThisMonthsDays, getMonthsFirstWeekDay, getLastMonthsDays, getNextMonthsDays, groupDaysToWeeks, convertDate } from '../utilities/date';
import DayBlock from './uielems/DayBlock.vue';
import DaysNotes from './uielems/DaysNotes.vue';

const date = ref(new Date());
const selYear = ref(date.value.getFullYear());
const selMonth = ref(date.value.getMonth()); 
const calendarDays = ref([]);
const dailyNotes = ref([]);

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const selectedDay = ref(selYear.value + '-' + (selMonth.value + 1) + '-' + date.value.getDate());

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authToken')}`;

onMounted(() => {
  initializeCalendar();
});

watch(selMonth, () => {
  date.value.setFullYear(selYear.value, selMonth.value);
  initializeCalendar();
});

watch(selYear, () => {
  date.value.setFullYear(selYear.value, selMonth.value);
  initializeCalendar();
});

/**
 * Initialize calendar on page load and every time user changes year or month.
 */
const initializeCalendar = async (callback) => {
  // Get weekday (0 = Monday, 1 = Tuesday etc.). This is also the number of days to show in the last month.
  const firstWeekday = getMonthsFirstWeekDay(selYear.value, selMonth.value); 
  const numberOfDaysInMonth = getNumberOfDaysInMonth(selYear.value, selMonth.value);

  // Get all the dates the are visible in the calendar for a given year+month selection. 
  const thisMonthsDays = getThisMonthsDays(selYear.value, selMonth.value, numberOfDaysInMonth);
  const lastMonthsDays = getLastMonthsDays(selYear.value, selMonth.value, firstWeekday); 
  const nextMonthsDays = getNextMonthsDays(selYear.value, selMonth.value, numberOfDaysInMonth);

  calendarDays.value = groupDaysToWeeks([...lastMonthsDays, ...thisMonthsDays, ...nextMonthsDays]);

  // Get the indicators for all saved daily notes for the calendar.
  const dbDate = convertDate(date.value, 'db');
  
  const response = await axios.get(`./api/fetch-months-notes?date=${dbDate}`);
  dailyNotes.value = response.data;

  if (callback) callback();
};

const selectDay = (day) => {
  selectedDay.value = day;
  const parts = day.split('-');
  date.value = new Date(parts[0], parts[1] - 1, parts[2]);
}

const selectMonthOrYear = (year, month) => {
  selMonth.value = month;
  selYear.value = year;

  date.value.setMonth(month);
  date.value.setFullYear(year);

  selectedDay.value = `${selYear.value}-${month + 1}-1`;

  initializeCalendar();
}

const handleRefresh = (callback) => {
  initializeCalendar(callback);
};
</script>

<style scoped>
#calendar-app {
  width: 100%;
  height: 100%;
  background: rgb(86, 79, 124);
  background: linear-gradient(325deg, rgba(86, 79, 124, 1) 0%, rgba(73, 73, 101, 1) 31%, rgba(116, 117, 161, 1) 69%, rgba(141, 121, 157, 1) 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#calendar-app a {
  color: var(--text-color-light);
  text-decoration: none;
}

#calendar-app a:hover {
  text-decoration: underline;
}

#calendar-wrapper {
  background-color: var(--bg-color-default);
  display: flex;
  border-radius: 0.5em;
  height: fit-content;
  width: fit-content;
  align-self: center;
  padding: 1.5em 0 1.5em 0;
}

#main-page-link {
  margin: 1em 0;
}

#year-month-selector {
  border-right: 0.1em solid var(--border-color-dark);
}

#calendar {
  width: 65vw;
  font-family: 'Kanit', sans-serif;
  max-width: 1300px;
}

.week,
.week-header {
  display: flex;
}

.extra-week {
  visibility: hidden;
}

.weekday {
  height: auto;
  cursor: default;
}

#year {
  text-align: center;
  line-height: 2em;
  font-size: 2em;
  width: 2.3em;
}

#year-selector {
  display: flex;
  user-select: none;
}

.month {
  padding: 0.3em 1.5em;
  opacity: 0.4;
  cursor: pointer;
}

.arrow {
  padding: 0 0.5em;
  font-size: 2em;
  cursor: pointer;
  line-height: 2em;
  opacity: 0.3;
  transition: background-color 400ms var(--anim-hover-change);
  transition: opacity 400ms var(--anim-hover-change);
}

.arrow:hover {
  opacity: 1;
  transition: opacity 400ms var(--anim-hover-change);
}

.month:hovered {
  color: var(--text-color-light);
}

.month:hover, .month.selected {
    transition: opacity var(--anim-hover-change);
    opacity: 1;
}

.saved-notes {
  background-color: var(--bg-color-daily-notes);
}
</style>./DaysNotes.vue./uielems/DayBlock.vue./uielems/DaysNotes.vue