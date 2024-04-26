import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '../components/UserLogin.vue';
import AuthenticatedPage from '../components/AuthenticatedPage.vue';
import MainPage from '../components/MainPage.vue';
import CalendarApp from '../components/CalendarApp.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: MainPage },
    { path: '/login', component: UserLogin },
    { path: '/authenticated-page', component: AuthenticatedPage },
    { path: '/calendar', component: CalendarApp }
  ],
});

router.beforeEach((to, from, next) => {
  const authToken = localStorage.getItem('authToken');

  if ((to.path === '/authenticated-page' || to.path === '/calendar') && !authToken) {
    next('/login');
  } else {
    next();
  }
});

export default router;