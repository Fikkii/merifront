<script setup>
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import { computed, watchEffect } from 'vue'

// Register chart.js modules
ChartJS.register(ArcElement, Tooltip, Legend)

// Accept percentage as a prop
const props = defineProps({
  percentage: {
    type: Number,
    required: true,
    default: 0
  }
})

// Generate reactive data for the chart
const progressData = computed(() => ({
  labels: ['Completed', 'Remaining'],
  datasets: [
    {
      data: [props.percentage, 100 - props.percentage],
      backgroundColor: ['#10B981', '#E5E7EB'], // green & light gray
      borderWidth: 0,
      cutout: '90%' // donut thickness
    }
  ]
}))

// Chart configuration
const progressOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: context => `${context.label}: ${context.raw}%`
      }
    }
  },
  animation: {
    animateRotate: true,
    duration: 1000
  }
}
</script>

<template>
  <div class="relative w-40">
    <Doughnut :data="progressData" :options="progressOptions" />
    <div class="absolute inset-0 flex items-center justify-center">
      <span class="text-xl font-bold text-gray-800">{{ percentage }}%</span>
    </div>
  </div>
</template>
