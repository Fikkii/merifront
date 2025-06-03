<script setup>
    import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const email = ref('')
const fullname = ref('')
const password = ref('')

const isLoading = ref(false)
const error = ref('')
const success = ref('')

watch(error, ()=> {
    console.log('There is an error')
    setTimeout(() => {
        error.value = ''
    }, 5000)
})

onMounted(() => fetchProfile())

async function fetchProfile() {
  try {
    const res = await axios.get('/api/student/me')

    if (res.status == 200) {
        const data = await res.data
        email.value = data.email
        fullname.value = data.fullname
    }else{
      throw new Error(data.error)
    }
  } catch (e) {
    isLoading.value = false
    error.value = e
    console.error('Caught error:', e);
  }
}

async function handleUpdate() {
  isLoading.value = true
  try {
    const response = await axios.put('/api/student/me', { fullname: fullname.value, email: email.value, password: password.value })


    if (response.status == 200) {
        success.value = "profile updated"
        fetchProfile()
    }

  } catch (e) {
    isLoading.value = false
    error.value = e
    console.error('Caught error:', e);
  }
}

</script>

<template>
    <div>
        <!-- Success Message -->
        <div v-if="success" class="bg-green-500 p-4 m-5 text-white absolute w-[300px] top-0 right-0 rounded shadow">
            {{ success }}
        </div>
        <!-- Error Message-->
        <div v-if="error" class="bg-red-500 p-4 m-5 text-white absolute w-[300px] top-0 right-0 rounded shadow">
            {{ error }}
        </div>

        <!-- Login Form -->
        <form @submit.prevent="e => handleUpdate(e)" class="space-y-4 bg-blue-50 border-blue-500 p-6 rounded-lg shadow-2xl relative">
            <span class="text-lg">Update Profile</span>
            <div>
                <label class="block mb-1 text-gray-700">Email</label>
                <input
                v-model="email"
                type="email"
                class="w-full px-4 py-2 border rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label class="block mb-1 text-gray-700">Fullname</label>
                <input
                v-model="fullname"
                type="text"
                class="w-full px-4 py-2 border rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label class="block mb-1 text-gray-700">Password</label>
                <input
                v-model="password"
                type="text"
                class="w-full px-4 py-2 border rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button
                type="submit"
                class="w-full flex gap-4 justify-center py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                <span>Update Profile</span>
                <img v-if="isLoading" width="20" src="../../assets/loader.gif" alt="spinner">
            </button>
        </form>
    </div>
</template>

<style scoped>

</style>

