<template>
  <section class="bg-white py-10 px-6 md:px-12 text-center rounded-2xl shadow-md max-w-4xl mx-auto">
    <h2 class="text-3xl font-bold text-gray-800 mb-4">Stay Connected</h2>
    <p class="text-gray-600 mb-6">
      Follow us on social media and be part of our growing community!
    </p>

    <div class="flex justify-center gap-5 mb-8">
      <a
              href="`https://facebook.com/${facebook}`"
        target="_blank"
        class="text-blue-600 hover:text-blue-800 transition text-2xl"
      >
        <i class="ri-facebook-circle-fill"></i>
      </a>
      <a
              href="`https://x.com/${x}`"
        target="_blank"
        class="text-sky-500 hover:text-sky-700 transition text-2xl"
      >
        <i class="ri-twitter-x-fill"></i>
      </a>
      <a
              href="`https://instagram.com/${instagram}`"
        target="_blank"
        class="text-pink-500 hover:text-pink-700 transition text-2xl"
      >
        <i class="ri-instagram-line"></i>
      </a>
      <a
              href="`https://linkedin.com/in/${linkedin}`"
        target="_blank"
        class="text-blue-700 hover:text-blue-900 transition text-2xl"
      >
        <i class="ri-linkedin-box-fill"></i>
      </a>
      <a
              href="`https://youtube.com/${youtube}`"
        target="_blank"
        class="text-red-600 hover:text-red-800 transition text-2xl"
      >
        <i class="ri-youtube-fill"></i>
      </a>
    </div>

    <a
      href="https://discord.gg/"
      target="_blank"
      class="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl text-lg font-medium hover:bg-indigo-700 transition"
    >
      Join Our Discord Community
    </a>
  </section>
</template>

<script setup>
    const youtube = process.env.SOCIAL_YOUTUBE
    const instagram = process.env.SOCIAL_INSTAGRAM
    const linkedin = process.env.SOCIAL_LINKEDIN
    const discord = process.env.SOCIAL_DISCORD
    const facebook = process.env.SOCIAL_FACEBOOK
    const x = process.env.SOCIAL_X
</script>

<style scoped>
/* Optional custom styles */
</style>

