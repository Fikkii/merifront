import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Toast, { POSITION } from 'vue-toastification'

import Dropdown from './components/utils/Dropdown.vue'
import Table from './components/utils/Table.vue'
import CategorizedTable from './components/utils/CategorizedTable.vue'
import Card from './components/utils/Card.vue'

import { createPinia } from 'pinia'

const pinia = createPinia()

import { router } from './routes/index'

const app = createApp(App)
    app.component('Dropdown', Dropdown)
    app.component('Table', Table)
    app.component('CategorizedTable', CategorizedTable)
    app.component('Card', Card)
    app.use(pinia)
    .use(router)
    .use(Toast, {
        position: POSITION.TOP_RIGHT,
        timeout: 3000
    })
    .mount('#app')
