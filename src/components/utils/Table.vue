<script setup>
import { computed, ref, defineEmits, watch } from 'vue'

const emits = defineEmits(['delete', 'edit'])


const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  }
})

const items = computed(() => props.items)

const searchInput = ref(null)
const filteredData = ref(null)

watch(() => searchInput, (newVal) => {
    filteredData.value = props.items.filter(value => { 
        return value.title.toLowerCase().includes(searchInput.value.toLowerCase())
    })
})

const actions = [
{
    action: 'edit',
    icon: 'fas fa-edit',
    hover: 'blue'
},
{
    action: 'download',
    icon: 'fas fa-download',
    hover: 'blue'
},
{
    action: 'delete',
    icon: 'fas fa-trash',
    hover: 'red'
},
]

const columns = computed(() => {
  if (!Array.isArray(props.items) || props.items.length === 0) return []
  return Object.keys(props.items[0])
})

function handleDropdown(e) {
  console.log(e.target.id)
}

function handleClick(e, id, action){
    switch (action) {
        case 'delete': 
            emits('delete', id)
            break;
        case 'edit': 
            emits('edit', id)
            break;
        default:
            console.log("Action is not available")
    }
}
</script>

<template>
    <div class="my-4">
        <label class="font-bold text-lg">Search</label>
        <div class="flex gap-2">
            <input v-model="searchInput" class="px-2 py-1 md:px-6 rounded md:py-4 shadow bg-white outline-none flex-1" placeholder="Enter Title" type="text"/>
            <select class="px-2 py-2 md:px-6 md:py-4 mt-2 shadow bg-white outline-none  rounded-sm">
                <option disabled selected>Filter</option>
                <option>Latest</option>
                <option>Active</option>
                <option>Inactive</option>
            </select>
        </div>
    </div>

    <!-- slot -->
    <div class="mb-3">
        <slot />
    </div>

<!-- Responsive Table Wrapper -->
<div class="w-full overflow-x-auto bg-white rounded-xl shadow-2xl">
  <table class="min-w-full table-auto text-left border-collapse">
    <thead class="bg-gray-100">
      <tr>
        <th
          v-for="(col, index) in columns"
          :key="index"
          class="px-4 py-3 text-sm font-semibold text-gray-700 capitalize border-b border-gray-200 whitespace-nowrap"
        >
          {{ col }}
        </th>
        <th class="px-4 py-3 text-sm font-semibold text-gray-700 border-b border-gray-200 whitespace-nowrap">
          Actions
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, rowIndex) in (filteredData ? filteredData : items)"
        :key="rowIndex"
        class="hover:bg-gray-50 transition"
      >
        <td
          v-for="(key, colIndex) in columns"
          :key="colIndex"
          class="px-4 py-3 text-sm text-gray-800 whitespace-nowrap border-b border-gray-100"
        >
          {{ row[key] }}
        </td>
        <td class="px-4 py-3 flex gap-1 items-center">
            <button @click="(e) => handleClick(e, row.id, action.action)" v-for="action in actions" :class="[action.hover == 'blue' ? 'hover:bg-indigo-500': 'hover:bg-red-500', 'hover:text-white']" class="text-gray-600 p-2 rounded bg-gray-50 hover:text-indigo-800 transition">
            <i :class="action.icon"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

