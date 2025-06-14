<script setup>
    defineProps(['title', 'total', 'icon'])
    
</script>

<template>
    <div
            class="bg-white md:p-6 rounded-xl shadow-md flex items-center gap-5 transition-transform hover:-translate-y-1"
            >
            <div
                    class="w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl bg-gradient-to-br from-indigo-500 to-purple-600"
                    >
                    <i class="fas" :class="[icon || 'fa-users']"></i>
            </div>
        <div>
            <h3 class="text-xl font-bold text-gray-800">{{ total }}</h3>
            <p class="text-gray-500">{{ title }}</p>
        </div>
    </div>
</template>
