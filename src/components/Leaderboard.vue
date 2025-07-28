<script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios'
    
    // This ref handles the leaderboard logic...
    const leaderboard = ref('')

onMounted(() => {
    fetchLeaderboard()
})

async function fetchLeaderboard() {
  try {
    const res = await axios.get('/api/student/leaderboard')

    if (res.status == 200) {
        const data = await res.data
        leaderboard.value = data
    }
  } catch (e) {
    console.error('Caught error:', e);
  }
}

</script>
<template>
    <div class="w-full">
        <div id="flier" class="h-55">

        </div>
        <div class="bg-blue-50 px-6 p-4">
            <h2 class="text-2xl font-bold">Leaderboard</h2>
            <div v-for="leader in leaderboard" class="flex flex-col gap-2">
                <div class="flex justify-between px-6 py-4 border-b font-bold">
                    {{ leader.fullname || 'Anonymous User'}}
                    <div>
                        {{ leader.average_score }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#flier {
    background-image: url('../assets/hero.jpg');
    background-size: contain
}
</style>
