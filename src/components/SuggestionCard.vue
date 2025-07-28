<script setup>
    import axios from 'axios'
    import { ref, onMounted } from 'vue';
defineProps({
    inline: {
        type: Boolean,
        default: false
    }
})

const topics = ref([]);
const loading = ref(false);
const error = ref('');

const url = import.meta.env.VITE_API_URL

const fetchTopics = async () => {
  loading.value = true;
  error.value = '';
  try {
    const res = await axios.get(`/api/ebooks/topics`);
    if (!res.status == 200) throw new Error('Failed to fetch topics');
    const data = await res.data;
    topics.value = data.cards.splice(0,3) || [];
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

async function copyToClipboard(topic){
    try{
        await navigator.clipboard.writeText(topic)
    }catch(e){
        console.log(e)
    }
}

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
            <div class="text-sm text-gray-700">
                <div @click="copyToClipboard(topic)" class="p-2 mt-2 break-words rounded shadow-lg">{{ topic }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>

