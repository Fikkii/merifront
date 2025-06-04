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
    <StatsCard />
    <QuickActions />
    <div class="flex flex-col md:flex-row gap-8">
        <Activity class="flex-1" />
        <TopCourses  class="flex-1"/>
    </div>
</template>

<style scoped>

</style>

