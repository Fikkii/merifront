<script setup>
import { computed, ref, watch, defineEmits } from 'vue'

const emits = defineEmits(['delete', 'edit'])

const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  }
})

const searchInput = ref(null)
const filteredData = ref(null)

watch(searchInput, (newVal) => {
    filteredData.value = filterDataByTitle(data.value, newVal)
    console.log(filteredData)
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

const data = computed(() => {return groupByCategory(props.items) })

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

function handleChange(){
    console.log(searchInput.value)
}

function filterDataByTitle(data, searchString) {
  if (!searchString) return data; // no filter if empty search

  const lowerSearch = searchString.toLowerCase();

  return data
    .map(group => {
      // Filter items in group.data where any _title property matches search
      const filteredItems = group.data.filter(item => {
        return Object.entries(item).some(([key, value]) => {
          return key.endsWith('_title') && value.toLowerCase().includes(lowerSearch);
        });
      });

      // Return group with filtered data only if there are matches
      return { 
        ...group,
        data: filteredItems 
      };
    })
    // Remove groups that have no matching items
    .filter(group => group.data.length > 0);
}

const filtered_data = filterDataByTitle(data.value, 'introduction')
console.log(filtered_data)

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

    <!-- Responsive Table Wrapper -->
    <div v-for="(category, index) in (filteredData ? filteredData : data)" :key="index" class="w-full overflow-x-auto bg-white rounded-xl shadow-2xl">
        <div class="text-lg font-semibold text-indigo-600 px-4 py-2 border-b">
            {{ category.category }}
            <span class="text-[10px] rounded bg-black text-blue-100 px-2 ml-2">Course</span>
        </div>
        <table class="min-w-full table-auto text-left border-collapse">
            <thead class="bg-gray-100">
                <tr>
                    <th
                            v-for="(key, i) in Object.keys(category.data[0])"
                            :key="i"
                            class="px-4 py-3 text-sm font-semibold text-gray-700 capitalize border-b border-gray-200 whitespace-nowrap"
                            >
                            {{ key }}
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
                                v-for="(key, colIndex) in Object.keys(category.data[0])"
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

<style scoped>
</style>
