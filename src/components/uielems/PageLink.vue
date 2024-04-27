<template>
  <div class="link-text">
    <span>{{ linkText }}</span>
    <svg class="external-link" v-if="icon" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Interface / External_Link">
        <path id="Vector" d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
    </svg>
  </div>
</template>

<script setup>

const props = defineProps({
  linkText: String,
  icon: Boolean
});

</script>

<style scoped>
.link-text {
  cursor: pointer;
  margin: 0.5em;
  display: flex;
  align-items: center;
}

.link-text:hover {
  opacity: 0.6;
}

.external-link {
  margin-left: 0.5em;
  width: 1em;
  height: 1em;
  filter: invert(97%) sepia(97%) saturate(11%) hue-rotate(217deg) brightness(105%) contrast(104%);
}
</style>