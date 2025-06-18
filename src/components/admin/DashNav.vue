<script setup>
import { ref, onMounted, watch } from 'vue'
import { RouterLink } from 'vue-router'

import { useUserStore } from '../../store/user.js'

const props = defineProps({
    state: {
        type: Boolean,
        default: false,
    }
})

const toggle = ref(props.state)

watch(() => props.state, (newVal) => {
    toggle.value = newVal
})

const userStore = useUserStore()

const dynamicLink = ref([])
const role = localStorage.getItem('user-role')

function filterAction(role) {
  dynamicLink.value = links.filter(value => value.role.includes(role))
}

function routerToggle(){
if(window.innerWidth < 400){
toggle.value = false
}
}

onMounted(() => {
  filterAction(role)
})

const links = [
  { name: 'Home', link: 'admin-home', icon: 'ri-admin-line', role: ['instructor', 'admin', 'student'] },
  { name: 'Courses', link: 'admin-courses', icon: 'ri-stack-line', role: ['admin'] },
  { name: 'Modules', link: 'admin-modules', icon: 'ri-git-repository-line', role: ['instructor', 'admin'] },
  { name: 'Projects', link: 'admin-projects', icon: 'ri-briefcase-3-line', role: ['instructor', 'admin'] },
  { name: 'Topics', link: 'admin-topics', icon: 'ri-book-shelf-line', role: ['instructor', 'admin'] },
  { name: 'Students', link: 'admin-students', icon: 'ri-group-3-line', role: ['admin'] },
  { name: 'Broadcast', link: 'admin-broadcasts', icon: 'ri-broadcast-line', role: ['admin'] },
  { name: 'Transactions', link: 'admin-transactions', icon: 'ri-visa-line', role: ['admin'] }
]
</script>

<template>
  <div class="sticky top-0 flex h-screen">
    <!-- Sidebar -->
    <nav
      :class="[
        'bg-gradient-to-br from-black to-purple-700 text-white shadow-xl overflow-hidden transition-width duration-300 ease-in-out',
        toggle ? 'w-50 md:w-64' : 'w-0'
      ]"
      aria-label="Sidebar Navigation"
    >
      <!-- Sidebar content only rendered when open -->
      <div v-if="toggle" class="p-5 border-b border-white/10">
        <h2 class="text-2xl font-semibold flex items-center">
            <img src="../../assets/logo.png" width="40" alt="">
          Merilearn
        </h2>
      </div>

      <ul v-if="toggle" class="py-5 space-y-1">
        <li v-for="link in dynamicLink" :key="link.link">
          <RouterLink @click="routerToggle"
            :to="{ name: link.link }"
            v-if="link.role.includes(userStore.role)"
            class="flex items-center px-5 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-all border-l-4 border-transparent"
            :class="{ 'bg-white/10 text-white border-yellow-400': $route.name === link.link }"
          >
            <i :class="[link.icon]" class="w-5 text-center mr-3"></i>
            {{ link.name }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style>
/* Add this to your global CSS if tailwind doesn't provide transition-width */
.transition-width {
  transition-property: width;
}
</style>

