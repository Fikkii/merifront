<script setup>
import { computed, ref, defineEmits } from 'vue'

const emits = defineEmits(['delete', 'edit'])

const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  }
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
        v-for="(row, rowIndex) in items"
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
        <td class="px-4 py-3 flex flex-col gap-1 flex-wrap items-center">
            <button @click="(e) => handleClick(e, row.id, action.action)" v-for="action in actions" :class="[action.hover == 'blue' ? 'hover:bg-indigo-500': 'hover:bg-red-500', 'hover:text-white']" class="text-gray-600 p-2 rounded bg-gray-50 hover:text-indigo-800 transition">
            <i :class="action.icon"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

