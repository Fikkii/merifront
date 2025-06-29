<script setup>
    import { ref } from 'vue'

    const ChooseUs = [
    {
        title: 'Designed for Learning Success',
        content: 'With detail topics and instructions, we focus on not just learning but also practice',
        icon: 'ri-graduation-cap-line'
    },
    {
        title: 'Real Progress Tracking',
        content: 'We evaluate students and help them perform better with project and peered learning',
        icon: 'ri-checkbox-multiple-line'
    },
    {
        title: 'We actually support you',
        content: 'With a active community ready to listen to your disputes and clear you of any misunderstandings',
        icon: 'ri-customer-service-2-line'
    },
    ]

    const delay = ref(0)

</script>

<template>
    <!-- Why Choose Us Section -->
    <section class="py-16 px-6 lg:px-20">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-2xl font-bold text-gray-900 text-center mb-10">Why MeriLearn Works for Real Learning</h2>
        <div class="grid md:grid-cols-3 gap-5">
            <div v-for="(choose, index) in ChooseUs" class="flex flex-col border border-gray-300 rounded-lg shadow p-5 items-start gap-4">
            <i :class="[choose.icon]" class="text-3xl"></i>
            <div>
                <h3 class="font-semibold text-lg text-gray-900">{{ choose.title }}</h3>
                <p class="text-gray-700 mt-1">{{ choose.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

</template>

<style scoped>
    
</style>


