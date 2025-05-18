<template>
  <div class="p-6 max-w-3xl mx-auto text-center">
    <!-- SVG Illustration -->
    <div class="mb-6">
      <svg
        class="mx-auto w-32 h-32 text-blue-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M12 3v18m9-9H3m16.5 0a7.5 7.5 0 01-15 0 7.5 7.5 0 0115 0z"
        />
      </svg>
    </div>

    <!-- Header and Input -->
    <h1 class="text-3xl font-bold mb-4">AI-Powered Ebook Recommender</h1>

    <input
      v-model="prompt"
      @keydown.enter="getRecommendations"
      class="border border-gray-300 rounded px-4 py-2 w-full mb-4 focus:ring focus:border-blue-400"
      placeholder="Enter a topic (e.g. 'Machine Learning')"
    />

    <button
      @click="getRecommendations"
      class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
    >
      🔍 Generate Recommendations
    </button>

    <!-- States -->
    <div v-if="loading" class="mt-4 text-gray-600">Loading...</div>
    <div v-if="error" class="mt-4 text-red-600">{{ error }}</div>

    <!-- Cards -->
    <div class="mt-8 space-y-6 text-left" v-if="cards.length">
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="border p-5 rounded shadow hover:shadow-md transition bg-white"
      >
        <h2 class="text-xl font-semibold text-blue-800 mb-2">{{ card.title }}</h2>
        <p class="text-gray-700 mb-2">
          {{ expanded[index] ? card.description : truncate(card.description) }}
        </p>
        <button
          class="text-sm text-blue-500 hover:underline"
          @click="toggleExpanded(index)"
        >
          {{ expanded[index] ? 'See less' : 'See more' }}
        </button>
        <div class="mt-3">
          <a
            :href="card.link"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition text-sm"
          >
            📥 Search & Download
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const prompt = ref('');
const cards = ref([]);
const expanded = ref([]);
const loading = ref(false);
const error = ref('');

const truncate = (text, length = 120) => {
  return text.length > length ? text.slice(0, length) + '...' : text;
};

const toggleExpanded = (index) => {
  expanded.value[index] = !expanded.value[index];
};

const getRecommendations = async () => {
  if (!prompt.value.trim()) {
    error.value = 'Please enter a topic.';
    return;
  }

  loading.value = true;
  error.value = '';
  cards.value = [];
  expanded.value = [];

const url = import.meta.env.VITE_API_URL 

  try {
    const res = await fetch(`${url}/api/ebooks/recommendations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: prompt.value }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'API Error');
    }

    cards.value = data.cards;
    expanded.value = data.cards.map(() => false);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
body {
    background-color: #f9fafb;
}
</style>

