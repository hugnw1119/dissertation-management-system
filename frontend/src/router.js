// Composables
import { createRouter, createWebHistory, useRoute } from 'vue-router'
import Admin from './views/Admin.vue'
import Login from './views/Login.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/admin',
    name: 'admin',
    component:Admin,
  },
  {
    path: '/login',
    name: 'login',
    component:Login,
  }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
