import { createRouter, createWebHistory } from 'vue-router'
// Route-level code splitting via dynamic imports for smaller initial bundle
const Home = () => import('../pages/Home.vue')
const Portfolio = () => import('../pages/Portfolio.vue')
const Contact = () => import('../pages/Contact.vue')
const PortfolioFolder = () => import('../pages/PortfolioFolder.vue')
const StatsProof = () => import('../pages/StatsProof.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/portfolio', component: Portfolio },
  { path: '/portfolio/:key', component: PortfolioFolder, name: 'PortfolioFolder' },
  { path: '/stats-proof', component: StatsProof },
  { path: '/contact', component: Contact },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
