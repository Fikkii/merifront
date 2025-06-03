<template>
    <div class="text-2xl font-bold text-center text-gray-500">
        UNDER CONSTRUCTION
    </div>
</template>

<script setup>
    import QuizCard from '../../components/QuizCard.vue'
    import TodoCard from '../../components/TodoCard.vue'
import EbookRecommender from '../../components/EbookRecommender.vue'
import axios from 'axios'
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

  try {
    const res = await axios.post(`/api/ebooks/recommendations`, {
        prompt: aiprompt
      });

      const data = await res.data;

      if (res.status !== 200) {
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
