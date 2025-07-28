<template>
  <div v-if="course" class="max-w-6xl mx-auto p-4">
      <!-- Topbar and Completion -->
      <div class="flex gap-2 items-center rounded mb-6">
          <button @click="router.go(-1)" class="text-blue-500 font-bold">
              <i class="ri-arrow-left-line"></i> Go Back
          </button>
          <div class="font-bold">
              Home / Course Overview / {{ props.id }}
          </div>
      </div>
      <div class="grid md:grid-cols-2 gap-8">
          <!-- Left: Course Info -->
          <div>
              <img
                      :src="`${apiUrl}${course.cover_img_url}`"
                      alt="Course cover"
                      class="w-full h-auto rounded-xl shadow-lg object-cover"
                      />
              <div class="mt-6 space-y-3">
                  <h1 class="text-3xl font-bold text-gray-800 flex items-center gap-2">
                      <i class="ri-bar-chart-box-line text-purple-600 text-2xl"></i>
                      {{ course.title }}
                  </h1>

                  <div class="text-red-600 font-semibold text-lg">
                      <i class="ri-fire-line mr-1 text-xl"></i>
                      90% Discount - Limited Time Offer!
                  </div>

                  <p class="text-gray-700 leading-relaxed">{{ course.description }}</p>

                  <div class="text-sm text-gray-600">
                      <i class="ri-time-line text-lg mr-1"></i>
                      Duration: <strong>6 weeks</strong>
                  </div>

                  <div class="text-sm text-gray-600">
                      <i class="ri-money-dollar-circle-line text-lg mr-1"></i>
                      Original Price: ₦{{ course.price?.toLocaleString() }}
                  </div>

                  <div class="text-xl font-bold text-green-700">
                      <i class="ri-discount-percent-line mr-1"></i>
                      Now: ₦{{ discountedPrice.toLocaleString() }}
                  </div>

                  <p class="text-sm text-gray-500 mt-2">
                  <i class="ri-shield-keyhole-line mr-1 text-base"></i>
                  A small <strong>commitment fee</strong> is required to access this course.
                  </p>

                  <button
                          class="mt-4 px-6 py-3 bg-purple-600 text-white rounded-xl shadow hover:bg-purple-700 flex items-center gap-2"
                          @click="goToLogin"
                          >
                          <i class="ri-login-box-line"></i> Enroll / Login
                  </button>
              </div>
          </div>

          <!-- Right: Module Overview -->
          <div>
              <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <i class="ri-book-2-line text-purple-600 text-xl"></i> What You’ll Learn
              </h2>
              <div class="space-y-6">
                  <div v-for="module in course.modules" :key="module.id" class="border-l-4 pl-4 border-purple-400">
                      <h3 class="text-lg font-bold text-gray-700">
                          <i class="ri-folder-info-line text-purple-500 mr-1"></i>
                          {{ module.title }}
                      </h3>
                      <ul class="list-disc list-inside text-sm text-gray-600 mt-2 space-y-2">
                          <li
                                  v-for="topic in module.topics"
                                  :key="topic.id"
                                  >
                                  {{ getFirstParagraph(topic.content) }}
                          </li>
                      </ul>
                  </div>
              </div>

              <!-- Bottom CTA Button -->
              <div class="mt-10">
                  <button
                          class="w-full md:w-auto px-6 py-3 bg-purple-600 text-white rounded-xl shadow hover:bg-purple-700 flex items-center justify-center gap-2"
                          @click="goToLogin"
                          >
                          <i class="ri-login-box-line"></i> Enroll / Login
                  </button>
              </div>
          </div>
      </div>
  </div>

  <div v-else class="text-center py-10 text-gray-600">
      <i class="ri-loader-4-line animate-spin text-2xl"></i>
      <p class="mt-2">Loading course details...</p>
  </div>
</template>

<script setup>
    import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL
const router = useRouter()
const course = ref(null)

const props = defineProps(['id'])

onMounted(() => {
  fetchCourse()
})

async function fetchCourse() {
  try {
    const res = await axios.get(`${apiUrl}/courses/details?courseId=${props.id}`)
    if (res.status === 200) {
      course.value = res.data
    }
  } catch (e) {
    console.error('Fetch error:', e)
  }
}

// compute 90% discount
const discountedPrice = computed(() => {
  if (course.value?.price) {
    return Math.round(course.value.price * 0.1)
  }
  return 0
})

// extract the first paragraph from markdown content
const getFirstParagraph = (content) => {
  const clean = content.replace(/#+\s?/g, '').replace(/\*\*|\*/g, '')
  return clean.split('\n').find(p => p.trim().length > 0) || ''
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
/* You can add additional styles here */
</style>

