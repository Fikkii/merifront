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

import { useUserStore } from './store/user'
import { hasPermission } from './controllers/permissions'

import { router } from './routes/index'

router.beforeEach((to, from, next) => {
    const userStore = useUserStore()

    //Check if user has permission to access page...
    const requiredPermission = to.meta.permission

    if (!requiredPermission || hasPermission(userStore.role, requiredPermission)) {
        next()
    } else {
        next('/unauthorized')
    }
})

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
