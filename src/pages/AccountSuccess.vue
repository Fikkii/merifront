<template>
  <div
    class="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-400 to-blue-500 text-white px-6"
  >
    <div
      class="bg-white rounded-xl shadow-lg max-w-md w-full p-8 text-center text-gray-800"
    >
      <svg
        class="mx-auto mb-6 w-20 h-20 text-green-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 13l4 4L19 7"
        ></path>
      </svg>
      <h1 class="text-3xl font-bold mb-4">Account Created Successfully!</h1>
      <p class="mb-8 text-gray-600">
        Your account has been set up. You can now log in and start learning.
      </p>
      <button
        @click="goToLogin"
        class="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition"
      >
        Go to Login
      </button>
    </div>
  </div>
</template>

<script setup>
const goToLogin = () => {
  window.location.href = '/login'
}
</script>

