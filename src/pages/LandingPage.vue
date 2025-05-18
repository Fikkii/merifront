<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 text-white font-sans">
    <!-- Hero Section -->
    <section class="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
      <div class="flex-1 space-y-6 text-center md:text-left">
        <h1 class="text-5xl font-extrabold leading-tight">
          Supercharge Your Learning <br />
          with AI-Powered Study Tools
        </h1>
        <p class="text-indigo-200 text-lg max-w-md mx-auto md:mx-0">
          Personalized quizzes, study plans, and progress tracking — all tailored to you.
        </p>
        <div class="flex justify-center md:justify-start gap-6 mt-6">
          <button
            @click="goToSignup"
            class="bg-white text-indigo-700 font-semibold px-8 py-3 rounded-full shadow hover:bg-indigo-100 transition"
          >
            Sign Up
          </button>
          <button
            @click="goToLogin"
            class="border border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-indigo-700 transition"
          >
            Login
          </button>
        </div>
      </div>
      <div class="flex-1">
        <img
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=700&q=80"
          alt="Students studying with AI tools"
          class="rounded-xl shadow-lg mx-auto max-w-full"
        />
      </div>
    </section>

    <!-- Benefits -->
    <section class="bg-white text-indigo-800 rounded-t-3xl py-16 px-8 max-w-5xl mx-auto shadow-lg">
      <h2 class="text-3xl font-bold text-center mb-10">Why Sign Up?</h2>
      <ul class="space-y-6 text-lg max-w-xl mx-auto list-disc list-inside">
        <li>Get personalized quizzes tailored to your level and topics.</li>
        <li>Track your progress and improve smarter, not harder.</li>
        <li>Access exclusive study plans designed by AI.</li>
      </ul>
    </section>

    <!-- Testimonials -->
    <section class="max-w-5xl mx-auto px-8 py-16 text-white text-center">
      <h2 class="text-3xl font-bold mb-12">What Students Say</h2>
      <div class="space-y-8 max-w-3xl mx-auto">
        <blockquote class="italic">"Helped me ace my exams effortlessly!"</blockquote>
        <footer class="font-semibold">– Sarah L.</footer>

        <blockquote class="italic">"The AI quizzes are so on point, it's like having a personal tutor."</blockquote>
        <footer class="font-semibold">– James K.</footer>

        <blockquote class="italic">"I finally enjoy studying thanks to this app."</blockquote>
        <footer class="font-semibold">– Emily R.</footer>
      </div>
    </section>

    <!-- About Us -->
    <section class="bg-white text-indigo-800 rounded-t-3xl py-12 px-8 max-w-4xl mx-auto shadow-lg">
      <h2 class="text-2xl font-bold mb-4 text-center">About Us</h2>
      <p class="text-center">
        We use cutting-edge AI technology to make studying easier and more effective for students everywhere.
      </p>
    </section>

    <!-- Contact -->
    <section class="max-w-5xl mx-auto px-8 py-12 text-white text-center">
      <h2 class="text-2xl font-bold mb-4">Contact Us</h2>
      <p>Email: <a href="mailto:support@studyapp.com" class="underline">support@studyapp.com</a></p>
      <p>Phone: +1 (555) 123-4567</p>
    </section>

    <!-- Footer -->
    <footer class="bg-indigo-900 text-indigo-300 py-6 text-center text-sm space-x-6">
      <a href="/privacy" class="hover:underline">Privacy Policy</a>
      <a href="/terms" class="hover:underline">Terms of Service</a>
      <a href="/refund" class="hover:underline">Refund Policy</a>
    </footer>
  </div>
</template>

<script setup>
const goToSignup = () => {
  window.location.href = '/signup'
}
const goToLogin = () => {
  window.location.href = '/login'
}
</script>

