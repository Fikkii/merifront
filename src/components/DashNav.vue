<script setup>
    import { ref } from 'vue'
    import { RouterLink } from 'vue-router'

    const links = [
    {
        title: 'Home',
        name: 'dashboard-home',
        icon: 'ri-home-line',
    },
    {
        title: 'Course',
        name: 'learning',
        icon: 'ri-donut-chart-line',
    },
    {
        title: 'Ebook',
        name: 'ebooks',
        icon: 'ri-book-shelf-line',
    },
    {
        title: 'profile',
        name: 'profile',
        icon: 'ri-user-line',
    }
    ]

</script>

<template>
    <div class="sticky bg-white flex gap-3 items-center justify-evenly py-7 border-t shadow-2xl border-gray-500 h-7 w-screen bottom-0 left-0">
        <div class="flex items-center justify-evenly w-full">
            <RouterLink v-for="link in links " :to="{name: link.name }" class="text-2xl flex flex-col items-center">
            <i :class="[link.icon]"></i>
            <span class="text-gray-500 text-sm">{{ link.title }}</span>
            </RouterLink>
        </div>
    </div>
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
    font-weight: bolder;
    color: blue;
    border-top: 4px solid blue
}

</style>

