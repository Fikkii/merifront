<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <EbookRecommender />
        <SuggestionCard />
        <QuizCard class="lg:col-span-2" />
    </div>
</template>

<script setup>
import QuizCard from '../../components/QuizCard.vue'
import SuggestionCard from '../../components/SuggestionCard.vue'
import EbookRecommender from '../../components/EbookRecommender.vue'
</script>

<style scoped>

</style>
