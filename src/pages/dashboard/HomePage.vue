<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <EbookRecommender />
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
        </div>
        <div v-else>
           <img src="../../assets/loader.gif" width=20 alt=""> 
        </div>

        <RouterLink class="p-3 shadow rounded bg-blue-50" :to="{ name: 'chat' }">
        Chat with ai
        <img src="../../assets/gpt.gif" alt="">
        <div class="block text-center p-4 border mt-2">Click Here, Let's Talk</div>
        </RouterLink>
        <TodoCard />
    </div>
</template>

<script setup>
    import QuizCard from '../../components/QuizCard.vue'
    import TodoCard from '../../components/TodoCard.vue'
import EbookRecommender from '../../components/EbookRecommender.vue'
import { ref, onMounted } from 'vue'

const prompt = ref('programming');
const loading = ref(false);
const error = ref('');
const cards = ref([]);
const expanded = ref([]);

const toggleExpanded = (index) => {
  expanded.value[index] = !expanded.value[index];
};


const truncate = (text, length = 80) => {
  return text.length > length ? text.slice(0, length) + '...' : text;
};

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
    const res = await fetch(`${url}/api/ebooks/recommendations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: aiprompt }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'API Error');
    }

    cards.value = data.cards.slice(0,2);
    expanded.value = data.cards.map(() => false);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};


</script>

<style scoped>

</style>
