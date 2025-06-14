<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const guidelines = [
    "Respect every member's opinion and contribution.",
    "Maintain confidentiality of shared project details.",
    "Do not share personal data without consent.",
    "Support inclusivity and diversity.",
    "Follow the peer review process before criticism.",
  ]

const peerGroup = ref(null)

onMounted(() => fetchPeerGroup())

async function fetchPeerGroup(){
    const req = await axios.get('/api/peer/me')
    const data = req.data
    peerGroup.value = req.data
}

function handleNotPaired(){
    router.go(-1)
}

</script>

<template>
  <div v-if="peerGroup" class="p-4 md:p-8 max-w-4xl mx-auto">
      <button @click="router.go(-1)" class="text-indigo-500 px-[20px] py-[12px] font-bold rounded"><i class="ri-arrow-left-line"></i>Go Back</button>
    <!-- Peer Group Header -->
    <div class="mb-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
      <h2 class="text-2xl font-bold">Peer Group: {{ peerGroup.name }}</h2>
      <p class="mt-2">Group Leader: 
        <span class="font-semibold">{{ peerGroup.leader.fullname }}</span> 
        (<a class="underline" :href="`mailto:${peerGroup.leader.email}`">{{ peerGroup.leader.email }}</a>)
        <span class="font-medium">{{ peerGroup.leader.fullname || 'undefined' }}</span>
      </p>
    </div>

    <!-- Member List -->
    <div class="mb-6 bg-white rounded-xl shadow p-4">
      <h3 class="text-xl font-semibold text-indigo-700 mb-4">Group Members</h3>
      <ul class="space-y-2">
        <li 
          v-for="(member, index) in peerGroup.members" 
          :key="index" 
          class="flex flex-col md:flex-row md:items-center md:justify-between border-b py-2"
        >
          <span class="font-medium">{{ member.fullname || 'undefined' }}</span>
          <a :href="`mailto:${member.email}`" class="text-sm text-indigo-600 hover:underline">{{ member.email }}</a>
        </li>
      </ul>
    </div>

    <!-- Guidelines Section -->
    <div class="bg-white rounded-xl shadow p-4">
      <h3 class="text-xl font-semibold text-indigo-700 mb-3">Group Guidelines</h3>
      <ul class="list-disc pl-5 space-y-2 text-sm text-gray-700">
        <li v-for="(rule, index) in guidelines" :key="index">
          {{ rule }}
        </li>
      </ul>
    </div>
  </div>
  <div v-else> 
      <div class="flex items-center justify-center h-full p-6">
          <div class="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6 max-w-md text-center w-full">
              <img
                      src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                      alt="Unpaired"
                      class="w-24 h-24 mx-auto mb-4"
                      />
              <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  You're not paired yet
              </h2>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
              You haven’t been assigned to a peer group yet. Please check back later.
              </p>
              <button
                      @click="handleNotPaired"
                      class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg transition duration-200"
                      >
                      Go back
              </button>
          </div>
      </div>
  </div>
</template>

<style scoped>
</style>

