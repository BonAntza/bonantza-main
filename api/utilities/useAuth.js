// import { useRouter } from 'vue-router';
import { checkAccess } from './checkAccess';
// import { ref } from 'vue';

export async function isAuthenticated() {
    const authToken = localStorage.getItem('authToken');
    try {
        await checkAccess(authToken);
        return true; // Authenticated
    } catch (error) {
        return false; // Not authenticated
    }
}