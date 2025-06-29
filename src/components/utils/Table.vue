<script setup>
import { computed, nextTick, ref, onMounted, defineEmits, watch } from 'vue'
import CheckboxSelect from '../utils/CheckboxSelect.vue'
import loader from '../../assets/loader.gif'

const emits = defineEmits(['delete', 'edit'])

const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  }
})

const searchInput = ref('')
const filterBox = ref(null)
const fieldDisplay = ref([])
const filteredData = ref(null)
const smartField = ref([])

// Pagination states
const currentPage = ref(1)
const perPage = ref(10)

const actions = [
  { action: 'edit', icon: 'fas fa-edit', hover: 'blue' },
  { action: 'download', icon: 'fas fa-download', hover: 'blue' },
  { action: 'delete', icon: 'fas fa-trash', hover: 'red' },
]

watch(
  () => props.items,
  (newItems) => {
    if (newItems?.length > 0 && fieldDisplay.value.length === 0) {
      fieldDisplay.value = Object.keys(newItems[0])
    }
  },
  { immediate: true }
)

watch(() => searchInput.value, () => {
  if (!smartField.value || !smartField.value.length) return

  filteredData.value = smartField.value.filter(row => {
    const filterKey = filterBox.value || 'title'
    const cell = row[filterKey]
    return typeof cell === 'string' && cell.toLowerCase().includes(searchInput.value.toLowerCase())
  })

  currentPage.value = 1
})

watch(fieldDisplay, () => {
  modifyTableField()
})

watch([filteredData, smartField], () => {
  currentPage.value = 1
})

onMounted(async () => {
  await nextTick()
  modifyTableField()
})

function modifyTableField() {
  if (!props.items?.length) {
    smartField.value = []
    return
  }

  smartField.value = props.items.map(row => {
    const filtered = {}
    for (const key of fieldDisplay.value) {
      if (key in row) {
        filtered[key] = row[key]
      }
    }
    return filtered
  })
}

const smartFieldCheckbox = computed(() => {
  return props.items?.length ? Object.keys(props.items[0]) : []
})

const columns = computed(() => {
  return smartField.value?.length ? Object.keys(smartField.value[0]) : []
})

const paginatedData = computed(() => {
  const data = filteredData.value ?? smartField.value
  const start = (currentPage.value - 1) * perPage.value
  return data.slice(start, start + perPage.value)
})

const totalPages = computed(() => {
  const data = filteredData.value ?? smartField.value
  return Math.ceil((data?.length || 0) / perPage.value)
})

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

function truncate(text, length = 80) {
  if (!text) return text
  return text.length > length ? text.slice(0, length) + '...' : text
}

function handleClick(e, id, action) {
  switch (action) {
    case 'delete': emits('delete', id); break
    case 'edit': emits('edit', id); break
    default: console.log("Action is not available")
  }

  e.currentTarget.innerHTML += `<img class="absolute top-1 z-index left-1" width="20" id="loader" src="${loader}">`

  setTimeout(() => {
    const temp = document.getElementById('loader')
    if (temp) temp.remove()
  }, 5000)
}

function numToIcon(number) {
  if (number === 0) return '<i class="ri-checkbox-blank-circle-fill text-red-300"></i>'
  else if (number === 1) return '<i class="ri-checkbox-circle-fill text-green-500"></i>'
  return number
}
</script>

<template>
  <!-- Filter UI -->
  <div class="my-4">
    <label class="flex justify-between text-lg">
      <div class="font-bold uppercase">search</div>
      <div class="text-blue-500 capitalize">filter</div>
    </label>
    <div class="flex gap-2 h-10">
      <input v-model="searchInput" class="px-2 py-1 md:px-6 rounded md:py-2 shadow bg-white outline-none flex-1" placeholder="Enter Title" type="text" />
      <select v-model="filterBox" class="px-2 py-2 md:px-6 shadow bg-white outline-none rounded-sm">
        <option v-for="(col, index) in columns" :key="index" :value="col">{{ col }}</option>
      </select>
    </div>
  </div>

  <!-- Slot -->
  <div class="mb-3">
    <slot />
  </div>

  <!-- Field Display -->
  <div class="flex justify-end gap-2 items-center mb-2">
    <div class="font-bold">Show Selected Fields:</div>
    <CheckboxSelect v-model="fieldDisplay" :options="smartFieldCheckbox" />
  </div>

  <!-- Table -->
  <div class="w-full overflow-x-auto bg-white rounded-xl shadow-2xl">
    <table class="min-w-full table-auto text-left border-collapse">
      <thead class="bg-gray-100">
        <tr>
          <th v-for="(col, index) in columns" :key="index" class="px-4 py-3 text-sm font-semibold text-gray-700 capitalize border-b border-gray-200 whitespace-nowrap">
              {{ col }}
          </th>
          <th class="px-4 py-3 text-sm font-semibold text-gray-700 border-b border-gray-200 whitespace-nowrap">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in paginatedData" :key="rowIndex" class="hover:bg-gray-50 transition">
          <td v-for="(key, colIndex) in columns" :key="colIndex" v-html="typeof row[key] === 'number' ? numToIcon(row[key]) : truncate(row[key])" class="px-4 py-3 text-sm text-gray-800 whitespace-nowrap border-b border-gray-100" />
          <td class="px-4 py-3 flex gap-1 items-center">
            <button
              v-for="action in actions"
              :key="action.action"
              @click="(e) => handleClick(e, row.id, action.action)"
              :class="[action.hover === 'blue' ? 'hover:bg-indigo-500' : 'hover:bg-red-500', 'hover:text-white']"
              class="relative text-gray-600 p-2 rounded bg-gray-50 hover:text-indigo-800 transition"
            >
              <i :class="action.icon"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Pagination -->
  <div class="flex overflow-x-auto justify-between items-center mt-4 p-4">
    <div class="text-sm text-gray-600">Page {{ currentPage }} of {{ totalPages }}</div>
    <div class="flex gap-2">
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage <= 1"
        class="px-3 py-1 border rounded text-sm bg-gray-50 hover:bg-gray-100 disabled:opacity-50"
      >Prev</button>
      <button
        v-for="page in totalPages"
        :key="page"
        @click="goToPage(page)"
        :class="[
          'px-3 py-1 rounded text-sm',
          page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-50 hover:bg-gray-100'
        ]"
      >{{ page }}</button>
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage >= totalPages"
        class="px-3 py-1 border rounded text-sm bg-gray-50 hover:bg-gray-100 disabled:opacity-50"
      >Next</button>
    </div>
  </div>
</template>

