<script setup>
    import Card from '../../components/admin/Card.vue'
    import { ref, onMounted } from 'vue'

    import CoursePage from './CoursePage.vue'

    import axios from 'axios'

    const totalCourse = ref(null)
    const totalModules = ref(null)
    const totalTopics = ref(null)

    onMounted(() => { fetchCourse(); fetchModules(); fetchTopics() })

async function fetchCourse() {
  try {
    const res = await axios.get('/api/courses')

    if (res.status == 200) {
        const data = res.data
        totalCourse.value = data.length
    }
  } catch (e) {
    console.error('Caught error:', e);
  }
}
    

async function fetchModules() {
  try {
    const res = await axios.get('/api/modules')

    if (res.status == 200) {
        const data = res.data
        totalModules.value = data.length
        console.log(data)
    }
  } catch (e) {
    console.error('Caught error:', e);
  }
}
    

async function fetchTopics() {
  try {
    const res = await axios.get('/api/topics')

    if (res.status == 200) {
        const data = res.data
        totalTopics.value = data.length
    }
  } catch (e) {
    console.error('Caught error:', e);
  }
}
    
</script>

<template>
    <div class="grid gap-3 md:grid-cols-3">
        <Card link="admin-course" name="Total course" :total="totalCourse" />
        <Card name="Total Modules" :total="totalModules" />
        <Card name="Total Topics" :total="totalTopics" />
    </div>
    <div class="grid mt-5 gap-3">
        <h2 class="font-bold text-indigo-500 text-xl">Available Courses</h2>
        <CoursePage class="mt-[-40px]" dashboard />
    </div>
    <div class="grid mt-5 gap-3">
        <h2 class="font-bold text-indigo-500 text-xl">Instructors</h2>
    </div>
</template>

<style scoped>

</style>

