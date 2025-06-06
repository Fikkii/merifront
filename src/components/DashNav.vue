<script setup>
    import { ref } from 'vue'
    import { RouterLink } from 'vue-router'
</script>

<template>
    <div class="sticky bg-white flex gap-3 items-center justify-evenly py-7 border-t shadow-2xl border-gray-500 h-7 w-screen bottom-0 left-0">
        <div class="flex flex-col items-center">
            <a class="text-2xl" href="#" target="_blank"><i class="ri-home-line"></i></a>
            <div class="font-bold">Home</div>
        </div>
        <div class="flex flex-col items-center">
            <a class="text-2xl" href="#" target="_blank"><i class="ri-home-line"></i></a>
            <div class="font-bold">Home</div>
        </div>
        <div class="flex flex-col items-center">
            <a class="text-2xl" href="#" target="_blank"><i class="ri-home-line"></i></a>
            <div class="font-bold">Home</div>
        </div>
        <div class="flex flex-col items-center">
            <a class="text-2xl" href="#" target="_blank"><i class="ri-home-line"></i></a>
            <div class="font-bold">Home</div>
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
    background-color: blue;
    color: white !important;
}

</style>

