import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '../components/UserLogin.vue';
import AuthenticatedPage from '../components/AuthenticatedPage.vue';
import MainPage from '../components/MainPage.vue';
import CalendarApp from '../components/CalendarApp.vue';
import { isAuthenticated } from '../../api/utilities/checkAccess';

const routes = [
  { path: '/', component: MainPage },
  { path: '/login', component: UserLogin },
  {
    path: '/authenticated-page',
    component: AuthenticatedPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/calendar',
    component: CalendarApp,
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

/**
 * For links, that requires authentication; check that user has logged in, else forward to login page.
 */
router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (await isAuthenticated()) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
