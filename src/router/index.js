import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Portfolio from '../pages/Portfolio.vue'
import Contact from '../pages/Contact.vue'
import Services from '../pages/Services.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/portfolio', component: Portfolio },
  { path: '/services', component: Services },
  { path: '/contact', component: Contact },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
