<script setup>
    import QuizCard from '../../components/QuizCard.vue'
    import TodoCard from '../../components/TodoCard.vue'
    import DescButton from '../../components/dashboard/DescButton.vue'
    import ProgressBar from '../../components/ProgressBar.vue'

    import WeeklyTracker from '../../components/WeeklyTracker.vue'

    import Leaderboard from '../../components/Leaderboard.vue'

import EbookRecommender from '../../components/EbookRecommender.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'

const prompt = ref('programming');
const loading = ref(false);
const error = ref('');
const cards = ref([]);
const expanded = ref([]);

const metric = ref('');

const toggleExpanded = (index) => {
  expanded.value[index] = !expanded.value[index];
};


const truncate = (text, length = 80) => {
  return text.length > length ? text.slice(0, length) + '...' : text;
};

onMounted(() => { getMetrics() })

const getMetrics = async () => {
  try {
    const res = await axios.get(`/api/student/metrics`);

      const data = await res.data;
      metric.value = data

      if (res.status !== 200) {
        throw new Error(data.error || 'API Error');
      }

  } catch (err) {
    error.value = err.message;
  }
};

/**
This is was used before for getting ebooks recommendations
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
**/

</script>

<template>
    <div class="w-full">
        <div class="mb-4 border-b-2 shadow-b-2xl border-indigo-500 pb-3">
            <h3 class="font-bold text-lg">Welcome Back, User</h3>
            <p>This is your progress so far, Keep up the pace by completing some topics today</p>
        </div>
        <div class="flex flex-col md:grid md:grid-cols-6 gap-3">
            <div class="col-span-4 flex flex-col gap-2 justify-between">
                <div class="grid md:grid-cols-2 gap-2">
                    <Card icon="fa-calendar" title="Topic Completed" :total="metric.total_topic_completed"/>
                    <Card icon="fa-briefcase" title="Project Completed" :total="metric.total_evaluation || 0"/>
                </div>

                <DescButton title="Current Course:" :desc="metric.course || 'Click Continue to Enroll in a course'" to="learning" class="bg-blue-100"/>
                <DescButton title="Learning with AI" desc="Partner up with AI" to="chat" class="bg-orange-100">
                <i class="ri-chat-ai-line"></i>
                </DescButton>
            </div>
            <div class="bg-white rounded p-4 shadow flex flex-col gap-3 justify-center items-center col-span-2">
                <h2 class="font-bold text-md self-start">Your MeriScore</h2>
                <ProgressBar class="h-35" :percentage="metric.average_score" />
                <span><i class="ri-golf-ball-fill text-orange-500"></i>Project Completed</span>
            </div>
        </div>

        <div class="flex flex-wrap mt-6 gap-3">
            <div class="min-w-20 bg-white md:min-w-130">
                <WeeklyTracker />
            </div>
            <div class="flex-1">
            <Leaderboard />
            </div>
        </div>

        <div class="mt-10">
            <h2 class="font-semibold text-lg">Personal Development...</h2>
            <TodoCard />
        </div>
    </div>
</template>

<style scoped>

</style>
