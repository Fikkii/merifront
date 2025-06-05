<script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios'

    const availableCourse = ref([])

    const apiUrl = import.meta.env.VITE_API_URL


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
    <section class="py-16 px-6 lg:px-20 shadow border-t">
      <div class="mx-auto">
        <!--nav -->
        <h3 class="text-2xl font-bold">Available Courses</h3>
        <div class="grid gap-5 md:grid-cols-3 place-items-center text-left">
            <div v-for="course in availableCourse" class="w-fit p-4 rounded shadow-lg">
                <img class="h-20 md:h-70 w-auto" :src="`${apiUrl}${course.cover_img_url}`" alt="no image">
                <div class="prose prose-sm min-w-full my-3">
                    <div class="font-bold text-lg">{{ course.title }} </div>
                    <div>{{ course.description }} </div>
                    <RouterLink :to="{ name: 'login' }" class="block text-center bg-orange-500 text-white mt-6 rounded px-6 py-2 w-full">{{ course.price || 'Free' }}</RouterLink>
                </div>
            </div>
        </div>
      </div>
    </section>
</template>

<style scoped>

</style>



