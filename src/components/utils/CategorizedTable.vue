<script setup>
import { computed, ref, watch, nextTick, defineEmits, onMounted } from 'vue'
import CheckboxSelect from '../utils/CheckboxSelect.vue'
import loader from '../../assets/loader.gif'
import * as XLSX from 'xlsx'

const emits = defineEmits(['delete', 'edit'])

const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  },
  groupBy: {
    type: String,
    default: 'course' // fallback field for grouping
  }
})

const searchInput = ref('')
const filterBox = ref(null)
const fieldDisplay = ref(JSON.parse(localStorage.getItem('fieldDisplay')) || [])
const groupField = ref(props.groupBy)
const smartFieldCheckbox = computed(() => props.items.length ? Object.keys(props.items[0]) : [])

const actions = [
  { action: 'edit', icon: 'fas fa-edit', hover: 'blue' },
  { action: 'download', icon: 'fas fa-download', hover: 'blue' },
  { action: 'delete', icon: 'fas fa-trash', hover: 'red' },
]

const pagination = ref({})
const expandedGroups = ref({})
const perPage = 10

const groupedData = computed(() => {
  const filteredItems = props.items.filter(item => {
    const key = filterBox.value || 'title'
    return !searchInput.value || String(item[key] || '').toLowerCase().includes(searchInput.value.toLowerCase())
  })

  const grouped = filteredItems.reduce((groups, item) => {
    const key = groupField.value || 'course'
    const groupKey = item[key] || 'Uncategorized'
    const courseTitle = item.course || ''
    const displayTitle = key !== 'course' && courseTitle ? `${groupKey} (${courseTitle})` : groupKey
    if (!groups[displayTitle]) groups[displayTitle] = []
    groups[displayTitle].push(item)
    return groups
  }, {})

  for (const group in grouped) {
    if (!pagination.value[group]) pagination.value[group] = 1
    if (expandedGroups.value[group] === undefined) expandedGroups.value[group] = true
  }

  return grouped
})

const columns = computed(() => {
  const firstGroup = Object.values(groupedData.value)[0]
  return firstGroup?.length ? Object.keys(firstGroup[0]).filter(key => fieldDisplay.value.includes(key)) : []
})

function paginated(group) {
  const page = pagination.value[group] || 1
  const items = groupedData.value[group] || []
  return items.slice((page - 1) * perPage, page * perPage)
}

function totalPages(group) {
  return Math.ceil((groupedData.value[group]?.length || 0) / perPage)
}

watch(() => props.items, (newItems) => {
  if (newItems.length > 0 && fieldDisplay.value.length === 0) {
    fieldDisplay.value = Object.keys(newItems[0])
  }
}, { immediate: true, deep: true })

watch(fieldDisplay, (newVal) => {
  localStorage.setItem('fieldDisplay', JSON.stringify(newVal))
}, { deep: true })

function truncate(text, length = 80) {
  if (!text) return text
  return text.length > length ? text.slice(0, length) + '...' : text
}

function handleClick(e, id, action) {
  switch (action) {
    case 'delete': emits('delete', id); break
    case 'edit': emits('edit', id); break
    default: console.log("Action not supported")
  }
  e.currentTarget.innerHTML += `<img class="absolute top-1 left-1 z-10" width="20" id="loader" src="${loader}">`
  setTimeout(() => {
    const temp = document.getElementById('loader')
    if (temp) temp.remove()
  }, 1000)
}

function numToIcon(number) {
  if (number === 0) return '<i class="ri-checkbox-blank-circle-fill text-red-300"></i>'
  else if (number === 1) return '<i class="ri-checkbox-circle-fill text-green-500"></i>'
  return number
}

function exportToCSV(rows, name = 'data') {
  if (!rows.length) return
  const keys = Object.keys(rows[0])
  const csv = [keys.join(',')]
  for (const row of rows) {
    csv.push(keys.map(k => JSON.stringify(row[k] ?? '')).join(','))
  }
  const blob = new Blob([csv.join('\n')], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${name}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

function exportToExcel(rows, name = 'data') {
  const worksheet = XLSX.utils.json_to_sheet(rows)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
  XLSX.writeFile(workbook, `${name}.xlsx`)
}
</script>

<template>
    <div class="border-b pb-4">
        <slot></slot>
    </div>
  <div class="my-4">
    <label class="flex justify-between text-lg">
      <div class="font-bold uppercase">search</div>
      <div class="text-blue-500 capitalize">filter</div>
    </label>
    <div class="flex gap-2 h-10">
      <input v-model="searchInput" class="px-2 py-1 md:px-6 rounded md:py-2 shadow bg-white outline-none flex-1" placeholder="Search" type="text" />
      <select v-model="filterBox" class="px-2 py-2 md:px-6 shadow bg-white outline-none rounded-sm">
        <option v-for="(col, index) in columns" :key="index" :value="col">{{ col }}</option>
      </select>
    </div>
  </div>

  <!-- GroupBy Selector -->
  <div class="mb-4">
    <label class="font-bold text-sm mr-2">Group By:</label>
    <select v-model="groupField" class="px-2 py-2 rounded shadow border outline-none">
      <option v-for="(key, i) in smartFieldCheckbox" :key="i" :value="key">{{ key }}</option>
    </select>
  </div>

  <!-- Export All -->
  <div class="flex gap-4 mb-4">
    <button @click="exportToCSV(props.items, 'AllData')" class="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded">Export All CSV</button>
    <button @click="exportToExcel(props.items, 'AllData')" class="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded">Export All Excel</button>
  </div>

  <!-- Field Control -->
  <div class="flex justify-end gap-2 items-center mb-2">
    <div class="font-bold">Show Selected Fields:</div>
    <CheckboxSelect v-model="fieldDisplay" :options="smartFieldCheckbox" />
  </div>

  <div v-for="(groupItems, groupKey) in groupedData" :key="groupKey" class="mb-8">
    <div class="flex justify-between items-center mb-2">
      <h2 class="text-xl font-bold cursor-pointer" @click="expandedGroups[groupKey] = !expandedGroups[groupKey]">
        <i :class="expandedGroups[groupKey] ? 'ri-arrow-down-s-line' : 'ri-arrow-right-s-line'" class="mr-2"></i>
        {{ groupKey }}
      </h2>
      <div class="flex gap-2">
        <button @click="exportToCSV(groupItems, groupKey)" class="text-sm bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded">CSV</button>
        <button @click="exportToExcel(groupItems, groupKey)" class="text-sm bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded">Excel</button>
      </div>
    </div>

    <div v-if="expandedGroups[groupKey]">
      <div class="w-full overflow-x-auto bg-white rounded-xl shadow-2xl">
        <table class="min-w-full table-auto text-left border-collapse">
          <thead class="bg-gray-100">
            <tr>
              <th v-for="(col, index) in columns" :key="index" class="px-4 py-3 text-sm font-semibold text-gray-700 capitalize border-b border-gray-200 whitespace-nowrap">{{ col }}</th>
              <th class="px-4 py-3 text-sm font-semibold text-gray-700 border-b border-gray-200 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in paginated(groupKey)" :key="rowIndex" class="hover:bg-gray-50 transition">
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
      <div class="flex justify-end mt-2 gap-2">
        <button class="px-2 py-1 border rounded text-sm" :disabled="pagination[groupKey] <= 1" @click="pagination[groupKey]--">Prev</button>
        <span class="text-sm">Page {{ pagination[groupKey] }} of {{ totalPages(groupKey) }}</span>
        <button class="px-2 py-1 border rounded text-sm" :disabled="pagination[groupKey] >= totalPages(groupKey)" @click="pagination[groupKey]++">Next</button>
      </div>
    </div>
  </div>
</template>

