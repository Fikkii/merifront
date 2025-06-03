<script setup>
    import { onMounted, watch, ref } from 'vue'
    import PaystackButton from '../admin/PaystackButton.vue'
    import axios from 'axios'
    import { useToast } from 'vue-toastification'

    const toast = useToast()

    const currentCourse = ref('')
    const availableCourse = ref('')
    const selectedCourse = ref('')
    const selectedCourseAmount = ref('')
    const email = ref('')

const isLoading = ref(false)

watch(selectedCourse, ()=> {
    fetchDetails()
    setTimeout(() => {
        
    }, 5000)
})

onMounted(() => fetchUserCourse())

async function fetchCourse() {
  try {
    const res = await axios.get('/api/courses')

    if (res.status == 200) {
        const data = await res.data
        availableCourse.value = data
        console.log(data)
    }
  } catch (e) {
    isLoading.value = false
    console.error('Caught error:', e);
  }
}
    

async function fetchUserCourse() {
  try {
    const res = await axios.get('/api/student/course')

    if (res.status == 200) {
        const data = await res.data
        currentCourse.value = data.course
        console.log(data)
    }
  } catch (e) {
    isLoading.value = false
    console.error('Caught error:', e);
    toast.error(e.message)
    fetchCourse()
  }
}

async function fetchDetails(amount){
  try {
      const singleCourse = availableCourse.value.filter(value => value.id == selectedCourse.value)
      const user = await axios.get('/api/student/me')
      email.value = user.data.email
      selectedCourseAmount.value = singleCourse[0].amount
  } catch (e) {
    isLoading.value = false
    toast.error(e.message)
    console.error('Caught error:', e);
    fetchCourse()
  }
}


</script>

<template>
    <div v-if="currentCourse" class="max-w-4xl mx-auto px-4 py-8">
        <h2 class="text-2xl font-bold mt-6 text-center">Learning Path</h2>
        <div class="bg-blue-50 mt-2 p-3 px-6 rounded border border-3 border-white shadow" v-for="(module, index) in currentCourse.modules">
            <div class="font-bold border-b-2 pb-3">Module {{ index + 1 }}: {{ module.title }} </div>
            <div class="my-2 p-2 px-4 rounded bg-blue-100" v-for="topic in module.topics">
                <RouterLink :to="{ name: 'topic', params: { id: topic.id } }">
                    <div v-if="topic.completed" class="text-right">
                        <i class="ri-checkbox-circle-fill text-lg text-green-800"></i>
                    </div>
                    <div v-else class="text-lg text-right">
                        <i class="ri-checkbox-blank-circle-line"></i>
                    </div>
                    <span>{{ topic.title }}</span>
                </RouterLink>
            </div>
        </div>
    </div>

    <div v-else class="mt-3">
        <h2 class="text-2xl font-bold mb-6 text-center">Pick a Category</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <label
                v-for="course in availableCourse"
                :key="course.id"
                class="flex items-center justify-between gap-4 p-4 rounded-2xl border cursor-pointer transition-all duration-200
                hover:border-blue-400 hover:bg-blue-50
                "
                :class="selectedCourse === course.id ? 'bg-blue-100 border-blue-500 shadow-md' : 'bg-white border-gray-300'"
                >
                <!-- Left: Radio + Label -->
                <div class="flex items-center gap-3 text-left">
                    <input
                    type="radio"
                    :value="course.id"
                    name="course"
                    v-model="selectedCourse"
                    class="form-radio text-blue-600 h-5 w-5"
                    />
                    <span class="text-sm sm:text-base font-medium text-gray-800">
                        {{ course.title }}
                    </span>
                </div>
            </label>
        </div>
        <PaystackButton :course="selectedCourse" :email="email" :amount="selectedCourseAmount">Enroll</PaystackButton>
    </div>
</template>
<style scoped>

</style>

