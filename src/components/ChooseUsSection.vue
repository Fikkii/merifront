<script setup>
    import { ref } from 'vue'

    const ChooseUs = [
    {
        title: 'Project Based Assessment',
    },
    {
        title: 'Peered Group Learning',
    },
    {
        title: 'AI Powered Dashboard',
    },
    {
        title: 'Designed for Learning Success',
    },
    {
        title: 'Real Progress Tracking',
    },
    {
        title: 'We actually support you',
    },
    ]

    const delay = ref(0)

</script>

<template>
    <!-- Why Choose Us Section -->
    <section>
      <div class="max-w-5xl w-full mx-auto">
        <div class="flex flex-col">
            <div v-for="(choose, index) in ChooseUs" class="flex gap-3 gap-4">
                <i class="ri-check-double-line text-lg text-green-600"></i>
                <h3 class="font-semibold text-lg text-gray-900">{{ choose.title }}</h3>
            </div>
        </div>
      </div>
    </section>

</template>

<style scoped>

</style>


