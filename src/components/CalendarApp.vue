<template>
  <div id="calendar">
      <div v-if="!error.value">
        Suksee.
        <div id="main-page-link"><a href="./">Main page.</a></div>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuth } from '../../api/utilities/useAuth';
import { useRouter } from 'vue-router';
const router = useRouter();

const { error, loading, authenticate } = useAuth();

onMounted(async () => {
  await authenticate();
});

</script>
<style>

</style>