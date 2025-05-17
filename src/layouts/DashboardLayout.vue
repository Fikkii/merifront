<script setup>
    import DashNav from '../components/DashNav.vue'
    import { ref } from 'vue'

const sidebarOpen = ref(true)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}
</script>

<template>
    <div class="min-h-screen flex bg-gray-50">
        <DashNav />
        <main
                :class="['flex-1 transition-all duration-300 ml-16', sidebarOpen ? 'md:ml-64' : 'md:ml-16']"
                class="p-4 sm:p-6 w-full overflow-auto"
                >
                <h2 class="text-2xl font-semibold mb-4">Welcome back, Student!</h2>
                <RouterView></RouterView>
        </main>
    </div>
</template>

<style scoped>

</style>

