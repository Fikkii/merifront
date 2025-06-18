<script setup>
    import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

import { useUserStore } from '../store/user.js'

import GoogleSigninButton from '../components/GoogleSigninButton.vue'

const toast = useToast()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)

const isLoading = ref(false)

const showSignup = ref(false)

const router = useRouter()

function handleGoogleOauth(data){
    isLoading.value = true
    if(data.token){
      // Get user pinia store and save token and role
      const store = useUserStore()
      store.setToken(data.token)
      store.setRole(data.user.role)

      localStorage.setItem('jwt-token', data.token);
      localStorage.setItem('user-role', data.user.role);
      toast.success('Login Successfull.')

      //proper redirection after login based on role
        router.push({ name: 'role' })

    }else{
      toast.error('Unable to login')
    }
}

async function handleSignup() {
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
      toast.success('Account has been created successfully')
      showSignup.value = false
      isLoading.value = false
    }else{
        throw new Error(data.error)
    } 
  } catch (e) {
      isLoading.value = false
    toast.error(e.message)
  }
}

function handleSubmit(e){
    if(showSignup.value){
        handleSignup()
    }else{
        handleLogin()
    }
}

async function handleLogin() {
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

    if (response.ok) {
      const store = useUserStore()
      store.setToken(data.token)
      store.setRole(data.user.role)
      localStorage.setItem('jwt-token', data.token);
      localStorage.setItem('user-role', data.user.role);
      toast.success('Login Successfull.')
      router.push({ name: 'role' })
    }else {
      throw new Error(data.error)
    }
  } catch (e) {
    isLoading.value = false
    toast.error(e.message)
  }
}
</script>
<template>
  <div class="flex h-screen bg-white">
    <!-- Left Section: Login Form -->
    <div class="w-full md:w-1/2 flex items-center justify-center p-8">
      <div class="w-full max-w-md mt-20 space-y-3">
          <div>
              <div class="text-2xl">{{ showSignup ? 'Signup' : 'Login' }} To Continue</div>
          </div>
          <!-- Login Form -->
          <form @submit.prevent="e => handleSubmit(e)" class="space-y-4 bg-blue-50 border-blue-500 p-6 rounded-lg shadow-2xl relative">
              <GoogleSigninButton @success="handleGoogleOauth" />
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
                              <span v-if="showPassword"><i class="ri-eye-close-line"></i> </span>
                              <span v-else><i class="ri-eye-line"></i> </span>
                      </button>
                  </div>
              </div>

              <div v-if="showSignup">
                  <label class="block mb-1 text-gray-700">Confirm your password</label>
                  <div class="relative">
                      <input
                              type="password"
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

              <RouterLink :to="{ name: 'reset-password-email' }" href="#" class="text-blue-600 float-right hover:underline">Forgot password?</RouterLink>

              <button
                      type="submit" :hidden="isLoading"
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
