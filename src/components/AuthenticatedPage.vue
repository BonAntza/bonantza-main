<template>
  <div id="authenticated-page">
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-if="error">{{ error }}</div>
      <div v-else>Congratulations! You have accessed protected content.</div>
      <div id="calendar-link">To the <a href="./calendar">calendar</a>.</div>
      <button @click="handleLogout">Log Out</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAuth } from '../../api/utilities/useAuth';
import { useRouter } from 'vue-router';
const router = useRouter();

const { error, loading, authenticate } = useAuth();

onMounted(async () => {
  await authenticate();
});

const handleLogout = () => {
  localStorage.removeItem('authToken');
  router.push('/');
}

</script>