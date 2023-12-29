<template>
  <div id="authenticated-page">
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-if="error">{{ error }}</div>
      <div v-else>Congratulations! You have accessed protected content.</div>
      <button @click="handleLogout">Log Out</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      error: null
    };
  },
  mounted() {
    this.checkAccess();
  },
  methods: {
    async checkAccess() {
      try {
        const response = await fetch('./api/verifyLogin', {
          headers: {
            'Authorization': localStorage.getItem('authToken')
          }
        });

        if (!response.ok) {
          throw new Error('Access denied or token invalid');
        }

        // If the response is okay, the token is valid
        this.loading = false;
      } catch (error) {
        this.error = error.message;
        this.loading = false;
        this.$router.push('/login'); // Redirect to login if token is invalid
      }
    },
    handleLogout() {
      localStorage.removeItem('authToken');
      this.$router.push('/');
    }
  }
};
</script>