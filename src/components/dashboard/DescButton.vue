<script setup>
    defineProps(['title', 'desc', 'to'])
</script>
<template>
    <div class="mt-3 flex justify-between items-center rounded px-8 py-4 shadow" :class="$attrs.class">
        <div>
            <div class="font-bold">
                <slot />
                {{ title }}
            </div>
            <span>{{ desc }}</span>
        </div>
        <RouterLink :to="{ name: to }" class="bg-indigo-500 px-4 py-2 text-white rounded shadow-lg">Continue</RouterLink>
    </div>
</template>
