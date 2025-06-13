<script setup>
    import { onMounted, watch, ref } from 'vue'
    import axios from 'axios'
    import { useToast } from 'vue-toastification'

    import { useUserStore } from '../store/user'


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
        <h2 class="text-2xl font-bold text-center">Learning Path</h2>
        <p class="text-center text-gray-500 underline">
            Click on the module and select the topic you will like to learn today
        </p>
        <details :class="[module.active == 0 ? 'opacity-40 pointer-events-none select-none' : '']" class="bg-blue-50 mt-2 p-3 px-6 rounded border border-3 border-white shadow" v-for="(module, index) in currentCourse.modules">
            <summary class="font-bold border-b-2 pb-3">
                <span>
                    Module {{ index + 1 }}: {{ module.title }} <span v-if="!module.active" class="text-red-500">Locked</span>
                </span>
            </summary>
            <RouterLink v-for="topic in module.topics" class="block flex justify-between hover:bg-blue-300 my-2 p-2 px-4 rounded bg-blue-100" :to="{ name: 'topic', params: { id: topic.id } }">
                <span><i class="ri-play-circle-line opacity-50"></i>{{ topic.title }}</span>
                <i class="ri-arrow-right-s-line"></i>
            </RouterLink>
            <div v-for="project in availableProjects">
                <RouterLink v-if="project.module_id == module.id" class="block flex justify-between hover:bg-blue-300 my-2 p-2 px-4 rounded bg-blue-100" :to="{ name: 'project', params: { id: project.id } }">
                <span><i class="ri-stack-fill text-blue-500">CAPSTONE PROJECT - </i>{{ project.title }}</span>
                <i class="ri-arrow-right-s-line"></i>
                </RouterLink>
            </div>
        </details>
</template>
