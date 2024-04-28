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

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const username = ref('');
const password = ref('');

/**
 * Handle login attempt. Sends given username and password to api for validation. On succesful login forwards user to the authenticated page. 
 */
const handleLogin = async () => {
  try {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.value, password: password.value })
    });

    // Redirect with a successful login.
    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      localStorage.setItem('authToken', token);
      router.push('/authenticated-page');
    // Wrong username and/or password.
    } else {
      alert("NO ACCESS");
    }
  } catch (error) {
    // Handle unexpected errors.
    console.error(error);
  }
};
</script>