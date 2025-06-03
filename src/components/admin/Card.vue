<script setup>
    import { defineProps } from "vue"

    const props = defineProps({
        name: {
            type: String,
            default: "Title"
        },
        total: {
            type: String,
            default: "Digit"
        },
        color: {
            type: Number,
            default: 0
        },
    })

</script>

<template>
    <div :style="{backgroundColor: props.color}" class="bg-violet-500 rounded text-white shadow-sm">
      <div class="grid md:grid-cols-2 px-3 py-6 shadow justify-between">
          <h2 class="text-2xl text-white">{{props.name}}</h2>
      <div class="text-lg font-bold ms-auto flex">
          <i :class="$attrs.icon" class="text-5xl opacity-40"></i> 
          <span>{{props.total}}</span>
      </div>
      <button class="px-4 py-2 rounded-sm shadow-lg text-white col-start-2 border">Show More</button>
  </div>
</div>
</template>

<style scoped>

</style>

