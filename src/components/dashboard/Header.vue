<script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { useToast } from 'vue-toastification'

    import axios from 'axios'

const toggle = ref(false)

const router = useRouter()
const toast = useToast()

const toggleSidebar = () => {
  toggle.value = !toggle.value
}

function handleLogout(){
    localStorage.removeItem('jwt-token')
    localStorage.removeItem('user-role')
    router.push({ name: 'login' })
}

async function fetchProfile() {
  try {
    const res = await axios.get('/api/student/me')

    if (res.status == 200) {
        const data = await res.data
        return data.email
    }else{
      toast.error('Server Error, Please contact support')
      throw new Error(data.error)
    }
  } catch (e) {
    console.error('Caught error:', e);
  }
}


async function handleChangePassword(){
  try {
    /** fetch user profile so as to get their email and then use it to send their password reset link to their email **/
    const email = await fetchProfile()

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email
      }),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success('Password reset link sent, Check your email')
    }else{
        throw new Error(data.error)
    } 
  } catch (e) {
      toast.error(e.message)
  }
}

</script>

<template>
  <header class="sticky z-999 top-0 left-0 bg-white py-3 px-4 flex justify-between relative items-center">
    <!-- dynamic side nav -->
    <div v-if="toggle" class="bg-white translate-y-[100%] rounded shadow-2xl w-40 absolute bottom-0 right-0">
        <div class="flex rounded flex-col justify-stretch">
            <button @click="handleChangePassword" :to="{ name: 'home' }" class="w-full p-2 border-b border-gray-200"><i class="ri-key-2-line"></i> Change Password</button>
            <button @click="handleLogout" class="w-full p-2 border-b border-gray-200"><i class="ri-logout-box-line"></i> Logout</button>
        </div>
    </div>

    <RouterLink :to="{ name: 'dashboard-home' }" class="flex flex-col items-center">
          <img class="h-10 w-auto" src="../../assets/logo.png" alt="">
          Merilearn
      </RouterLink>
      <div class="text-right block">
          <button @click="toggleSidebar">
             <i class="ri-menu-3-fill text-xl"></i> 
          </button>
      </div>
  </header>
</template>

