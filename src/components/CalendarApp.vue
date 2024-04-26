<template>
  <div id="calendar">
      <div v-if="error">{{ error }}</div>
      <div v-else>Kalenteri.</div>
      <div id="main-page-link"><a href="./">Main page.</a></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { checkAccess } from '../../api/utilities/checkAccess.js';
const router = useRouter();
const error = ref(null);
const loading = ref(true);

(async () => {
  try {
    const authToken = localStorage.getItem('authToken');
    await checkAccess(authToken);
    loading.value = false;
  } catch (err) {
    console.log(err);
    error.value = err.message;
    loading.value = false;
    router.push('/login');
  }
})();

</script>
<style>

</style>