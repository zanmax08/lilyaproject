import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Portfolio from '../pages/Portfolio.vue'
import Contact from '../pages/Contact.vue'
import PortfolioFolder from '../pages/PortfolioFolder.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/portfolio', component: Portfolio },
  { path: '/portfolio/:key', component: PortfolioFolder, name: 'PortfolioFolder' },
  { path: '/contact', component: Contact },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
