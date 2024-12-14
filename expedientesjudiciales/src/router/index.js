import { createRouter, createWebHistory } from 'vue-router';
import Register from '../ventanas/Auth/Register.vue';
import Login from '../ventanas/Auth/Login.vue';

const routes = [
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    redirect: '/login', // Redireccionar a login por defecto
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
