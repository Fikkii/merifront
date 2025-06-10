<script setup>
    import EbookRecommender from '../../components/EbookRecommender.vue'
    import { ref, onMounted, watch } from 'vue'
    import axios from 'axios'

const prompt = ref('programming');
const loading = ref(false);
const error = ref('');
const cards = ref([]);
const expanded = ref([]);

const genres = [
    'Romance',
    'Fantasy',
    'Strategy',
    'science',
    'Politics',
    'Technology',
    'AI',
    'Programming',
]

const toggleExpanded = (index) => {
  expanded.value[index] = !expanded.value[index];
};


const truncate = (text, length = 80) => {
  return text.length > length ? text.slice(0, length) + '...' : text;
};

let debounceTimeout = null

watch(prompt, (newVal) => {
  clearTimeout(debounceTimeout);

  debounceTimeout = setTimeout(() => {getRecommendations(newVal)}, 1000)
})

onMounted(() => {
getRecommendations(prompt.value)
})

const getRecommendations = async (genre) => {
  let aiprompt = `generate ebook on ${genre}, never repeat a book twice`

  loading.value = true;
  error.value = '';
  cards.value = [];
  expanded.value = [];

const url = import.meta.env.VITE_API_URL 

  try {
    const res = await axios.post(`/api/ebooks/recommendations`, { prompt: aiprompt }
    );

    const data = await res.data;

    if (!res.status == 200) {
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

<template>
    <div>
        <div>
            Search for Ebook
            <div class="flex items-center gap-2">
                <input
                        v-model="prompt"
                        @keydown.enter.prevent.stop
                        class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:border-blue-400"
                        placeholder="Enter a topic (e.g. 'Machine Learning')"
                        />
            </div>

        </div>
        Popular Tags:
        <div class="flex gap-2 flex-wrap justify-center">
            <button v-for="genre in genres" @click="prompt = genre" class="p-2 bg-green-800 rounded text-white">{{ genre }}</button>
        </div>

        <!-- States -->
        <div v-if="loading" class="mt-4 text-gray-600"><img src="../../assets/loader.gif" width=20 />Loading...</img></div>
        <div v-if="error" class="mt-4 text-red-600">{{ error }}</div>

        <!-- Cards -->
        <div class="mt-8 space-y-6 text-left" v-if="cards.length">
            <div
                    v-for="(card, index) in cards"
                    :key="index"
                    class="border p-5 rounded shadow hover:shadow-md transition bg-white"
                    >
                    <h2 class="text-sm font-semibold text-blue-800 mb-2">{{ card.title }}</h2>
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
            <button @click="getRecommendations" class="bg-blue-500 p-3 text-white rounded block ms-auto">See more</button>
        </div>
    </div>

</template>

<style scoped>

</style>

