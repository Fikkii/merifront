<script setup>
    import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const props = defineProps({
    token: {
        type: String,
        default: null
    }
})

const toast = useToast()

const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)

const showSuccess = ref(false)

const isLoading = ref(false)

const showSignup = ref(true)

const router = useRouter()

async function handleSubmit() {
  isLoading.value = true
  if(props.token){
      try {
      console.log(props.token)
        if ( password.value != confirmPassword.value ){
            throw new Error('password does not match...')
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/reset-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: props.token,
            password: password.value
          }),
        });

        const data = await response.json();

        if (response.ok) {
          router.push({ name: 'login' })
          toast.success('Password has been Changed, Login to continue')
          isLoading.value = false
        }else{
            throw new Error('This Token is Invalid or has expired Token')
        } 
      } catch (e) {
          isLoading.value = false
          toast.error(e.message)
      }
  }else{
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: confirmPassword.value
          }),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success('Link sent, Check your email')
          showSuccess.value = true
          isLoading.value = false
        }else{
            throw new Error(data.error)
        } 
      } catch (e) {
          isLoading.value = false
          toast.error(e.message)
      }
  }
}

</script>

<template>
    <div class="flex h-screen bg-white">
        <!-- Left Section: Login Form -->
        <div v-if="showSuccess" class="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
            <div class="text-3xl font-bold text-indigo-500"><i class="ri-mail-unread-line text-6xl"></i>Check Your Mail</div>
            <div class="opacity-75 border-t-2 pt-3 mt-2">We've sent a link to your mail, please use it to reset your password</div>
            <div class="prose mt-4">
                <h3>Tips for creating a strong password</h3>
                <ul>
                    <li>Make sure your password is more than 8</li>
                    <li>Include Symbols and Numbers</li>
                    <li>use a password manager, use suggested password and let it handle your password for you</li>
                    <li>Make sure to secure your password manager</li>
                </ul>
                <RouterLink :to="{ name: 'reset-password-email' }">Resend Email</RouterLink>
            </div>
        </div>
        <div v-else class="w-full md:w-1/2 flex items-center justify-center p-8">
            <div class="w-full max-w-md space-y-6">
                <div>
                    <div v-if="!token" class="text-2xl text-indigo-500">Enter Email to continue</div>
                    <div v-else class="text-2xl text-indigo-500">Change your password</div>
                    <span v-if="!token" class="text-gray-500">Please provide your email, a reset link will be sent to you, click on that link to continue...</span>
                    <span v-else class="text-gray-500">In setting a strong password, it is adviced you use sentences you can remember.This makes it hard to break for hackers</span>
                </div>

                <!-- Login Form -->
                <form @submit.prevent="e => handleSubmit(e)" class="space-y-4 bg-blue-50 border-blue-500 p-6 rounded-lg shadow-2xl relative">
                    <div v-if="token">
                        <label class="block mb-1 text-gray-700">Enter new password</label>
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

                    <div>
                        <label class="block mb-1 text-gray-700">{{ token ? 'Confirm your password' : 'Enter Email'}}</label>
                        <div class="relative">

                            <input v-if="token"
                                   type="password"
                                    v-model="confirmPassword"
                                    required
                                    class="w-full px-4 py-2 border rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                            <input v-else
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

                    <button
                            type="submit"
                            class="w-full flex gap-4 justify-center py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                            >
                            <span>{{ token ? 'Change Password' : 'Send Reset Link' }}</span>
                            <img v-if="isLoading" width="20" src="../assets/loader.gif" alt="spinner">
                    </button>

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

