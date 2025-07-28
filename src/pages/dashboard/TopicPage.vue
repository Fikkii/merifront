<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { marked } from 'marked'
import axios from 'axios'
import hljs from 'highlight.js'

import ModuleList from '../../components/ModuleList.vue'
import { useUserStore } from '../../store/user.js'

import 'highlight.js/styles/github-dark.css'

marked.setOptions({
  highlight(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value
    }
    return hljs.highlightAuto(code).value
  },
  langPrefix: 'hljs language-'
})

const props = defineProps(['id'])

const topic = ref([])
const content = ref([])
const nextTopic = ref(null)
const prevTopic = ref(null)

const router = useRouter()
const routes = useRoute()

const refreshModule = ref(0)

const showModal = ref(false)
const progressPercentage = ref(0)

watch(() => routes.params.id, (newVal) => {
  fetchTopic()
  handlePagination(newVal)
  refreshModule.value++
})

async function handlePagination(current = routes.params.id) {
  const userStore = useUserStore()
  const topicIdArray = userStore.topics

  const numericVal = Number(current)
  const currentIndex = topicIdArray.indexOf(numericVal)

  const nextIndex = currentIndex + 1
  const prevIndex = currentIndex - 1

  nextTopic.value = topicIdArray[nextIndex]
  prevTopic.value = topicIdArray[prevIndex]

  // Progress
  progressPercentage.value = Math.round(((currentIndex + 1) / topicIdArray.length) * 100)
}

async function fetchTopic() {
  const res = await axios.get(`/api/student/topic?topicId=${props.id}`)
  topic.value = res.data.topic
  content.value = marked.parse(res.data.topic.content)

  await nextTick()
  document.querySelectorAll('pre code').forEach(block => {
    hljs.highlightElement(block)
  })
}

onMounted(() => {
  fetchTopic()
  handlePagination()
})

async function handleComplete() {
  const res = await axios.post('/api/student/topic/complete', {
    topicId: props.id
  })

  showModal.value = true
  fetchTopic()
}
</script>

<template>
  <div v-if="topic" class="min-h-screen bg-white">
    <div class="container max-w-6xl mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 items-start">

        <!-- Main Content -->
        <div class="md:col-span-2">
          <!-- Topbar and Completion -->
          <div class="flex gap-2 justify-between items-center rounded mb-6">
            <button @click="router.go(-1)" class="text-blue-500 font-bold">
              <i class="ri-arrow-left-line"></i> Go Back
            </button>
            <button
              class="px-6 py-3 rounded font-bold flex gap-1 items-center"
              :class="[topic.is_completed ? 'text-green-500 hover:text-green-600' : 'text-red-500 hover:text-red-600']"
              @click="handleComplete"
            >
              <i :class="[topic.is_completed ? 'ri-checkbox-circle-fill' : 'ri-checkbox-blank-circle-line']"></i>
              {{ topic.is_completed ? 'Completed' : 'Incomplete' }}
            </button>
          </div>

          <!-- Module Title -->
          <div class="text-lg mb-4 text-blue-800 font-semibold border-b">
            Module: {{ topic.module_title }}
          </div>

          <!-- Topic Title -->
          <div class="text-2xl mb-4 font-semibold">{{ topic.title }}</div>

          <!-- Recommended Video -->
          <div class="mb-6">
            <div class="font-bold mb-2">Recommended Video:</div>
            <div class="relative w-full aspect-[16/9]">
              <iframe
                class="absolute top-0 left-0 w-full h-full border-0"
                :src="`https://www.youtube.com/embed/${topic.video}`"
                allowfullscreen
              ></iframe>
            </div>
          </div>

          <!-- Markdown Content -->
          <div
            v-html="content"
            class="prose prose-sm sm:prose md:prose-lg max-w-none overflow-x-auto"
          ></div>

          <!-- Pagination -->
          <div class="flex flex-wrap justify-between gap-4 mt-6">
            <RouterLink
              v-if="prevTopic"
              :to="{ name: 'topic', params: { id: prevTopic } }"
              class="bg-black px-4 py-2 text-white rounded shadow-xl text-lg text-center"
            >
              <i class="ri-arrow-left-double-line"></i> Prev
            </RouterLink>

            <RouterLink
              v-if="nextTopic"
              :to="{ name: 'topic', params: { id: nextTopic } }"
              class="bg-black px-4 py-2 text-white rounded shadow-xl text-lg text-center"
            >
              Next <i class="ri-arrow-right-double-line"></i>
            </RouterLink>
          </div>

          <!-- Mark Complete -->
          <button
            class="block ms-auto mt-4 px-6 py-3 text-white rounded font-bold flex gap-1 items-center"
            :class="[topic.is_completed ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600']"
            @click="handleComplete"
          >
            <i :class="[topic.is_completed ? 'ri-checkbox-circle-fill' : 'ri-checkbox-blank-circle-line']"></i>
            {{ topic.is_completed ? 'Topic Completed' : 'Mark Complete' }}
          </button>

          <!-- Progress Bar -->
          <div class="w-full bg-gray-100 rounded-full h-3 mt-8">
            <div
              class="h-3 rounded-full transition-all duration-500"
              :class="progressPercentage === 100 ? 'bg-green-500' : 'bg-blue-500'"
              :style="{ width: `${progressPercentage}%` }"
            ></div>
          </div>
          <div class="text-right text-sm mt-1 font-semibold text-gray-700">
            Progress: {{ progressPercentage }}%
          </div>
        </div>

        <!-- Sidebar -->
        <div class="hidden md:block sticky top-0 left-0 max-h-screen overflow-auto">
          <ModuleList :key="refreshModule" :currentTopicId="id" />
        </div>
      </div>
    </div>

    <!-- Completion Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-xl max-w-md w-full shadow-lg text-center">
        <h2 class="text-2xl font-bold text-green-600 mb-2">
          Topic marked as completed!
        </h2>
        <p class="text-gray-700 mb-4">
          Great job! You're one step closer to completing your module.
        </p>
        <button
          @click="showModal = false"
          class="mt-2 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  </div>

  <div v-else>
    Loading...
  </div>
</template>

