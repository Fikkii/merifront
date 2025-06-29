<template>
  <div class="relative inline-block w-64">
    <!-- Trigger button -->
    <button @click="open = !open" class="border px-4 py-2 w-full bg-white text-left rounded shadow">
        {{ (modelValue || []).length ? modelValue.join(', ') : 'Select options' }}
    </button>

    <!-- Modal dropdown -->
    <div
      v-if="open"
      class="absolute mt-1 w-full border bg-white rounded shadow z-50 max-h-60 overflow-auto"
    >
      <label
        v-for="option in options"
        :key="option"
        class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
      >
        <input
          type="checkbox"
          :value="option"
          :checked="(modelValue || []).includes(option)"
          @change="toggle(option)"
        />
        {{ option }}
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: Array,
    default: [],
  },
})

const emit = defineEmits(['update:modelValue'])

let open = ref(false)

function toggle(option) {
  const newValue = Array.isArray(props.modelValue) ? [...props.modelValue] : []
  const index = newValue.indexOf(option)

  if (index >= 0) {
    newValue.splice(index, 1)
  } else {
    newValue.push(option)
  }

  emit('update:modelValue', newValue)
}

</script>

