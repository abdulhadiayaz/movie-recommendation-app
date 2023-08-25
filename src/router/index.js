import { createRouter, createWebHistory } from 'vue-router';
import RegistrationView from '../views/user/RegistrationView';
import LoginView from '../views/user/LoginView.vue';
import ProfileView from '../views/user/ProfileView.vue';
import HomeView from '../views/HomeView.vue';
import MovieDetailsView from '../views/MovieDetailsView.vue';
import WatchlistView from '../views/WatchlistView.vue';
import { auth } from '../firebase/firebaseConfig';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/register', component: RegistrationView },
  { path: '/login', component: LoginView },
  { path: '/profile', component: ProfileView, meta: { requiresAuth: true } },
  { path: '/home', component: HomeView },
  { path: '/movie/:id', component: MovieDetailsView },
  { path: '/watch-list', component: WatchlistView, meta: { requiresAuth: true }},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
  // onAuthStateChanged to wait for authentication state to be resolved
  const unsubscribe = auth.onAuthStateChanged(user => {
    if (requiresAuth && !user) {
      next({ component: LoginView });
    } else {
      next();
    }
    unsubscribe(); // Unsubscribe to prevent memory leaks
  });
});

export default router;
