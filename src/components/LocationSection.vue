<script setup>

</script>

<template>
    <!-- Location & Contact Section -->
    <section class="bg-blue-50 border-t py-16 px-6 lg:px-20">
      <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        <div>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Our Location</h2>
          <p class="text-gray-700 mb-6">
            We’re based in Lagos, Nigeria — but our platform supports learners everywhere.
          </p>
          <div class="w-full h-72 rounded-lg overflow-hidden shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?..."
              width="100%"
              height="100%"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p class="text-gray-700 mb-6">Have questions? We’re happy to help. Reach out via email or use the form below.</p>
          <ul class="space-y-2 mb-6 text-gray-700">
            <li class="flex items-center gap-2">
              <i class="ri-mail-line text-blue-600 text-xl"></i>
              <a href="mailto:support@merilearn.com" class="hover:underline">support@merilearn.com</a>
            </li>
            <li class="flex items-center gap-2">
              <i class="ri-phone-line text-blue-600 text-xl"></i>
              <a href="tel:+2341234567890" class="hover:underline">+234 123 456 7890</a>
            </li>
          </ul>
          <form @submit.prevent class="space-y-4">
            <input type="text" placeholder="Your name" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="email" placeholder="Your email" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <textarea placeholder="Your message" rows="4" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">Send Message</button>
          </form>
        </div>
      </div>
    </section>

</template>

<style scoped>
    
</style>


