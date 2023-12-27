import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '../components/UserLogin.vue';
import AuthenticatedPage from '../components/AuthenticatedPage.vue';
import MainPage from '../components/MainPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: MainPage },
    { path: '/login', component: UserLogin },
    { path: '/authenticated-page', component: AuthenticatedPage },
  ],
});

router.beforeEach((to, from, next) => {
  const authToken = localStorage.getItem('authToken');

  if (to.path === '/authenticated-page' && !authToken) {
      next('/login');
  } else {
    next();
  }
});

export default router;