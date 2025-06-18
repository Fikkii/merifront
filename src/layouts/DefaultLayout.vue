<script setup>
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'

    import HeaderSection from '../components/HeaderSection.vue'

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
        <div class="absolute h-screen w-screen grid place-items-center z-10000" v-if="loading">
            <img class="w-auto h-10" src="../assets/loader.gif"/>
        </div>

        <div class="max-w-full flex flex-col ">
            <HeaderSection />
            <RouterView :class="[loading ? 'blur' : '']"></RouterView>
        </div>
    </div>
</template>

<style scoped>

</style>
