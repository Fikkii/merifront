<script setup>
    import { ref, computed } from 'vue'
    const props = defineProps({
        items: {
            type: Array,
            required: true,
            default: []
        }
    })

    const columns = computed(() => {
        if (!Array.isArray(props.items) || props.items.length === 0) return []
        return Object.keys(props.items[0])
    })
    
function handleDropdown(id){
    console.log(id)
}

</script>

<template>
    <div class="w-full overflow-x-auto mt-10">
        <table class="w-full text-left border border-collapse">
            <thead class="bg-gray-300 font-semibold text-gray-700">
                <tr class="capitalize text-left">
                    <th v-for="(col, index) in columns" class="px-4 py-2">{{ col }}</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, rowIndex) in items" :key="rowIndex">
                  <td v-for="(key, colIndex) in columns" :key="colIndex" class="px-4 py-2">
                    {{ row[key] }}
                  </td>
                   <td><Dropdown @dropclick="handleDropdown" /></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
    
</style>

