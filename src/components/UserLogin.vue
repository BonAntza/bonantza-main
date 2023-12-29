<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="username" type="text" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: this.username, password: this.password })
        });

        if (response.ok) {
          const data = await response.json();
          const token = data.token;
          localStorage.setItem('authToken', token);
          // Redirect with a successful login.
          this.$router.push('/authenticated-page')
        } else {
          alert("NO ACCESS");
        }
      } catch (error) {
        // Handle unexpected errors
        console.error(error);
      }
    }
  }
};
</script>