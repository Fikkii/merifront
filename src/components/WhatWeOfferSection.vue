<script setup>
const offers = [
  {
    title: 'AI Partner',
    video: 'ai.mp4'
  },
  {
    title: 'Project Based Learning',
    video: 'project.mp4'
  },
  {
    title: 'Peered Learning',
    video: 'peer.mp4'
  }
]
</script>

<template>
  <section class="py-16 px-6 lg:px-20 bg-gray-100 border-t">
    <div class="max-w-6xl mx-auto text-center">
      <h2 class="text-xl font-bold text-gray-900 mb-10">What We Offer</h2>

      <div
        v-for="(offer, index) in offers" data-aos="fade"
        :key="index"
        class="p-4 text-black mb-8 rounded-lg shadow text-center"
      >
        <h3 class="text-lg md:text-2xl font-bold mb-6">
          {{ offer.title }}
        </h3>
        <div class="max-w-3xl mx-auto rounded-xl overflow-hidden shadow-lg aspect-video">
          <video
            autoplay
            muted
            playsinline
            loop
            class="w-full h-full object-cover"
          >
            <source :src="`/videos/${offer.video}`" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div class="mt-12">
        <router-link
          to="/login"
          class="inline-block bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Start Learning — It’s Free
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* You can add transition or hover effects here if needed */
</style>

