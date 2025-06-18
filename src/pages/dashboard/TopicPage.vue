<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { marked } from 'marked'
import axios from 'axios'
import hljs from 'highlight.js'

import ModuleList from '../../components/ModuleList.vue'

//User Store Import
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

const router = useRouter()
const routes = useRoute()

const nextTopic = ref(null)
const prevTopic = ref(null)

watch(() => routes.params.id, (newVal, oldVal) => {
  fetchTopic()
  handlePagination(newVal)
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

onMounted(async () => {
  fetchTopic()
  handlePagination()
})

function handleComplete() {
  router.push({ name: 'learning' })
}
</script>

<template>
  <div v-if="topic" class="min-h-screen bg-white">
    <div class="container max-w-6xl mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 items-start">
        <!-- Sidebar -->
        <div class="hidden md:block sticky top-0 left-0 max-h-screen overflow-auto">
          <ModuleList :currentTopicId="id" />
        </div>

        <!-- Main Content -->
        <div class="md:col-span-2">
          <button @click="router.go(-1)" class="text-blue-500 mb-5 font-bold">
            <i class="ri-arrow-left-line"></i> Go Back
          </button>

          <div class="text-lg mb-4 text-blue-800 font-semibold border-b">
            Module: {{ topic.module_title }}
          </div>

          <div class="text-2xl mb-4 font-semibold">{{ topic.title }}</div>

          <!-- Responsive Video -->
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
          <div class="flex flex-col sm:flex-row justify-between gap-4 mt-6">
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
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    Loading...
  </div>
</template>

<style scoped>

</style>

