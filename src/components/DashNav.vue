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
            <div class="flex justify-between items-center mb-6">
                <h1 v-if="sidebarOpen" class="text-2xl font-bold text-blue-600">Welcome</h1>
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
                <RouterLink :to="{ name: 'chat' }" class="w-full flex items-center gap-2 p-2 justify-center md:justify-start  rounded hover:bg-blue-50">
                <span><i class="ri-quill-pen-ai-line text-2xl"></i ></span>
                <span v-if="sidebarOpen">Ask AI</span>
                </RouterLink>
                <RouterLink :to="{ name: 'ebooks' }" class="w-full flex items-center gap-2 p-2 justify-center md:justify-start  rounded hover:bg-blue-50">
                <span><i class="ri-git-repository-line text-2xl"></i></span>
                <span v-if="sidebarOpen">Ebook</span>
                </RouterLink>
                <RouterLink :to="{ name: 'about' }" class="w-full flex items-center gap-2 p-2 justify-center md:justify-start  rounded hover:bg-blue-50">
                <span><i class="ri-information-line text-2xl"></i></span>
                <span v-if="sidebarOpen">Info</span>
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

