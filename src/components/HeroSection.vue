<script setup>

</script>

<template>
    <!-- Hero Section -->
    <main class="grid grid-cols-1 lg:grid-cols-10 items-center px-6 lg:px-20 py-5 gap-10 bg-black">
      <!-- Text Content -->
      <section class="lg:col-span-5 space-y-6">
        <h1 class="text-4xl font-extrabold text-white leading-tight">
            Transforming Students into Leaders
        </h1>
        <p class="text-gray-400 text-lg">
           Together, let's shape the future by connecting learning with real-world opportunities through impactful mentorship and hands-on training. 
        </p>
        <router-link to="/login" class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition">
            Join the next cohort
        </router-link>
      </section>
      <!-- Image -->
      <section class="lg:col-span-5">
        <img src="../assets/hero.png" alt="Coding Illustration" class="w-full max-w-sm mx-auto" />
      </section>
    </main>
</template>

<style scoped>
    
</style>

