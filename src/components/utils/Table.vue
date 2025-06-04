<script setup>
import { computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  }
})

const columns = computed(() => {
  if (!Array.isArray(props.items) || props.items.length === 0) return []
  return Object.keys(props.items[0])
})

function handleDropdown(id) {
  console.log(id)
}
</script>

<template>
<!-- Responsive Table Wrapper -->
<div class="w-full overflow-x-auto bg-white rounded-xl shadow-md">
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
        <td class="px-4 py-3 flex flex-wrap gap-2 items-center border-b border-gray-100">
          <button class="text-indigo-600 hover:text-indigo-800 transition">
            <i class="fas fa-edit"></i>
          </button>
          <button class="text-green-600 hover:text-green-800 transition">
            <i class="fas fa-download"></i>
          </button>
          <button class="text-red-600 hover:text-red-800 transition">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

