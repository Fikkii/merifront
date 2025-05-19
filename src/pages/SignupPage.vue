<template>
    <div v-if="error" class="bg-red-500 p-4 m-5 text-white absolute w-[300px] top-0 right-0 rounded shadow">
        {{ error }}
    </div>
  <div class="flex h-screen bg-white">
    <!-- Left Section: Signup Form -->
    <div class="w-full md:w-1/2 flex items-center justify-center p-8">
      <div class="w-full max-w-md space-y-6">

        <!-- Signup Form -->
        <form @submit.prevent="handleSignup" class="space-y-4 bg-blue-50 p-6 rounded-lg shadow-2xl relative">
          <div>
            <label class="block mb-1 text-gray-700">Enter your email address</label>
            <input
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-2 border rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block mb-1 text-gray-700">Enter your password</label>
            <div class="relative">
              <input
                type="password"
                v-model="password"
                required
                class="w-full px-4 py-2 border rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label class="block mb-1 text-gray-700">Confirm your password</label>
            <div class="relative">
              <input
                type="password"
                v-model="confirmPassword"
                required
                class="w-full px-4 py-2 border rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            class="w-full flex gap-4 justify-center py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
            <span>Signup</span>
            <img v-if="isLoading" width="20" src="../assets/loader.gif" alt="spinner">
          </button>

          <RouterLink class="block text-center" :to="{ name: 'login' }">Already have an account?</RouterLink>
        </form>

        <p class="text-center text-xs text-gray-400 mt-20">Powered by <span class="text-blue-500 font-bold">fikki.com.ng</span></p>
      </div>
    </div>

    <!-- Right Section: Image -->
    <div class="hidden md:block md:w-1/2">
        <img
                src="../assets/login.png"
                alt="Man working on laptop"
                class="w-full h-full object-cover"
                />
    </div>
  </div>
</template>

<script setup>
    import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)

const isLoading = ref(false)
const error = ref('')

watch(error, ()=> {
    console.log('There is an error')
    isLoading.value = false
    setTimeout(() => {
        error.value = ''
    }, 5000)
})

const router = useRouter()

</script>


