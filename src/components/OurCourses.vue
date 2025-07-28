<script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios'

    const availableCourse = ref([])

    const apiUrl = import.meta.env.VITE_API_URL

function truncateDesc(text, length){
    return text.length < length ? text : text.slice(0, length) + '...'
}

async function fetchCourse() {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/courses/details`)

    if (res.status == 200) {
        const data = res.data
        availableCourse.value = data
    }
  } catch (e) {
    console.error('Caught error:', e);
  }
}

onMounted(() => {
    fetchCourse();
})

</script>

<template>
    <!-- Our Courses -->
    <section class="py-16 px-6 lg:px-20 shadow">
      <div class="max-w-6xl mx-auto">
        <!--nav -->
        <h3 class="text-3xl font-bold">Available Courses</h3>
        <div class="grid gap-5 md:grid-cols-3 place-items-center text-left">
            <div v-for="(course, index) in availableCourse" data-aos="fade-right" data-aos-delay="index * 100" class="w-full bg-white p-4 rounded shadow-lg">
                <img class="w-auto" :src="`${apiUrl}${course.cover_img_url}`" alt="no image">
                <div class="prose prose-sm min-w-full my-3">
                    <div class="font-bold text-lg">{{ course.title }} </div>
                    <div class="flex gap-3">
                        <div>
                           <i class="ri-checkbox-blank-circle-fill text-green-500 rounded-full shadow"></i> 
                           {{ course.modules.length }} Total Modules
                        </div>
                        <div>
                           <i class="ri-checkbox-blank-circle-fill text-green-500 rounded-full shadow"></i> 
                           90% Discount
                        </div>
                    </div>
                </div>
                <div>
                    {{ truncateDesc(course.description, 120) }}
                </div>
                <div class="flex items-center mt-3 justify-between">
                    <div class="flex gap-1">
                        <i class="ri-timer-line items-center text-lg"></i>
                        <span class="text-lg">6 Weeks</span>
                    </div>
                    <router-link :to="`/course-overview/${course.id}`" class="flex gap-3 max-w-sm bg-orange-600 text-white px-6 py-2 shadow hover:bg-orange-800 transition">
                        <span>Explore Course</span>
                        <i class="ri-arrow-right-line"></i>
                    </router-link>
                </div>
            </div>
        </div>
      </div>
    </section>
</template>

<style scoped>

</style>



