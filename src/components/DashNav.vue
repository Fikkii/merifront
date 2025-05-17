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
            class="p-4"
            >
            <div class="flex justify-between items-center mb-6">
                <h1 v-if="sidebarOpen" class="text-2xl font-bold text-blue-600">AI Buddy</h1>
                <button @click="toggleSidebar" class="text-gray-500 hover:text-blue-600">
                    <span v-if="sidebarOpen">🔽</span>
                    <span v-else>📖</span>
                </button>
            </div>
            <nav class="space-y-4">
                <RouterLink :to="{ name: 'dashboard-home' }" class="w-full flex items-center gap-2 p-2 rounded hover:bg-blue-50">
                    <span>🏠</span>
                    <span v-if="sidebarOpen">Home</span>
                </RouterLink>
                <RouterLink :to="{ name: 'chat' }" class="w-full flex items-center gap-2 p-2 rounded hover:bg-blue-50">
                    <span>🤖</span>
                    <span v-if="sidebarOpen">Ask AI</span>
                </RouterLink>
                <RouterLink :to="{ name: 'todo' }" class="w-full flex items-center gap-2 p-2 rounded hover:bg-blue-50">
                    <span>🤖</span>
                    <span v-if="sidebarOpen">Todo</span>
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

</style>

