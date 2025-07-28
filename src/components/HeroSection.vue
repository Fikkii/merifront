<script setup>

</script>

<template>
    <!-- Hero Section -->
    <main>
        <div class="max-w-6xl mx-auto px-6 flex pt-12 flex-col md:flex-row justify-evenly py-4">
            <!-- Text Content -->
            <section class="space-y-6">
                <h1 class="text-4xl font-extrabold uppercase leading-tight">
                    Start your journey into Tech
                </h1>
                <p class="text-gray-400 text-lg">
                Together, let's shape the future by connecting learning with real-world opportunities through impactful mentorship and hands-on training. 
                </p>
                <div class="flex-col md:flex-row gap-3">
                    <router-link to="/login" class="flex gap-3 max-w-1/4 bg-red-600 text-white px-6 py-3 rounded-lg shadow hover:bg-red-800 transition">
                        <span>Start now</span>
                        <i class="ri-arrow-right-line"></i>
                    </router-link>
                    <router-link to="/login" class="flex gap-3 max-w-2/4 text-red-600 font-bold px-6 py-3 rounded-lg transition">
                        <span>About us</span>
                        <i class="ri-arrow-right-line"></i>
                    </router-link>
                </div>
            </section>
            <!-- Image -->
            <section>
                <img src="../assets/hero.png" alt="Coding Illustration" class="w-full mx-auto" />
            </section>
        </div>
    </main>
</template>

<style scoped>

main {
    background-image: url('/hero.jpg');
    background-size: cover;
    box-shadow: 0px 10px 12px 1px rgba(0, 0, 0, 0.5)
}

</style>

