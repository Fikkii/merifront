<script setup>
import DashNav from '../components/admin/DashNav.vue'
import Header from '../components/admin/Header.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const toggle = ref(true)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

function handleLogout() {
  localStorage.removeItem('jwt-token')
  router.push({ name: 'home' })
}

function handleToggle(state){
    toggle.value = state
}

</script>

<template>
  <div class="flex min-h-screen bg-gray-100">
    <DashNav :state="toggle" />
    <div class="flex-1 flex flex-col overflow-hidden">
      <Header @toggle="handleToggle"/>
      <div class="p-5">
          <RouterView />
      </div>
    </div>
  </div>
</template>

