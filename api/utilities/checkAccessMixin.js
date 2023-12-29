import { checkAccess } from './checkAccess'

export default {
  async mounted() {
    try {
      const authToken = localStorage.getItem('authToken');
      await checkAccess(authToken);
      this.loading = false;
    } catch (err) {
      this.error = err.message;
      this.loading = false;
      this.$router.push('/login');
    }
  },
};