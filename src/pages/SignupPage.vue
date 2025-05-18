<template>
    <div v-if="error" class="bg-red-500 p-4 m-5 text-white absolute w-[300px] top-0 right-0 rounded shadow">
        {{ error }}
    </div>
  <div class="flex h-screen bg-white">
    <!-- Left Section: Signup Form -->
    <div class="w-full md:w-1/2 flex items-center justify-center p-8">
      <div class="w-full max-w-md space-y-6">

        <!-- Signup Form -->
        <form @submit.prevent="handleSignup" class="space-y-4 border-[3px] border-blue-500 p-6 rounded-lg shadow-2xl relative">
            <h2 class="text-2xl underline">Signup to Continue</h2>
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
                <span v-if="showPassword">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path d="m4 15.6 3.055-3.056A4.913 4.913 0 0 1 7 12.012a5.006 5.006 0 0 1 5-5c.178.009.356.027.532.054l1.744-1.744A8.973 8.973 0 0 0 12 5.012c-5.388 0-10 5.336-10 7A6.49 6.49 0 0 0 4 15.6Z"/>
  <path d="m14.7 10.726 4.995-5.007A.998.998 0 0 0 18.99 4a1 1 0 0 0-.71.305l-4.995 5.007a2.98 2.98 0 0 0-.588-.21l-.035-.01a2.981 2.981 0 0 0-3.584 3.583c0 .012.008.022.01.033.05.204.12.402.211.59l-4.995 4.983a1 1 0 1 0 1.414 1.414l4.995-4.983c.189.091.386.162.59.211.011 0 .021.007.033.01a2.982 2.982 0 0 0 3.584-3.584c0-.012-.008-.023-.011-.035a3.05 3.05 0 0 0-.21-.588Z"/>
  <path d="m19.821 8.605-2.857 2.857a4.952 4.952 0 0 1-5.514 5.514l-1.785 1.785c.767.166 1.55.25 2.335.251 6.453 0 10-5.258 10-7 0-1.166-1.637-2.874-2.179-3.407Z"/>
</svg>

                </span>
                <span v-else>
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd"/>
</svg>

                </span>
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between text-sm text-gray-600">
            <label class="flex items-center space-x-2">
              <input type="checkbox" v-model="rememberMe" />
              <span>Remember for 30 days</span>
            </label>
            <a href="#" class="text-blue-600 hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            class="w-full flex gap-4 justify-center py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
            <span>Signup</span>
            <img v-if="isLoading" width="20" src="../assets/loader.gif" alt="spinner">
          </button>

          <!-- social -->
          <div class="absolute grid grid-cols-4 place-center gap-3 w-[300px] bottom-0 left-0 mb-[-50px]">
              <a class="rounded p-2 opacity-70" href="#">
                  <svg class="w-6 h-6 m-auto rounded border text-black dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clip-rule="evenodd"/>
                  </svg>
              </a>
              <a class="rounded p-2 bg-green-500" href="#">
                  <svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M22 5.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.343 8.343 0 0 1-2.605.981A4.13 4.13 0 0 0 15.85 4a4.068 4.068 0 0 0-4.1 4.038c0 .31.035.618.105.919A11.705 11.705 0 0 1 3.4 4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 6.1 13.635a4.192 4.192 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 2 18.184 11.732 11.732 0 0 0 8.291 20 11.502 11.502 0 0 0 19.964 8.5c0-.177 0-.349-.012-.523A8.143 8.143 0 0 0 22 5.892Z" clip-rule="evenodd"/>
                  </svg>
              </a>
              <a class="p-2 bg-blue-500 opacity-70" href="#">
                  <svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clip-rule="evenodd"/>
                      <path d="M7.2 8.809H4V19.5h3.2V8.809Z"/>
                  </svg>
              </a>
              <a class="opacity-70 p-2 h-[40px]" href="#">
                  <svg class="text-black dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clip-rule="evenodd"/>
                  </svg>
              </a>
          </div>
          <div class="border-b-2"></div>
          <RouterLink class="block text-center bg-orange-500 text-white rounded shadow opacity-70 p-2 hover:opacity-90" :to="{ name: 'login' }">Login</RouterLink>
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

async function handleSignup() {
isLoading.value = true
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    });

    const data = await response.json();


    if (response.ok) {
      localStorage.setItem('jwt-token', data.token);
      router.push({ name: 'success' })
    } else {
      error.value = data.error
      console.error('Server responded with error:', data);
    }
  } catch (error) {
    console.error('Caught error:', error);
  }
}
</script>


