<script setup>
    import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

import { useToast } from 'vue-toastification'

const toast = useToast()

const email = ref('')
const fullname = ref('')
const password = ref('')
const phone = ref('')

const group_link = ref('')

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
        phone.value = data.phone
        group_link.value = data.group_link
    }else{
      throw new Error(data.error)
    }
  } catch (e) {
    isLoading.value = false
    toast.error(e.message)
    console.error('Caught error:', e);
  }
}

async function handleUpdate() {
  isLoading.value = true
  try {
    const response = await axios.put('/api/student/me', { fullname: fullname.value, email: email.value, phone: phone.value})


    if (response.status == 200) {
        success.value = "profile updated"
        fetchProfile()
        toast.success('Profile Update Successfully')
    }

  } catch (e) {
    isLoading.value = false
    toast.error(e.message)
    console.error('Caught error:', e);
  }finally{
    setTimeout(() => {
        isLoading.value = false
    }, 3000)
  }
}

</script>

<template>
    <div>
        <!-- profile card -->
        <RouterLink class="text-blue-500 font-bold md:mb-5 block" :to="{ name: 'dashboard-home' }"> <i class="ri-arrow-left-line"></i>Go back</RouterLink>
        <div class="font-bold text-xl">
            Your Profile
        </div>
        <div class="flex flex-wrap shadow gap-4 rounded-lg justify-between md:my-10 mb-4 p-5 md:p-10 bg-yellow-100">
            <div class="prose">
                <div class="font-bold">Full-Name: {{ fullname }}</div>
                <div>Email: {{ email }}</div>
                <div>Phone: {{ phone }}</div>
            </div>
            <div class="flex flex-col gap-4">
                <a class="px-6 md:px-8 py-4 bg-blue-500 text-white rounded-sm" :href="`https://${group_link}`" target="_blank">Join Dedicated Group <i class="ri-arrow-right-line"></i></a>
                <RouterLink class="text-blue-500 font-bold mb-5" :to="{ name: 'peer' }">Check Peer Group <i class="ri-arrow-right-line"></i></RouterLink>
            </div>
        </div>
        <!-- Login Form -->
        <form @submit.prevent="e => handleUpdate(e)" class="space-y-4 bg-white border-blue-500 p-6 rounded-lg shadow-2xl relative">
            <span class="text-lg">Update Profile</span>
            <div>
                <label class="block mb-1 text-gray-700">Email</label>
                <input
                v-model="email"
                type="email"
                disabled
                class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label class="block mb-1 text-gray-700">Fullname</label>
                <input
                v-model="fullname"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label class="block mb-1 text-gray-700">Phone</label>
                <input
                v-model="phone"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button
                type="submit"
                class="w-full flex gap-4 justify-center py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                <span>Update Profile</span>
                <img v-if="isLoading" width="20" src="../../assets/loader.gif" alt="spinner">
            </button>
            <p class="text-red-500 font-bold">Changes are not reflected until update is done. Make sure to click on update to retain changes</p>
        </form>
    </div>
</template>

<style scoped>

</style>

