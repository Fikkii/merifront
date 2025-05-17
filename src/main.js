import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { createPinia } from 'pinia'

const pinia = createPinia()

import { router } from './routes/index'

const app = createApp(App)
    app.use(pinia).use(router).mount('#app')
