<template>
  <section class="p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Course Topics</h1>

    <!-- ✅ Global course progress -->
    <div class="mb-6">
      <div class="flex justify-between text-sm mb-1">
        <span>Progress: {{ totalCompleted }} / {{ totalTopics }} topics</span>
        <span>{{ progressPercentage }}%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2.5">
        <div
          class="bg-purple-600 h-2.5 rounded-full transition-all duration-500"
          :style="{ width: progressPercentage + '%' }"
        ></div>
      </div>
    </div>

    <!-- ✅ Topic modules list -->
    <div
      v-for="(module, moduleIndex) in processedModules"
      :key="module.id"
      class="mb-8 border border-gray-200 rounded-lg p-4"
    >
      <h2 class="text-lg font-semibold mb-2 text-purple-700">📦 {{ module.title }}</h2>

      <p class="text-sm text-gray-600 mb-4">
        ✔ {{ module.completedCount }} of {{ module.topics.length }} topics completed
      </p>

      <ul class="space-y-3">
        <li
          v-for="(topic, topicIndex) in module.topics"
          :key="topic.id"
          class="flex items-center justify-between p-3 border rounded-md"
          :class="{
            'bg-green-50 border-green-400': topic.is_completed,
            'bg-white border-gray-300': !topic.is_completed && topic.isUnlocked,
            'bg-gray-100 text-gray-400 cursor-not-allowed': !topic.isUnlocked
          }"
        >
          <div class="flex items-center gap-2">
            <span v-if="topic.is_completed" class="text-green-600">✔️</span>
            <span v-else-if="topic.isUnlocked" class="text-yellow-500">
              <i class="ri-circle-line text-lg"></i>
            </span>
            <span v-else class="text-gray-400">
              <i class="ri-lock-line text-lg"></i>
            </span>

            <span>{{ topic.title }}</span>
          </div>

          <router-link
            v-if="topic.isUnlocked"
            :to="`/dashboard/topic/${topic.id}`"
            class="text-blue-600 hover:underline"
          >
            Open
          </router-link>

          <span v-else class="text-sm italic text-gray-400">Locked</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import { useUserStore } from '../store/user'

defineProps(['currentTopicId'])

const toast = useToast()
const currentCourse = ref('')
const availableProjects = ref('')
const selectedCourse = ref('')
const selectedCourseAmount = ref('')
const email = ref('')

watch(selectedCourse, () => {
  fetchDetails()
})

onMounted(() => fetchUserCourse())

function setTopicArray(data) {
  const userStore = useUserStore()
  const topicIdArray = []
  data.modules.forEach((module) => {
    module.topics.forEach((value) => {
      topicIdArray.push(value.id)
    })
  })
  userStore.setTopics(topicIdArray)
}

async function fetchUserCourse() {
  try {
    const res = await axios.get('/api/student/course')
    if (res.status == 200) {
      const data = await res.data
      currentCourse.value = data.course
      setTopicArray(data.course)
      fetchProjects()
    }
  } catch (e) {
    console.error('Caught error:', e)
  }
}

async function fetchProjects() {
  try {
    const res = await axios.get('/api/projects')
    availableProjects.value = res.data
  } catch (e) {
    console.error('Caught error:', e)
  }
}

// ✅ Add unlock + progress logic
const processedModules = computed(() => {
  return currentCourse.value?.modules?.map((module) => {
    let lastCompleted = true
    let completedCount = 0

    const topicsWithUnlock = module.topics.map((topic, index) => {
      const isUnlocked = lastCompleted || index === 0
      lastCompleted = topic.is_completed

      if (topic.is_completed) completedCount++

      return {
        ...topic,
        isUnlocked
      }
    })

    return {
      ...module,
      topics: topicsWithUnlock,
      completedCount
    }
  }) || []
})

// ✅ Global progress tracking
const totalTopics = computed(() => {
  return processedModules.value.reduce((total, module) => {
    return total + module.topics.length
  }, 0)
})

const totalCompleted = computed(() => {
  return processedModules.value.reduce((total, module) => {
    return total + module.completedCount
  }, 0)
})

const progressPercentage = computed(() => {
  if (totalTopics.value === 0) return 0
  return Math.round((totalCompleted.value / totalTopics.value) * 100)
})
</script>

<style scoped>
/* Optional style tweaks */
</style>

