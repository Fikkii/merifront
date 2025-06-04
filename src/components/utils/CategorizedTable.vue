<script setup>
import { computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  }
})

function groupByCategory(data) {
  const grouped = {}

  data.forEach(item => {
    if (!grouped[item.course_title]) {
      grouped[item.course_title] = []
    }

    grouped[item.course_title].push({
      id: item.id,
      ...item
    })
  })

  // Convert to desired structure
  return Object.entries(grouped).map(([category, data]) => ({
    category,
    data
  }))
}

const data = computed(() => { return groupByCategory(props.items) })

function handleDropdown(id) {
  console.log('Dropdown action for row:', id)
}

</script>

<template>
  <div class="space-y-10 mt-10">
      <div
              v-for="(category, index) in data"
              :key="index"
              class="w-full overflow-x-auto rounded shadow-sm"
              >
              <!-- Category Title -->
          <div class="text-lg font-semibold text-indigo-600 px-4 py-2 border-b">
              {{ category.category }}
              <span class="text-[10px] rounded bg-black text-blue-100 px-2 ml-2">Course</span>
          </div>

          <!-- Table -->
          <table class="w-full text-left border border-collapse">
              <thead class="bg-gray-400 text-white text-sm capitalize">
                  <tr>
                      <th class="px-4 py-2">S/N</th>
                      <th
                              v-for="(key, i) in Object.keys(category.data[0])"
                              :key="i"
                              class="px-4 py-2"
                              >
                              {{ key }}
                      </th>
                          <th class="px-4 py-2">Actions</th>
                  </tr>
              </thead>
              <tbody>
                  <tr
                          v-for="(row, rowIndex) in category.data"
                          :key="rowIndex"
                          class="hover:bg-gray-50 border-t"
                          >
                          <td class="px-4 py-2">{{ rowIndex + 1 }}</td>
                          <td
                                  v-for="(key, colIndex) in Object.keys(category.data[0])"
                                  :key="colIndex"
                                  class="px-4 py-2"
                                  >
                                  {{ row[key] }}
                          </td>
                              <td class="px-4 py-2">
                                  <Dropdown @dropclick="() => handleDropdown(row)" />
                              </td>
                  </tr>
              </tbody>
          </table>
      </div>
  </div>
</template>

<style scoped>
</style>
