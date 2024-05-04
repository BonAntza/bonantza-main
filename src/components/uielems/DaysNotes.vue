<template>
  <div id="notes">
    <div id="selected-date">
      <span>{{ date }}</span>
      <div v-if="isDisabled" class="loader"></div>
    </div>
    <div id="days-notes">
      <textarea v-model="notes" :class="{'textarea-disabled': isDisabled}" :disabled="isDisabled">{{ notes }}</textarea>
      <button :class="{'button-disabled': isDisabled}" @click="saveNotes">Save</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { convertDate } from '../../utilities/date';
import axios from 'axios';

const props = defineProps({
  day: Date,
  onRefreshCalendar: Function
});

const emit = defineEmits('refreshCalendar');
const notes = ref('');
const date = computed(() => convertDate(props.day));
const dbDate = computed(() => convertDate(props.day, 'db'));
// The textarea is disabled whenever the program is fetching or saving data. 
const isDisabled = ref(true);

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authToken')}`;

/**
 * Loads notes for the selected day.
 */
const loadNotes = async () => {
  isDisabled.value = true;

  try {
    const response = await axios.get(`./api/fetch-notes?date=${dbDate.value}`);
    // No notes found for the date.
    if (response.data.message) {
      notes.value = '';
    } else {
      notes.value = response.data;
    }
  } catch (error) {
    console.error(error);
  } finally {
    isDisabled.value = false;
  }
};

/**
 * Saves notes to database for the selected day.
 */
const saveNotes = async() => {
  isDisabled.value = true;

  await axios.post('./api/save-notes', {
    date: dbDate.value,
    notes: notes.value
  });

  // Emit a refresh call so the parent will know to reload the calendar with updated visuals.
  emit('refreshCalendar', () => {
    isDisabled.value = false;
  });
};

onMounted(loadNotes);

// Day selection changes; empty the notes and load new day's notes (if any are found).
watch(() => props.day, (newDay, oldDay) => {
  if (newDay != oldDay) {
    notes.value = '';
    loadNotes();
  }
});
</script>

<style scoped>
#notes {
  width: 15em;
  padding: 0 1.5em;
}

textarea {
  width: 100%;
  height: 30em;
  box-sizing: border-box;
  padding: 0.5em;
  font-family: var(--font-family);
  margin: 1em 0;
  background-color: var(--bg-color-dark-opaque);
  color: var(--text-color-light);
  border-color: var(--bg-color-dark);
  resize: unset;
  outline: none;
}

#selected-date {
  display: flex;
  align-items: center;
}

#selected-date span {
  width: 5em;
}

.button-disabled,
.textarea-disabled {
  pointer-events: none;
  opacity: 0.4;
}

.textarea-disabled {
  opacity: 0.6;
}

.loader {
  margin-left: 1em;
  height: 1em;
  aspect-ratio: 2.5;
  --_g: no-repeat radial-gradient(farthest-side,#ffffff 90%,#ffffff00);
  background:var(--_g), var(--_g), var(--_g), var(--_g);
  background-size: 20% 50%;
  animation: l43 1s infinite linear; 
}

@keyframes l43 {
  0%     {background-position: calc(0*100%/3) 50% ,calc(1*100%/3) 50% ,calc(2*100%/3) 50% ,calc(3*100%/3) 50% }
  16.67% {background-position: calc(0*100%/3) 0   ,calc(1*100%/3) 50% ,calc(2*100%/3) 50% ,calc(3*100%/3) 50% }
  33.33% {background-position: calc(0*100%/3) 100%,calc(1*100%/3) 0   ,calc(2*100%/3) 50% ,calc(3*100%/3) 50% }
  50%    {background-position: calc(0*100%/3) 50% ,calc(1*100%/3) 100%,calc(2*100%/3) 0   ,calc(3*100%/3) 50% }
  66.67% {background-position: calc(0*100%/3) 50% ,calc(1*100%/3) 50% ,calc(2*100%/3) 100%,calc(3*100%/3) 0   }
  83.33% {background-position: calc(0*100%/3) 50% ,calc(1*100%/3) 50% ,calc(2*100%/3) 50% ,calc(3*100%/3) 100%}
  100%   {background-position: calc(0*100%/3) 50% ,calc(1*100%/3) 50% ,calc(2*100%/3) 50% ,calc(3*100%/3) 50% }
}
</style>