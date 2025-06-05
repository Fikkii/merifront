<script setup>
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'

const loading = ref(true)
const router = useRouter()

onMounted(() => {
  loading.value = false // Initial load complete

  router.beforeEach((to, from, next) => {
    loading.value = true
    next()
  })

  router.afterEach(() => {
    setTimeout(() => {
      loading.value = false
    }, 600) // Small delay to show loader smoothly
  })
})
</script>

<template>
    <div>
        <div class="absolute h-screen w-screen grid place-items-center z-10000" v-if="loading"><img class="w-auto h-10" src="../assets/loader.gif"/></div>
        <RouterView :class="[loading ? 'blur' : '']"></RouterView>
    </div>
</template>

<style scoped>

</style>
