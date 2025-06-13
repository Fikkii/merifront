<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
    <h1 class="text-6xl sm:text-7xl font-extrabold text-red-600 mb-4">403</h1>
    <h2 class="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2">Unauthorized Access</h2>
    <p class="text-sm sm:text-base text-gray-600 mb-6">
      You do not have the required permissions to access this page.
    </p>
    <button @click="router.go(-1)"
      class="px-5 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
    >
        Go Back
    </button>
  </div>
</template>

<script setup>
    import { useRouter } from 'vue-router'

    const router = useRouter()
</script>

<style scoped>
</style>

