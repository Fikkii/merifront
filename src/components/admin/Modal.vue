<script setup>
import { defineEmits, onMounted, ref, watch } from 'vue'

// Preloader gif
import loader from '../../assets/loader.gif'

// Import all modules and courses (unfiltered)
import { fetchCourses, fetchModules } from '../../controllers/controller.js'

const props = defineProps(['fields', 'edit'])
const emit = defineEmits(['update', 'close', 'submit'])

// Loading state for modules
const moduleLoading = ref(false)

// All fetched data (we'll filter inside the component)
const allCourses = ref([])
const allModules = ref([])

// Handle input updates
function onInputChange(index, event) {
  emit('update', index, event.target.value)

  const field = props.fields[index]
  if (field.name === 'courseId') {
    updateModuleOptions(field.res)
  }
}

// Handle submit and close
function handleClose() {
  emit('close', true)
}

function handleSubmit(e) {
  const formData = new FormData()
  props.fields.forEach(value => formData.append(value.name, value.res))
  e.target.innerHTML = `<img width="20" src="${loader}">`
  emit('submit', formData)
}

// Populate selection options
onMounted(async () => {
  allCourses.value = await fetchCourses()
  allModules.value = await fetchModules()

  props.fields.forEach((field) => {
    if (field.name === 'courseId') {
      field.options = allCourses.value
    }

    if (field.name === 'moduleId') {
      // Initially empty until a course is selected
      field.options = []
    }
  })
})

// Update module options when course is selected
async function updateModuleOptions(courseId) {
  moduleLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 300)) // Small delay to show loader

  const moduleField = props.fields.find(f => f.name === 'moduleId')
  if (moduleField) {
    moduleField.options = allModules.value.filter(m => m.course_id == courseId)
    moduleField.res = '' // reset selection
  }

  moduleLoading.value = false
}
</script>

<template>
  <!-- Modal -->
  <div class="fixed z-[2000] inset-0 bg-opacity-50 flex items-start justify-center overflow-auto py-8">
    <div class="bg-white rounded-xl w-[90%] max-w-lg shadow-2xl max-h-[600px] overflow-y-auto">

      <!-- Modal Header -->
      <div class="flex justify-between items-center px-6 py-5 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-800">Form</h3>
        <button class="text-gray-400 hover:text-gray-700 text-2xl font-bold" @click.prevent="handleClose">
          &times;
        </button>
      </div>

      <!-- Modal Body -->
      <div class="p-6">
        <form>
          <div>
            <div v-for="(field, index) in props.fields" :key="index" class="mb-5">
              <div>
                <label v-if="field.type != 'select'" :for="field.name" class="block mb-2 font-medium text-gray-700">{{ field.name }}</label>

                <!-- Input field -->
                <input v-if="field.type !== 'select' && field.type !== 'textarea'"
                  :id="field.name"
                  :type="field.type || 'text'"
                  :placeholder="field.placeholder"
                  :value="field.res"
                  @input="event => onInputChange(index, event)"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500" />

                <!-- Textarea -->
                <textarea v-if="field.type == 'textarea'"
                  :id="field.name"
                  :placeholder="field.placeholder"
                  :value="field.res"
                  @input="event => onInputChange(index, event)"
                  class="w-full px-4 py-3 border col-span-2 border-gray-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                </textarea>
              </div>

              <!-- Dynamic Select -->
              <div v-if="field.type == 'select'">
                <label :for="field.name" class="block mb-2 font-medium text-gray-700">{{ field.name }}</label>
                
                <!-- Show loader if module is loading -->
                <div v-if="field.name === 'moduleId' && moduleLoading" class="text-sm text-blue-500 mb-2">
                  <img :src="loader" width="18" class="inline-block mr-2" />
                  Loading modules...
                </div>

                <select
                  :disabled="field.name === 'moduleId' && !props.fields.find(f => f.name === 'courseId')?.res"
                  :value="field.res"
                  @input="event => onInputChange(index, event)"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option disabled value="">-- Select --</option>
                  <option :id="opt.id" v-for="opt in field.options" :key="opt.id" :value="opt.id">{{ opt.title }}</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Optional Slot -->
          <div>
            <slot />
          </div>

          <!-- Actions -->
          <div class="flex justify-end gap-3 mt-6">
            <button
              @click.prevent="handleSubmit"
              class="bg-indigo-500 text-white px-5 py-2 rounded hover:bg-indigo-600 transition">
              {{ edit ? 'Edit' : 'Submit' }}
            </button>
            <button
              @click.prevent="handleClose"
              class="bg-gray-300 text-gray-700 px-5 py-2 rounded hover:bg-gray-400 transition">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

