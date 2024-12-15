import { createRouter, createWebHistory } from 'vue-router';
import Register from '../ventanas/Auth/Register.vue';
import Login from '../ventanas/Auth/Login.vue';
import Home from '../ventanas/Home.vue';
import Records from '../ventanas/Records/Records.vue';
import Movements from '../ventanas/Movements/Movements.vue';
import Audiences from '../ventanas/Audiences/Audiences.vue';
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
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/records',
    name: 'Records',
    component: Records,
  },
  {
    path: "/movements/:recordId",
    name: "Movements",
    component: Movements,
  },
  {
    path: "/audiences/:recordId",
    name: "Audiences",
    component: Audiences,
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
