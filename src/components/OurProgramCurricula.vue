<script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios'

    const availableCourse = ref([])

    const apiUrl = import.meta.env.VITE_API_URL

    const filteredCourse = ref([])
    const course_id = ref('')

async function fetchCourse() {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/courses/details`)

    if (res.status == 200) {
        const data = res.data
        availableCourse.value = data
        filteredCourse.value = data.slice(0,1)
        console.log(res.data)
    }
  } catch (e) {
    console.error('Caught error:', e);
  }
}

function handleCurriculum(e){
    course_id.value = e.target.id

    filteredCourse.value = availableCourse.value.filter(value => value.id == course_id.value)

    console.log(filteredCourse.value)
}

onMounted(() => {
    fetchCourse();
})

</script>

<template>
    <!-- Our Courses -->
    <section class="py-16 px-6 lg:px-20 bg-black border-t">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl border-b-4 border-blue-500 text-white font-bold mb-10">Program Curricula</h2>
        <--nav -->
        <div class="flex gap-2 mb-5 min-w-50 overflow-x-auto">
            <button :class="[course_id == course.id ? 'bg-blue-500' : '']" @click="handleCurriculum" :id="course.id" v-for="course in availableCourse" class="whitespace-nowrap px-4 flex-1 py-2 border border-blue-500 rounded text-lg text-white text-center">
                {{ course.title }} Curriculum
            </button>
        </div>
        <div class="grid text-left">
          <div class="p-6 shadow-sm">
            <div v-for="course in filteredCourse" class="p-2">
                <img class="h-20 mx-auto md:h-70 w-auto" :src="`${apiUrl}${course.cover_img_url}`" alt="no image">
                <div class="prose prose-sm min-w-full text-white">
                    <h3 class="text-lg font-semibold mb-2 text-blue-600"><span></span>{{ course.title }} Curriculum</h3>
                    <div><span>Description:</span> {{ course.description }} </div>
                    <ul>
                        <li v-for="(module, index) in course.modules"><i class="ri-calendar-fill text-blue-500"></i> <span>Module {{ index + 1 }}:</span> {{ module.title }}</li>
                    </ul>
                    <div><span>Price:</span> {{ course.price || 'Free' }} </div>
                    <button class="bg-orange-500 rounded px-6 py-2 w-full">Register</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<style scoped>

</style>


