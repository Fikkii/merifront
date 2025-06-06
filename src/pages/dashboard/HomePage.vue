<template>
    <div class="w-full px-6 py-12">
        <div class="mb-4 border-b-2 shadow-b-2xl border-indigo-500 pb-3">
            <h3 class="font-bold text-lg">Welcome Back, User</h3>
            <p>This is your progress so far, Keep up the pace by completing some topics today</p>
        </div>
        <div class="grid md:grid-cols-3 gap-2 ">
            <Card title="Score" total="0"/>
            <Card title="Score" total="0"/>
            <Card title="Score" total="0"/>
        </div>
        <div class="mt-3 flex justify-between items-center bg-orange-200 rounded px-8 py-4 shadow">
            <div class="">
                <div class="font-bold">
                    Current Course:
                </div>
                <span> course name </span>
            </div>
            <button class="bg-indigo-500 px-4 py-2 text-white rounded shadow-lg">Continue</button>
        </div>
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
