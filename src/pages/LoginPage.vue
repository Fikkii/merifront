<template>
    <div v-if="error" class="bg-red-500 p-4 m-5 text-white absolute w-[300px] top-0 right-0 rounded shadow">
        {{ error }}
    </div>
  <div class="flex h-screen bg-white">
    <!-- Left Section: Login Form -->
    <div class="w-full md:w-1/2 flex items-center justify-center p-8">
      <div class="w-full max-w-md space-y-6">
          <div>
              <div class="text-2xl">{{ showSignup ? 'Signup' : 'Login' }} To Continue</div>
              <span class="text-gray-500">Please provide the following details to continue</span>
          </div>
          <!-- Login Form -->
          <form @submit.prevent="e => handleSubmit(e)" class="space-y-4 bg-blue-50 border-blue-500 p-6 rounded-lg shadow-2xl relative">
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
                              :type="showPassword ? 'text' : 'password'"
                              v-model="password"
                              required
                              class="w-full px-4 py-2 border rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                      <button
                              type="button"
                              @click="showPassword = !showPassword"
                              class="absolute inset-y-0 right-3 flex items-center text-gray-600"
                              >
                              <span v-if="showPassword"> </span>
                              <span v-else> </span>
                      </button>
                  </div>
              </div>

              <div v-if="showSignup">
                  <label class="block mb-1 text-gray-700">Confirm your password</label>
                  <div class="relative">
                      <input
                              v-model="confirmPassword"
                              required
                              class="w-full px-4 py-2 border rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                      <button
                              type="button"
                              @click="showPassword = !showPassword"
                              class="absolute inset-y-0 right-3 flex items-center text-gray-600"
                              >
                              <span v-if="showPassword"> </span>
                              <span v-else> </span>
                      </button>
                  </div>
              </div>

              <a href="#" class="text-blue-600 float-right hover:underline">Forgot password?</a>

              <button
                      type="submit"
                      class="w-full flex gap-4 justify-center py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                      >
                      <span>{{ showSignup ? 'Signup' : 'Login' }}</span>
                      <img v-if="isLoading" width="20" src="../assets/loader.gif" alt="spinner">
              </button>

              <button id="toggler" @click="showSignup = !showSignup" class="block m-auto text-center text-blue-800 rounded">{{ showSignup ? "Already have an account?" : "Don't have an account?"}}</button>
          </form>

          <p class="text-center text-xs text-gray-400 mt-20">Powered by <span class="text-blue-500 font-bold">fikki.com.ng</span></p>
      </div>
    </div>

    <!-- Right Section: Image -->
    <div class="hidden md:block md:w-1/2">
        <img
                src="../assets/login.jpg"
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

const showSignup = ref(false)

const isLoading = ref(false)
const error = ref('')

watch(error, ()=> {
    console.log('There is an error')
    setTimeout(() => {
        error.value = ''
    }, 5000)
})

const router = useRouter()

async function handleSignup() {
  isLoading.value = true
  try {
    if ( password.value != confirmPassword.value ){
        throw new Error('password does not match...')
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('jwt-token', data.token);
      router.push({ name: 'success' })
    }else{
        throw new Error(data.error)
    } 
  } catch (e) {
    isLoading.value = false
    error.value = e
    console.error('Caught error:', e);
  }
}

function handleSubmit(e){
    console.log(e)

    if(showSignup.value){
        handleSignup()
    }else{
        handleLogin()
    }
}

async function handleLogin() {
  isLoading.value = true
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    });

    const data = await response.json();

    console.log('Response status:', response.status);
    console.log('Response data:', data);

    if (response.ok) {
      localStorage.setItem('jwt-token', data.token);
      router.push({ name: 'dashboard-home' })
    }else {
      throw new Error(data.error)
    }
  } catch (e) {
    isLoading.value = false
    error.value = e
    console.error('Caught error:', e);
  }
}
</script>
