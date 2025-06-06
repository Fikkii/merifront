<script setup>
import { ref, onMounted } from "vue"
import axios from 'axios'

const totalTopics = ref('')
const totalCourses = ref('')
const totalModules = ref('')
const totalEnrollments = ref('')
const totalUsers = ref('')
const totalInstructors = ref('')

onMounted(() => { fetchTotal() })

async function fetchTotal(){
    axios.get('/api/total/topics')
        .then(res => totalTopics.value = res.data.total_topics)
    axios.get('/api/total/courses')
        .then(res => totalCourses.value = res.data.total_courses)
    axios.get('/api/total/modules')
        .then(res => totalModules.value = res.data.total_modules)
    axios.get('/api/total/enrollments')
        .then(res => totalEnrollments.value = res.data.total_enrollments)
    axios.get('/api/total/users')
        .then(res => totalUsers.value = res.data.total_users)
    axios.get('/api/total/instructors')
        .then(res => totalInstructors.value = res.data.total_instructors)
}
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8">
    <div
      class="bg-white md:p-6 rounded-xl shadow-md flex items-center gap-5 transition-transform hover:-translate-y-1"
    >
      <div
        class="w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl bg-gradient-to-br from-indigo-500 to-purple-600"
      >
        <i class="fas fa-users"></i>
      </div>
      <div>
        <h3 class="text-2xl font-bold text-gray-800">{{ totalUsers || 0 }}</h3>
        <p class="text-gray-500">Total Users</p>
      </div>
    </div>

    <div
      class="bg-white md:p-6 rounded-xl shadow-md flex items-center gap-5 transition-transform hover:-translate-y-1"
    >
      <div
        class="w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl bg-gradient-to-br from-pink-300 to-pink-500"
      >
        <i class="fas fa-book"></i>
      </div>
      <div>
        <h3 class="text-2xl font-bold text-gray-800">{{ totalCourses || 0 }}</h3>
        <p class="text-gray-500">Active Courses</p>
      </div>
    </div>

    <div
      class="bg-white md:p-6 rounded-xl shadow-md flex items-center gap-5 transition-transform hover:-translate-y-1"
    >
      <div
        class="w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl bg-gradient-to-br from-blue-400 to-cyan-400"
      >
        <i class="fas fa-user-plus"></i>
      </div>
      <div>
        <h3 class="text-2xl font-bold text-gray-800">{{ totalEnrollments || 0 }}</h3>
        <p class="text-gray-500">Enrollments</p>
      </div>
    </div>

    <div
      class="bg-white md:p-6 rounded-xl shadow-md flex items-center gap-5 transition-transform hover:-translate-y-1"
    >
      <div
        class="w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl bg-gradient-to-br from-green-400 to-teal-300"
      >
        <i class="fas fa-robot"></i>
      </div>
      <div>
        <h3 class="text-2xl font-bold text-gray-800">{{ totalInstructors || 0 }}</h3>
        <p class="text-gray-500">Instructors</p>
      </div>
    </div>
  </div>
</template>

