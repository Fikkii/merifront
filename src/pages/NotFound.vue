<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
    <h1 class="text-6xl sm:text-7xl font-extrabold text-gray-800 mb-4">404</h1>
    <h2 class="text-2xl sm:text-3xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
    <p class="text-sm sm:text-base text-gray-500 mb-6">
      The page you're looking for doesn’t exist or has been moved.
    </p>
    <router-link
            to="/"
            class="px-5 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
      Back to Home
    </router-link>
  </div>
</template>

<script setup>

</script>

<style scoped>
</style>

