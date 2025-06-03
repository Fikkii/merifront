<script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios'

    const availableCourse = ref([])

async function fetchCourse() {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/courses/details`)

    if (res.status == 200) {
        const data = res.data
        availableCourse.value = data
        console.log(res.data)
    }
  } catch (e) {
    console.error('Caught error:', e);
  }
}

onMounted(fetchCourse)


</script>

<template>
    <!-- Our Courses -->
    <section class="py-16 px-6 lg:px-20 bg-gray-100 border-t">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-2xl font-bold text-gray-900 mb-10">Our Courses</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          <div class="bg-white rounded-lg p-6 shadow-sm">
            <h3 class="text-lg font-semibold mb-2 text-blue-600">Track Your Learning</h3>
            <p class="text-gray-700">Stay organized with a clear overview of your topics and modules. Mark topics complete as you go.</p>
          </div>
        </div>
      </div>
    </section>
</template>

<style scoped>
    
</style>


