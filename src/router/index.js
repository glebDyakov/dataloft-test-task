import { createWebHistory, createRouter } from 'vue-router'
import CarList from '../components/CarList.vue'
import CarDetails from '../components/CarDetails.vue'
import PostDetails from '../components/PostDetails.vue'

const routes = [
  { path: '/', component: CarList },
  { path: '/car/:id', component: CarDetails },
  { path: '/post/:id', component: PostDetails }
]

const router = createRouter({ routes, history: createWebHistory() })
export default router