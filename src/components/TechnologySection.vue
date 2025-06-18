<script setup>
import { ref, onMounted } from 'vue'

const baseIcons = [
  'ri-vuejs-line',
  'ri-angularjs-line',
  'ri-nodejs-line',
  'ri-html5-line',
  'ri-css3-line',
  'ri-javascript-line',
  "ri-reactjs-line"
]

const icons = ref([...baseIcons])

// Constants
const maxVisibleSets = 3 // Only keep 3 full sets in memory
const intervalMs = 3000  // Add new icons every 3 seconds

onMounted(() => {
  setInterval(() => {
    icons.value.push(...baseIcons)

    // Trim old icons if we exceed max sets
    const maxLength = baseIcons.length * maxVisibleSets
    if (icons.value.length > maxLength) {
      icons.value.splice(0, icons.value.length - maxLength)
    }
  }, intervalMs)
})
</script>

<template>
  <section class="py-16 px-6 lg:px-20 bg-black overflow-hidden">
    <div class="max-w-6xl mx-auto text-center">
      <div class="carousel-track md:gap-20">
        <div data-aos="fade-right"
          v-for="(icon, index) in icons"
          :key="index"
          class="carousel-item text-blue-600 text-5xl"
        >
          <i :class="icon" :title="icon.replace('ri-', '').replace('-line', '')"></i>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.carousel-track {
  display: flex;
  animation: scroll-left 20s linear infinite;
  width: max-content;
}

.carousel-item {
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100px;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.carousel-track:hover {
  animation-play-state: paused;
}
</style>

