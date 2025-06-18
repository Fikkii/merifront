<script setup>
    import { onMounted, watch, ref } from 'vue'
    import axios from 'axios'
    import { useToast } from 'vue-toastification'

    import { useUserStore } from '../store/user'

    defineProps(['currentTopicId'])


    const toast = useToast()

    const currentCourse = ref('')
    const availableCourse = ref('')
    const availableProjects = ref('')
    const selectedCourse = ref('')
    const selectedCourseAmount = ref('')
    const email = ref('')

watch(selectedCourse, ()=> {
    fetchDetails()
})

onMounted(() => fetchUserCourse())

function setTopicArray(data){
    const userStore = useUserStore()
    const topicIdArray = []
    const array = data.modules.forEach((module) => {
        module.topics.forEach((value) => {
            topicIdArray.push(value.id)
        })
    })

    //saves the topic id array
    userStore.setTopics(topicIdArray)
}

async function fetchUserCourse() {
  try {
    const res = await axios.get('/api/student/course')

    if (res.status == 200) {
        const data = await res.data
        currentCourse.value = data.course

        //This function gets the id into an array and saves it in vue state
        setTopicArray(data.course)
        fetchProjects()
    }
  } catch (e) {
    console.error('Caught error:', e);
  }
}

async function fetchProjects() {
  try {
    const res = await axios.get('/api/projects')

    availableProjects.value = res.data
    console.log(res.data)
  } catch (e) {
    console.error('Caught error:', e);
  }
}
</script>

<template>
  <aside
    class="w-full md:max-w-xs bg-white border-r border-gray-200 h-full overflow-y-auto p-4"
  >
    <h2 class="text-xl font-bold mb-3 flex items-center gap-2 text-gray-800">
      <i class="ri-road-map-line text-blue-500"></i> Learning Path
    </h2>

    <p class="text-sm text-gray-500 mb-4">
      Select a module to continue learning.
    </p>

    <!-- Modules List -->
    <details
      v-for="(module, index) in currentCourse.modules"
      :key="module.id"
      :open="module.active && index === 0"
      :class="[
        'mb-2 rounded border text-sm transition',
        module.active === 0
          ? 'opacity-50 pointer-events-none select-none'
          : 'bg-gray-50 hover:bg-gray-100'
      ]"
    >
      <summary
        class="cursor-pointer px-3 py-2 font-semibold border-b text-gray-700 flex justify-between items-center"
      >
        <span class="flex items-center gap-2">
          <i class="ri-folder-3-line text-blue-500"></i>
          Module {{ index + 1 }}
        </span>
        <span class="text-xs text-gray-400 truncate max-w-[120px]">
          {{ module.title }}
        </span>
      </summary>

      <div class="px-3 pb-2 pt-1 space-y-1">
        <!-- Topics -->
        <RouterLink
          v-for="topic in module.topics"
          :key="topic.id"
          :to="{ name: 'topic', params: { id: topic.id } }"
          class="flex items-center justify-between rounded px-2 py-1.5 transition hover:bg-blue-100"
          :class="{
            'bg-blue-200 font-semibold text-blue-900': topic.id === currentTopicId
          }"
        >
          <span class="flex items-center gap-2 truncate">
            <i class="ri-book-open-line text-blue-500 text-base"></i>
            {{ topic.title }}
          </span>
          <i class="ri-arrow-right-s-line text-blue-700 text-base"></i>
        </RouterLink>

        <!-- Capstone Project -->
        <div v-for="project in availableProjects" :key="project.id">
          <RouterLink
            v-if="project.module_id === module.id"
            :to="{ name: 'project', params: { id: project.id } }"
            class="flex items-start gap-2 bg-yellow-50 hover:bg-yellow-100 border-l-4 border-yellow-500 rounded px-3 py-2 text-yellow-800 font-medium transition"
          >
            <i class="ri-medal-2-line text-xl pt-1 text-yellow-500 shrink-0"></i>

            <div class="flex-1 min-w-0">
              <div
                class="uppercase text-xs tracking-wide text-yellow-600 mb-1 font-semibold"
              >
                Capstone Project
              </div>
              <div class="truncate">
                {{ project.title }}
              </div>
            </div>

            <i class="ri-arrow-right-s-line text-yellow-700 mt-1 shrink-0"></i>
          </RouterLink>
        </div>
      </div>
    </details>
  </aside>
</template>
