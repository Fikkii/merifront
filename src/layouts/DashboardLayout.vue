<script setup>
    import DashNav from '../components/DashNav.vue'
    import Header from '../components/dashboard/Header.vue'
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'

const router = useRouter()

const sidebarOpen = ref(true)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

function handleLogout(){
    localStorage.removeItem('jwt-token')
    router.push({ name: 'home' })
}
</script>

<template>
    <div class="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <RouterView class="flex-1"></RouterView>
        <DashNav />
    </div>
</template>

<style scoped>
.router-link-active{
    background-color: blue;
    color: white;
    border: none;
}
</style>

