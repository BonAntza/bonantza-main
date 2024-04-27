import { useRouter } from 'vue-router';
import { checkAccess } from './checkAccess';
import { ref } from 'vue';

export function useAuth() {
  const router = useRouter();
  const error = ref(true);
  const loading = ref(true);

  const authenticate = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      await checkAccess(authToken);
      loading.value = false;
      error.value = false;
    } catch (err) {
      error.value = err.message;
      loading.value = false;
      router.push('/login');
    }
  };

  return {
    error,
    loading,
    authenticate
  };
}