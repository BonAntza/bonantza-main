<template>
  <div id="authenticated-page">
    <div id="authenticated-content">
      Congratulations! You have access to protected content.
      <div id="calendar-link">To the <a href="./calendar">calendar</a>.</div>
    </div>
    <button @click="handleLogout">Log Out</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const handleLogout = () => {
  localStorage.removeItem('authToken');
  router.push('/');
}
</script>

<style scoped>
#authenticated-content {
  margin-bottom: 2em;
}
</style>