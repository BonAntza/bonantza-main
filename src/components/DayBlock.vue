<template>
  <div class="day-block" :data-date="dataDate">
    {{ dayNumber }}
  </div>
</template>

<script setup>

const props = defineProps({
  dayNumber: Number,
  dataDate: String
});

</script>

<style>
  .day-block,
  .weekday {
    width: calc(100% / 7);
    margin: 0.3em;
    background-color: var(--bg-color-dark);
    border: 0.15em solid var(--bg-color-dark);
    height: 6em;
    padding: 0.3em 0.5em;
    border-radius: 0.3em;
    color: var(--light-text-color);
    cursor: pointer;
  }

  .day-block:hover {
    border: 0.15em solid var(--border-color-hovered);
    -webkit-user-select: none;
    user-select: none;
  }

  .day-block.selected {
    border-color: var(--border-color-selected);
  }

  .day-block:not(.current-month) {
    cursor: default;
    pointer-events: none;
    opacity: 0.5;
  }
</style>