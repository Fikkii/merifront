<template>
  <div class="max-w-xl mx-auto p-4 space-y-4">
    <h2 class="text-lg font-semibold"><i class="ri-timer-2-line"></i>Time Spent (Weekly)</h2>
    <Bar :data="chartData" :options="chartOptions" />
    <div class="flex justify-between text-sm mt-4">
      <span>Total this week: <strong>{{ totalMinutes }} mins</strong></span>
      <span>Daily average: <strong>{{ averageMinutes }} mins</strong></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { Bar } from 'vue-chartjs'
import axios from 'axios'
import {
  Chart,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

// Register chart modules
Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const durations = ref({})   // Stores seconds spent per day
const totalMinutes = ref(0)
const averageMinutes = ref(0)

const chartData = ref({
  labels: daysOfWeek,
  datasets: [
    {
      label: 'Minutes Spent',
      backgroundColor: '#6366f1',
      data: Array(7).fill(0),
    },
  ],
})

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: false }
  },
})

function loadDurations() {
  const saved = localStorage.getItem('weekly_durations')
  durations.value = saved ? JSON.parse(saved) : {}
}

function saveDurations() {
  localStorage.setItem('weekly_durations', JSON.stringify(durations.value))
}

function resetWeek() {
  durations.value = {}
  saveDurations()
  updateChart()
  calculateStats()
}

function updateChart() {
  chartData.value = {
    ...chartData.value,
    datasets: [
      {
        ...chartData.value.datasets[0],
        data: daysOfWeek.map(day =>
          Math.round((durations.value[day] || 0) / 60)
        )
      }
    ]
  }
}

function calculateStats() {
  const total = Object.values(durations.value).reduce((sum, seconds) => sum + seconds, 0)
  totalMinutes.value = Math.round(total / 60)
  const daysCount = Object.keys(durations.value).length || 1
  averageMinutes.value = Math.round(total / 60 / daysCount)
}

// Check if today is Monday and week hasn’t been reset yet
function checkWeeklyReset() {
  const lastReset = localStorage.getItem('last_reset_date')
  const today = new Date()
  if (today.getDay() === 1) { // Monday
    if (lastReset !== today.toDateString()) {
      resetWeek()
      localStorage.setItem('last_reset_date', today.toDateString())
    }
  }
}

/** Sync to backend (replace with actual API)
async function syncToBackend() {
  try {
    await axios.post('/api/student/duration-tracker', { durations: durations.value })
    console.log('Synced to backend')
  } catch (error) {
    console.error('Sync failed:', error)
  }
} **/

onMounted(() => {
  loadDurations()
  checkWeeklyReset()
  updateChart()
  calculateStats()

  const interval = setInterval(() => {
    const today = daysOfWeek[new Date().getDay()]
    durations.value[today] = (durations.value[today] || 0) + 1
    saveDurations()
    updateChart()
    calculateStats()
    // syncToBackend()
  }, 1000)

  window.addEventListener('beforeunload', saveDurations)

  onBeforeUnmount(() => {
    clearInterval(interval)
    saveDurations()
  })
})

// Watch durations deeply to refresh chart and stats
watch(durations, () => {
  updateChart()
  calculateStats()
}, { deep: true })
</script>

