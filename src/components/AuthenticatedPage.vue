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

<script>
import CheckAccessMixin from '../../api/utilities/checkAccessMixin';

export default {
  mixins: [CheckAccessMixin],
  data() {
    return {
      loading: true,
      error: null
    };
  },
  methods: {
    handleLogout() {
      localStorage.removeItem('authToken');
      this.$router.push('/');
    }
  }
};
</script>