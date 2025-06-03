<script setup>
    import { defineEmits, ref } from 'vue'

    const emits = defineEmits(['dropclick'])

    const details = ref(null)

    const actions = ref([
        {
            name: 'Delete',
            action: 'delete',
        },
        {
            name: 'Edit',
            action: 'edit',
        },
        {
            name: 'Update',
            action: 'update',
        },
    ])


    function handleClick(e){
        details.value.open = false
        emits('dropclick', e.target.id)
    }
    
</script>

<template>
    <details ref="details" class="relative font-bold text-md">
        <summary class="bg-blue-500 text-white m-1 rounded px-2 py-1"><i class="ri-more-2-fill"></i></summary>
        <ul class="px-2 z-10 py-1 absolute bottom-0 right-10 bg-white w-40 border rounded">
            <li v-for="action in actions" :key="action.name" class="hover:bg-blue-500 py-1 rounded-sm px-2">
                <button class="w-full text-left" :id='action.name' @click="handleClick">{{ action.name }}</button>
            </li>
        </ul>
    </details>
</template>

<style scoped>
details {
    display: inline-block;
}
summary {
    list-style: none
}
</style>
