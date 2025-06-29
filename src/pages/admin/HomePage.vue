<script setup>
    import StatsCard from '../../components/admin/StatsCard.vue'
    import QuickActions from '../../components/admin/QuickActions.vue'
    import Activity from '../../components/admin/Activity.vue'
    import TopCourses from '../../components/admin/TopCourses.vue'
    import Modal from '../../components/admin/Modal.vue'
    import { ref, onMounted } from 'vue'

    import CoursePage from './CoursePage.vue'

    import axios from 'axios'

    const totalCourse = ref(null)
    const totalModules = ref(null)
    const totalTopics = ref(null)

    const topCourses = ref(null)

    onMounted(() => { fetchCourse(); fetchEnrollmentsTotal(); fetchModules(); fetchTopics() })

async function fetchEnrollmentsTotal() {
  try {
    const res = await axios.get('/api/top/courses')

    if (res.status == 200) {
        const data = res.data
        topCourses.value = data
        console.log(topCourses.value)
    }
  } catch (e) {
    console.error('Caught error:', e);
  }
}
    

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
    <div class="text-right mb-2">
        <RouterLink :to="{ name: 'dashboard-home' }" class="p-3 text-white inline-block bg-indigo-500 rounded ms-auto"><i class="ri-refresh-line"></i> Switch Role to Student </RouterLink>
    </div>
    <StatsCard />
    <QuickActions />
    <div class="flex flex-col md:flex-row gap-8">
        <Activity class="flex-1" />
        <TopCourses :items="topCourses" class="flex-1"/>
    </div>
</template>

<style scoped>

</style>

