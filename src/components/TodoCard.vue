<template>
  <div class="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-8">
    <h2 class="text-2xl font-bold text-indigo-700 mb-4">📌 Study To-Do List</h2>

    <div class="flex gap-2 mb-4">
      <input
        v-model="newTask"
        type="text"
        placeholder="Add a new task..."
        class="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        @keydown.enter="addTask"
      />
      <button
        @click="addTask"
        class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        Add
      </button>
    </div>

    <ul class="space-y-3">
      <li
        v-for="task in tasks"
        :key="task.id"
        class="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm"
      >
        <span :class="{ 'line-through text-gray-400': task.completed }" class="text-base">
          {{ task.text }}
        </span>
        <div class="flex gap-3 text-sm">
          <button
            @click="toggleComplete(task)"
            :class="task.completed ? 'text-yellow-600' : 'text-green-600'"
            class="hover:underline"
          >
            {{ task.completed ? 'Undo' : 'Done' }}
          </button>
          <button @click="deleteTask(task.id)" class="text-red-500 hover:underline">
            Delete
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

