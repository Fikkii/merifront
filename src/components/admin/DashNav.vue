<script setup>
import { ref, onMounted, watch } from 'vue'
import { RouterLink } from 'vue-router'

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

const dynamicLink = ref([])
const role = localStorage.getItem('user-role')

function filterAction(role) {
  dynamicLink.value = links.filter(value => value.role.includes(role))
}

onMounted(() => {
  filterAction(role)
})

const links = [
  { name: 'Home', link: 'admin-home', icon: 'ri-admin-line', role: ['instructor', 'admin', 'student'] },
  { name: 'Courses', link: 'admin-courses', icon: 'ri-stack-line', role: ['instructor', 'admin', 'student'] },
  { name: 'Modules', link: 'admin-modules', icon: 'ri-git-repository-line', role: ['instructor', 'admin', 'student'] },
  { name: 'Projects', link: 'admin-projects', icon: 'ri-briefcase-3-line', role: ['instructor', 'admin', 'student'] },
  { name: 'Topics', link: 'admin-topics', icon: 'ri-book-shelf-line', role: ['instructor', 'admin', 'student'] },
  { name: 'Students', link: 'admin-students', icon: 'ri-group-3-line', role: ['instructor', 'admin', 'student'] },
  { name: 'Broadcast', link: 'admin-broadcasts', icon: 'ri-broadcast-line', role: ['instructor', 'admin', 'student'] },
  { name: 'Transactions', link: 'admin-transactions', icon: 'ri-visa-line', role: ['instructor', 'admin', 'student'] }
]
</script>

<template>
  <div class="sticky top-0 flex h-screen">
    <!-- Sidebar -->
    <nav
      :class="[
        'bg-gradient-to-br from-indigo-500 to-purple-700 text-white shadow-xl overflow-hidden transition-width duration-300 ease-in-out',
        toggle ? 'w-50 md:w-64' : 'w-0'
      ]"
      aria-label="Sidebar Navigation"
    >
      <!-- Sidebar content only rendered when open -->
      <div v-if="toggle" class="p-5 border-b border-white/10">
        <h2 class="text-2xl font-semibold flex items-center">
          <i class="fas fa-graduation-cap text-yellow-300 mr-2"></i>
          Merilearn
        </h2>
      </div>

      <ul v-if="toggle" class="py-5 space-y-1">
        <li v-for="link in dynamicLink" :key="link.link">
          <RouterLink
            :to="{ name: link.link }"
            @click="toggle = false"
            class="flex items-center px-5 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-all border-l-4 border-transparent"
            :class="{ 'bg-white/10 text-white border-yellow-400': $route.name === link.link }"
          >
            <i class="fas fa-tachometer-alt w-5 text-center mr-3"></i>
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

