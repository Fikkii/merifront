<template>
  <div class="bg-white h-full w-full shadow-lg rounded-xl p-6 max-w-md mx-auto">
    <!-- Header with checklist SVG -->
    <h2 class="text-sm font-bold border-b-2 text-green-700 mb-6 flex items-center justify-center gap-2">
      <i class="ri-list-check-3"></i>ToDo
    </h2>

    <!-- Input and Add button -->
    <div class="mb-6">
      <input
        v-model="newTask"
        type="text"
        placeholder="Add a new task..."
        class="border w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
        @keydown.enter="addTask"
        aria-label="New task input"
      />
      <button
        @click="addTask"
        class="mt-2 ms-auto bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center"
        aria-label="Add task"
      >
      <i class="ri-add-line"></i>Add Task
      </button>
    </div>

    <!-- Task list -->
    <ul class="space-y-3">
      <li
        v-for="task in tasks"
        :key="task.id"
        class="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm"
      >
        <span
          :class="{ 'line-through text-gray-400': task.completed }"
          class="text-base break-words max-w-[70%]"
        >
          {{ task.text }}
        </span>

        <div class="flex gap-4 text-sm">
          <button
            @click="toggleComplete(task)"
            :class="task.completed ? 'text-yellow-600' : 'text-green-600'"
            class="flex items-center gap-1 hover:underline focus:outline-none"
            :aria-label="task.completed ? 'Undo completion' : 'Mark as done'"
          >
            <!-- Checkmark for Done -->
            <svg
              v-if="!task.completed"
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
              focusable="false"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <!-- Undo icon (rotated checkmark) -->
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
              focusable="false"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {{ task.completed ? 'Undo' : 'Done' }}
          </button>

          <button
            @click="deleteTask(task.id)"
            class="text-red-500 hover:text-red-700 focus:outline-none"
            aria-label="Delete task"
          >
            <!-- Trash icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fill-rule="evenodd"
                d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const newTask = ref('')
const tasks = ref([])

const url = import.meta.env.VITE_API_URL

const fetchTasks = async () => {
  try {
    const res = await axios.get(`${url}/api/todos`)
    tasks.value = res.data
  } catch (err) {
    console.error('Failed to load tasks:', err)
  }
}

const addTask = async () => {
  const text = newTask.value.trim()
  if (!text) return

  try {
    const res = await axios.post(`${url}/api/todos`, { text })
    tasks.value.push(res.data)
    newTask.value = ''
  } catch (err) {
    console.error('Failed to add task:', err)
  }
}

const toggleComplete = async (task) => {
  try {
    task.completed = !task.completed
    await axios.put(`${url}/api/todos/${task.id}`, { completed: task.completed })
  } catch (err) {
    console.error('Failed to update task:', err)
  }
}

const deleteTask = async (id) => {
  try {
    await axios.delete(`${url}/api/todos/${id}`)
    tasks.value = tasks.value.filter((t) => t.id !== id)
  } catch (err) {
    console.error('Failed to delete task:', err)
  }
}

onMounted(fetchTasks)
</script>

