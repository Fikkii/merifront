<script setup>
    import { defineEmits, ref } from 'vue'
    import { useRouter } from 'vue-router'

    import { useUserStore } from '../../store/user.js'

    const emits = defineEmits(['toggle'])
    const toggle = ref(false)

    const router = useRouter()

    function handleToggle(){
        emits('toggle', toggle.value)
        toggle.value = !toggle.value
    }

    function handleLogout(){
        const userStore = useUserStore()
        userStore.logout()
        router.push({ name: 'login' })
    }
</script>

<template>
  <!-- Header -->
  <header
    class="bg-white px-8 py-4 shadow-md flex justify-between items-center sticky top-0 z-[100]"
  >
    <div class="flex items-center">
      <button
        class="block bg-none border-none cursor-pointer mr-4"
        aria-label="Toggle menu"
        @click="handleToggle"
      >
        <i class="fas fa-bars"></i>
      </button>
      <RouterLink :to="{ name: 'admin-home' }" class="text-md font-semibold text-gray-800 flex gap-2 items-center">
          <img src="../../assets/logo.png" width="30" alt="">
        Dashboard
      </RouterLink>
    </div>
    <div>
        <button @click="handleLogout" class="ri-logout-box-r-line">Logout</button>
    </div>
  </header>
</template>

