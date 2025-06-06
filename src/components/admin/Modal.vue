<script setup>
import { defineEmits, onMounted } from 'vue'

//import controllers for data fetching
import { fetchCourses, fetchModules } from '../../controllers/controller.js'
const props = defineProps(['fields'])

const emit = defineEmits(['update', 'close', 'submit'])

function onInputChange(index, event){
    emit('update', index, event.target.value)
}

function handleClose(){
    emit('close', true)
}

function handleSubmit(){
    const formData = new FormData()
    props.fields.forEach(value => formData.append(value.name, value.res))
    emit('submit', formData)
}

//Populating selection options on mounted...
onMounted(() => {
    props.fields.forEach(async (value) => {
        switch(value.name){
            case 'courseId': 
                const courses = await fetchCourses()
                value.options = courses
                break;
            case 'moduleId': 
                const modules = await fetchModules()
                value.options = modules
                break;
        }
    })
})
</script>

<template>
    <!-- Modal -->
    <div class="fixed z-[2000] inset-0 bg-opacity-50 flex items-start justify-center overflow-auto py-8">
        <div class="bg-white rounded-xl w-[90%] max-w-lg shadow-2xl max-h-[600px] overflow-y-auto">

            <!-- Modal Header -->
            <div class="flex justify-between items-center px-6 py-5 border-b border-gray-200">
                <h3 class="text-lg font-semibold text-gray-800">Add New Course</h3>
                <button class="text-gray-400 hover:text-gray-700 text-2xl font-bold" @click.prevent="handleClose">
                    &times;
                </button>
            </div>

            <!-- Modal Body -->
            <div class="p-6">
                <form>
                    <!-- Optional slot -->
                    <div>
                        <slot />
                    </div>

                    <div v-for="(field, index) in props.fields" :key="index" class="mb-5">
                        <label v-if="field.type != 'select'" :for="field.name" class="block mb-2 font-medium text-gray-700">{{ field.name }}</label>
                        <input v-if="field.type !== 'select'"
                               :id="field.name"
                               :type="field.type || 'text'"
                               :placeholder="field.placeholder"
                               :value="field.res"
                               @input="event => onInputChange(index, event)"
                               required
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                               />

                               <!-- Dynamic Select -->
                               <div v-if="field?.type == 'select'" class="mt-3">
                                   <label :for="field.name" class="block mb-2 font-medium text-gray-700">{{ field.name }}</label>
                                   <select 
                                                            @input="event => onInputChange(index, event)"
                                                            :value="field.res"
                                                            class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            >
                                                            <option :id="opt.id" v-for="opt in field.options" :value="opt.id">{{ opt.title }}</option>
                                   </select>
                               </div>
                    </div>

                    <!-- Actions -->
                    <div class="flex justify-end gap-3 mt-6">
                        <button
                                @click.prevent="handleSubmit"
                                class="bg-indigo-500 text-white px-5 py-2 rounded hover:bg-indigo-600 transition"
                                >
                                Add
                        </button>
                            <button
                                    @click.prevent="handleClose"
                                    class="bg-indigo-500 text-white px-5 py-2 rounded hover:bg-indigo-600 transition"
                                    >
                                    Cancel
                            </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

