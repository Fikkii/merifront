<template>
  <div class="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-4 text-indigo-700">Quiz Generator</h1>

    <!-- Prompt input & generate button -->
    <div v-if="!quizStarted" class="mb-6">
      <input
        v-model="prompt"
        @keydown.enter="generateQuiz"
        placeholder="Enter a topic to generate quiz..."
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        :disabled="loading"
      />
      <button
        @click="generateQuiz"
        :disabled="loading || !prompt.trim()"
        class="mt-3 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        {{ loading ? 'Generating...' : 'Generate Quiz' }}
      </button>
      <p v-if="error" class="text-red-600 mt-2">{{ error }}</p>
    </div>

    <!-- Quiz questions -->
    <div v-if="quizStarted && !showResults">
      <h2 class="mb-4 text-lg font-semibold text-gray-700">
        Question {{ currentQuestionIndex + 1 }} / {{ questions.length }}
      </h2>

      <div class="mb-4 p-4 border rounded shadow-sm">
        <p class="mb-3 font-medium">{{ currentQuestion.question }}</p>
        <div class="space-y-2">
          <button
            v-for="(option, idx) in currentQuestion.options"
            :key="idx"
            @click="selectAnswer(idx)"
            :class="[
              'block w-full text-left px-4 py-2 rounded-lg border',
              selectedAnswer === idx ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-800 border-gray-300 hover:bg-indigo-100',
            ]"
          >
            {{ String.fromCharCode(65 + idx) }}. {{ option }}
          </button>
        </div>
      </div>

      <div class="flex justify-between">
        <button
          @click="prevQuestion"
          :disabled="currentQuestionIndex === 0"
          class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          @click="nextQuestion"
          :disabled="selectedAnswer === null"
          class="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {{ isLastQuestion ? 'Submit Quiz' : 'Next' }}
        </button>
      </div>
    </div>

    <!-- Results -->
    <div v-if="showResults" class="text-center">
      <h2 class="text-xl font-semibold mb-3">Your Results</h2>
      <p class="mb-1">Total Questions: {{ results.totalQuestions }}</p>
      <p class="mb-1">Correct Answers: {{ results.correctAnswers }}</p>
      <p class="mb-4">Score: {{ results.scorePercent.toFixed(2) }}%</p>
      <p
        :class="[
          results.passed ? 'text-green-600' : 'text-red-600',
          'font-bold text-lg',
        ]"
      >
        {{ results.passed ? 'Passed ✅' : 'Failed ❌' }}
      </p>

      <button
        @click="resetQuiz"
        class="mt-6 px-6 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
      >
        Take Another Quiz
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const prompt = ref('');
const loading = ref(false);
const error = ref('');

const questions = ref([]);
const userAnswers = ref([]);
const currentQuestionIndex = ref(0);
const showResults = ref(false);
const results = ref(null);

const quizStarted = computed(() => questions.value.length > 0);

const currentQuestion = computed(() => questions.value[currentQuestionIndex.value] || {});
const selectedAnswer = computed(() => userAnswers.value[currentQuestionIndex.value] ?? null);
const isLastQuestion = computed(() => currentQuestionIndex.value === questions.value.length - 1);

async function generateQuiz() {
  if (!prompt.value.trim()) {
    error.value = 'Please enter a topic.';
    return;
  }

  loading.value = true;
  error.value = '';
  questions.value = [];
  userAnswers.value = [];
  currentQuestionIndex.value = 0;
  showResults.value = false;
  results.value = null;

  try {
    const res = await fetch('http://localhost:3000/api/quiz/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: prompt.value }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Failed to generate quiz');
    }

    const data = await res.json();
    questions.value = data.questions || [];

    if (questions.value.length === 0) {
      error.value = 'No questions generated.';
    } else {
      userAnswers.value = Array(questions.value.length).fill(null);
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

function selectAnswer(idx) {
  userAnswers.value[currentQuestionIndex.value] = idx;
}

function nextQuestion() {
  if (isLastQuestion.value) {
    submitQuiz();
  } else {
    currentQuestionIndex.value++;
  }
}

function prevQuestion() {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
  }
}

async function submitQuiz() {
  loading.value = true;
  error.value = '';

  // Prepare answers as letters A/B/C/D based on selected indexes
  const answersAsLetters = userAnswers.value.map(idx =>
    idx !== null ? String.fromCharCode(65 + idx) : null
  );

  try {
    const res = await fetch('http://localhost:3000/api/quiz/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        questions: questions.value,
        userAnswers: answersAsLetters,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Failed to evaluate quiz');
    }

    results.value = await res.json();
    showResults.value = true;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

function resetQuiz() {
  prompt.value = '';
  questions.value = [];
  userAnswers.value = [];
  currentQuestionIndex.value = 0;
  showResults.value = false;
  results.value = null;
  error.value = '';
}
</script>

<style scoped>
button:disabled {
  cursor: not-allowed;
}
</style>

