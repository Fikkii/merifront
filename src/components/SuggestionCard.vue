<script setup>
    import { ref, onMounted } from 'vue';

const topics = ref([]);
const loading = ref(false);
const error = ref('');

const url = import.meta.env.VITE_API_URL

const fetchTopics = async () => {
  loading.value = true;
  error.value = '';
  try {
    const res = await fetch(`${url}/api/ebooks/topics`);
    if (!res.ok) throw new Error('Failed to fetch topics');
    const data = await res.json();
    console.log(data)
    topics.value = data.cards || [];
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchTopics();
  console.log(topics)
});

</script>

<template>
    <div v-if="loading">
        <img src="../assets/loader.gif" width="20" alt="">
    </div>
    <div v-else class="bg-white p-4 rounded-xl shadow-sm">
        <h3 class="text-lg font-semibold mb-2">Suggested Topics</h3>
        <div v-for="topic in topics">
            <div class="text-sm grid gap-3 text-gray-700">
                <div class="border p-5 py-8 rounded border-[3px] border-blue-200 shadow-lg">{{ topic }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>

