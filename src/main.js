import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles.css'
import Reveal from './directives/reveal'

const app = createApp(App)
app.directive('reveal', Reveal)
app.use(router).mount('#app')
