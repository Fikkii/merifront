<script setup>
    import { defineEmits } from 'vue'
    const props = defineProps(['fields'])

    const emit = defineEmits(['update', 'close', 'submit'])
    console.log(props.fields[0].res)

    function onInputChange(index, event){
        emit('update', index, event.target.value)
    }

    function handleClose(){
        emit('close', true)
    }
    
    function handleSubmit(){
        emit('submit', true)
    }
    
</script>

<template>
    <div class="rounded z-9 w-65 md:w-150 px-4 py-2 z-100 md:px-12 md:py-6 bg-white shadow rounded md:grid md:grid-cols-2 gap-2">
        <div class="col-span-2">
            <h2 class="prose prose-lg">Create</h2>
            <i class="prose opacity-50">Enter the following details to insert new record</i>
        </div>
        <div v-for="(field, index) in props.fields">
            <label class="block mb-1 text-gray-700">{{ fields.name }}</label>
            <input
                    :id="field.name"
                    :placeholder="field.placeholder"
                    :value="field.res"
                    @input="event => onInputChange(index, event)"
                    required
                    class="w-full px-4 py-2 border rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
        </div>
        <slot />
        <div class="col-start-2 mt-2 text-right">
            <button @click="handleSubmit" class="bg-indigo-500 py-2 text-white inline-block col-start-2 me-2 w-[100px] rounded">Add</button>
            <button @click="handleClose" class="bg-indigo-500 py-2 text-white inline-block col-start-2 ms-auto w-[100px] rounded">Cancel</button>
        </div>
    </div>

</template>

<style scoped>

</style>

