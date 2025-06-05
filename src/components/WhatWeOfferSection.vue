<script setup>

</script>

<template>
    <!-- What We Offer Section -->
    <section class="py-16 px-6 lg:px-20 bg-gray-100 border-t">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-2xl font-bold text-gray-900 mb-10">What We Offer</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          <div class="bg-white rounded-lg p-6 shadow-sm">
            <h3 class="text-lg font-semibold mb-2 text-blue-600">Track Your Learning</h3>
            <p class="text-gray-700">Stay organized with a clear overview of your topics and modules. Mark topics complete as you go.</p>
          </div>
          <div class="bg-white rounded-lg p-6 shadow-sm">
            <h3 class="text-lg font-semibold mb-2 text-blue-600">Progress & Feedback</h3>
            <p class="text-gray-700">Learning can be fun when it's donw together. With out peer grouped learning you stand to achieve a lot</p>
          </div>
          <div class="bg-white rounded-lg p-6 shadow-sm">
            <h3 class="text-lg font-semibold mb-2 text-blue-600">Peered Learning</h3>
            <p class="text-gray-700">With our Peer learning and active community, you get the chance to learn more and research better</p>
          </div>
        </div>
        <div class="mt-12 text-center">
          <router-link to="/login" class="inline-block bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg shadow hover:bg-blue-700 transition">
            Start Learning — It’s Free
          </router-link>
        </div>
      </div>
    </section>
</template>

<style scoped>
    
</style>


