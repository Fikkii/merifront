<script setup>
    import { ref } from 'vue'
    import { RouterLink } from 'vue-router'

const sidebarOpen = ref(true)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}
</script>

<template>
    <aside
            :class="['fixed top-0 left-0 h-full transition-all duration-300 bg-white shadow-lg z-30', sidebarOpen ? 'w-64' : 'w-16']"
            class="p-1"
            >
            <button @click="toggleSidebar" :class="[sidebarOpen == false ? 'hidden' : '']" class="z-[-1] md:hidden w-screen absolute h-full top-0 left-0"></button>
            <div class="flex justify-between items-center mb-6">
                <h1 v-if="sidebarOpen" class="text-2xl flex items-center font-bold text-blue-600"><img width="65" src="../assets/logo.png">Welcome</h1>
                <button @click="toggleSidebar" class="text-gray-500 md:hidden hover:text-blue-600">
                    <span v-if="sidebarOpen">
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                        </svg>
                    </span>
                    <span v-else>
                        <svg class="w-[32px] h-[32px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.3" d="M6 6h8m-8 4h12M6 14h8m-8 4h12"/>
                        </svg>
                    </span>
                </button>
            </div>
            <nav class="space-y-4">
                <RouterLink :to="{ name: 'dashboard-home' }" class="w-full flex items-center justify-center md:justify-start gap-2 p-2 rounded hover:bg-blue-50">
                <span><i class="ri-home-2-line text-2xl"></i></span>
                <span v-if="sidebarOpen">Home</span>
                </RouterLink>
                <RouterLink :to="{ name: 'learning' }" class="w-full flex items-center gap-2 p-2 justify-center md:justify-start  rounded hover:bg-blue-50">
                <span><i class="ri-keyboard-line text-2xl"></i ></span>
                <span v-if="sidebarOpen">Learning Path</span>
                </RouterLink>
                <RouterLink :to="{ name: 'chat' }" class="w-full flex items-center gap-2 p-2 justify-center md:justify-start  rounded hover:bg-blue-50">
                <span><i class="ri-quill-pen-ai-line text-2xl"></i ></span>
                <span v-if="sidebarOpen">Ask AI</span>
                </RouterLink>
                <RouterLink :to="{ name: 'ebooks' }" class="w-full flex items-center gap-2 p-2 justify-center md:justify-start  rounded hover:bg-blue-50">
                <span><i class="ri-git-repository-line text-2xl"></i></span>
                <span v-if="sidebarOpen">Ebook</span>
                </RouterLink>
                <RouterLink :to="{ name: 'profile' }" class="w-full flex items-center gap-2 p-2 justify-center md:justify-start  rounded hover:bg-blue-50">
                <span><i class="ri-file-user-line text-2xl"></i></span>
                <span v-if="sidebarOpen">Profile</span>
                </RouterLink>
                <RouterLink :to="{ name: 'admin-home' }" class="w-full flex items-center gap-2 p-2 justify-center md:justify-start  rounded hover:bg-blue-50">
                <span><i class="ri-admin-fill text-3xl"></i></span>
                <span v-if="sidebarOpen">Admin</span>
                </RouterLink>
            </nav>
    </aside>
</template>

<style scoped>
::-webkit-scrollbar {
    width: 6px;
}
::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
}

.router-link-exact-active {
    background-color: blue;
    color: white !important;
}

</style>

