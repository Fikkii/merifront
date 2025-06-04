<script setup>
    import { defineEmits, ref } from 'vue'

    const emits = defineEmits(['toggle'])
    const toggle = ref(false)

    function handleToggle(){
        emits('toggle', toggle.value)
        toggle.value = !toggle.value
    }
</script>

<template>
  <!-- Header -->
  <header
    class="bg-white px-8 py-4 shadow-md flex justify-between items-center sticky top-0 z-[100]"
  >
    <div class="flex items-center">
      <button
        class="block bg-none border-none text-2xl cursor-pointer mr-4"
        aria-label="Toggle menu"
        @click="handleToggle"
      >
        <i class="fas fa-bars"></i>
      </button>
      <h1 id="page-title" class="text-2xl font-semibold text-gray-800">
        Dashboard
      </h1>
    </div>

    <div class="hidden flex items-center gap-5">
      <div class="relative flex items-center">
        <i class="fas fa-search absolute left-3 text-gray-400"></i>
        <input
          type="text"
          placeholder="Search..."
          class="pl-10 pr-3 py-2 border border-gray-300 rounded-full w-[250px] outline-none transition
                 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      <div class="relative cursor-pointer">
        <i class="fas fa-bell text-lg text-gray-600"></i>
        <span
          class="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4.5 h-4.5 text-[10px]
                 flex items-center justify-center"
          >3</span
        >
      </div>

      <div
        class="flex items-center gap-2.5 cursor-pointer rounded-full px-3 py-1.5 transition
               hover:bg-gray-100"
      >
        <img
          src="https://via.placeholder.com/40"
          alt="Admin"
          class="w-[35px] h-[35px] rounded-full object-cover"
        />
        <span>Admin</span>
        <i class="fas fa-chevron-down"></i>
      </div>
    </div>
  </header>
</template>

