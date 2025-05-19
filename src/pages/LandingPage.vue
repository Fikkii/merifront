<template>
  <div id="cover" class="min-h-screen bg-gradient-to-br font-sans">
    <!-- Hero Section -->
    <section class="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
      <div class="flex-1 space-y-6 text-center md:text-left">
        <h1 class="text-4xl font-extrabold leading-tight">
          Supercharge Your Learning <br />
          with AI-Powered Study Tools
        </h1>
        <p class="text-white text-lg max-w-md mx-auto md:mx-0">
          Personalized quizzes, study plans, and progress tracking — all tailored to you.
        </p>
        <div class="flex justify-center md:justify-start gap-6 mt-6">
          <RouterLink
            :to="{ name: 'login' }"
            class="border border-white text-white bg-indigo-500 px-8 py-3 rounded-full hover:bg-white hover:text-indigo-700 transition"
          >
            Get Started
          </RouterLink>
        </div>
        <p class="text-center text-xs text-gray-400 mt-20">Powered by <span class="text-blue-500 font-bold">fikki.com.ng</span></p>
      </div>
    </section>
  </div>
</template>

<style scoped>
#cover{
    background-color: black;
    color: white;
}

</style>

<script setup>

</script>

