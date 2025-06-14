<template>
  <div class="w-full">
    <div class="font-medium text-lg border-b-2 mb-4 border-blue-500">Action Bar</div>
    <div
      class="flex flex-wrap gap-2 sm:gap-4 items-center justify-center md:justify-start bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg px-3 py-2 text-white shadow-md"
    >
      <!-- Submit Project -->
        <RouterLink :to="{ name: action.link }" v-for="action in actions"
        class="flex items-center justify-center border border-white gap-1 hover:bg-white/20 px-3 py-1 flex-1 rounded transition text-sm"
      >
        <i :class="[action.icon, 'text-lg']"></i>
        <span>{{ action.title }}</span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const actions = [
{
    title: 'Peer Group',
    link: 'peer',
    icon: 'ri-user-community-line'
},
{
    title: 'Community',
    icon: 'ri-notification-fill'
},
]

const unreadCount = ref(2)

function submitProject() {
  console.log('Submit Project clicked')
}

function showPeerGroups() {
  console.log('Peer Groups clicked')
}

function viewNotifications() {
  console.log('Notifications clicked')
  unreadCount.value = 0
}
</script>

