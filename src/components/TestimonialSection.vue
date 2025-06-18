<script setup>
    const testimonials = [
    {
        student: 'Amina T.',
        text: 'The project based assessment which evaluates students performance is what i like about the site, The fact that i can go over my assignment and re-assess my self based on highlighted weakness',
        occupation: 'Student'
    },
    {
        student: 'Toheeb Salami',
        text: 'The highlight of program curriculum and strict adherence to it is what amazes me. Not to talk of the dashboard which highlights every topic perfectly with examples',
        occupation: 'Educator'
    },
    {
        student: 'Chioma A.',
        text: 'The AI chat and the ebook recommender is what i love most about the website, Not only do we get taught but avenues are created for research directly from the platform',
        occupation: 'Student'
    },
    ]

</script>

<template>
    <!-- Testimonials Section -->
    <section class="bg-white py-12 px-6 lg:px-20">
        <div class="max-w-6xl mx-auto text-center">
            <h2 class="text-2xl font-bold text-gray-800 mb-8">What our users are saying</h2>
            <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div data-aos="flip-right" v-for="testimonial in testimonials" class="bg-gray-50 shadow-sm rounded-lg p-6">
                    <p class="text-gray-700 italic">{{ testimonial.text }}</p>
                    <div class="mt-4 font-semibold text-blue-600">{{ testimonial.student }} - {{ testimonial.occupation }}</div>
                </div>
            </div>
        </div>
    </section>

</template>

<style scoped>

</style>


