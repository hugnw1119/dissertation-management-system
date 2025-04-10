// Composables
import { createRouter, createWebHistory, useRoute } from 'vue-router'
import Admin from '../views/Admin.vue'
import Login from '../views/Login.vue'

const r = useRoute();

const routes = [
  {
    path: '/',
    component:Admin,
    children: [
      {
        path: '/admin',
        name: 'admin',
        component:Admin,
      },
    ]
  }
]

const router = createRouter({
    history: createWebHistory(),
  routes,
})

export default router
