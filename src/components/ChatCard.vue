<template>
  <div class="flex flex-col h-full bg-white dark:bg-gray-900 rounded-xl shadow p-4">
    <div class="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">🤖 AI Study Buddy</div>

    <div ref="chatContainer" class="flex-1 overflow-y-auto space-y-4 mb-4 px-2 scroll-smooth">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        class="flex"
        :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
      >
        <div
          class="max-w-sm px-4 py-2 rounded-lg"
          :class="msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-100'"
        >
          {{ msg.content }}
        </div>
      </div>
    </div>

    <form @submit.prevent="sendMessage" class="flex gap-2">
      <input
        v-model="input"
        type="text"
        placeholder="Ask me anything..."
        class="flex-1 px-4 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white focus:outline-none"
        required
      />
      <button
        type="submit"
        :disabled="loading"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {{ loading ? 'Sending...' : 'Send' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'

const input = ref('')
const messages = ref([])
const loading = ref(false)
const chatContainer = ref(null)

const url = import.meta.env.VITE_API_URL 

// Load JWT token (e.g., from localStorage or Pinia)
const token = localStorage.getItem('token') || ''

const sendMessage = async () => {
  if (!input.value.trim()) return

  const newMsg = { role: 'user', content: input.value.trim() }
  messages.value.push(newMsg)
  input.value = ''
  loading.value = true

  try {
    const res = await axios.post(
      `${url}/api/chat`,
      {
        message: newMsg.content,
        history: messages.value.slice(-10), // Send last 10 messages
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    messages.value.push({
      role: 'model',
      content: res.data.reply,
    })
  } catch (err) {
    messages.value.push({
      role: 'model',
      content: '⚠️ Failed to get response from Gemini.',
    })
    console.error(err)
  } finally {
    loading.value = false
  }
}

watch(messages, () => {
  nextTick(() => {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  })
})
</script>

<style scoped>
/* Optional: customize scroll bar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background: rgba(100, 116, 139, 0.5);
  border-radius: 3px;
}
</style>

