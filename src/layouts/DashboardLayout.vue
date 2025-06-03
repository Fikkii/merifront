<script setup>
    import DashNav from '../components/DashNav.vue'
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
    <div class="min-h-screen flex bg-gray-50">
        <DashNav />
        <main
                :class="['flex-1 transition-all duration-300 ml-16', sidebarOpen ? 'md:ml-64' : 'md:ml-16']"
                class="p-4 sm:p-6 w-full overflow-auto"
                >
                <div class="w-full flex justify-end items-center h-[60px] top-0 left-0 bg-white absolute fixed pe-5">
                    <span>
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 18V6h-5v12h5Zm0 0h2M4 18h2.5m3.5-5.5V12M6 6l7-2v16l-7-2V6Z"/>
                        </svg>
                    </span>
                    <button @click="handleLogout">Logout</button>
                </div>
                <div class="mt-15">
                    <h2 class="text-indigo-500 font-bold mb-2 border-b-1">Quick Bar</h2>
                    <div class="flex gap-2 py-1 px-2 mb-2 pb-5 border-b-2 overflow-x-auto">
                        <RouterLink class="px-2 py-1 shadow-lg border border-gray-500 bg-white rounded" :to="{ name: 'chat' }">Gemini AI</RouterLink>
                        <RouterLink class="px-2 py-1 shadow-lg border border-gray-500 bg-white rounded" :to="{ name: 'learning' }">Modules</RouterLink>
                        <RouterLink class="px-2 py-1 shadow-lg border border-gray-500 bg-white rounded" :to="{ name: 'ebooks' }">Topics</RouterLink>
                        <RouterLink class="px-2 py-1 shadow-lg border border-gray-500 bg-white rounded" :to="{ name: 'profile' }">Profile</RouterLink>
                    </div>
                </div>
                <div>
                    <RouterView></RouterView>
                </div>
        </main>
    </div>
</template>

<style scoped>
.router-link-active{
    background-color: blue;
    color: white;
    border: none;
}
</style>

