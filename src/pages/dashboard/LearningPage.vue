<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import PaystackButton from '../admin/PaystackButton.vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'

import Leaderboard from '../../components/Leaderboard.vue'
import QuickBar from "../../components/dashboard/QuickBar.vue"
import ModuleList from '../../components/ModuleList.vue'

const toast = useToast()

const currentCourse = ref('')
const availableCourse = ref('')
const selectedCourse = ref('')
const selectedCourseAmount = ref('')
const email = ref('')

async function submitOnboarding() {
  try {
    const payload = {
      fullname: fullname.value,
      phone: phone.value,
      heardFrom: heardFrom.value,
      occupation: finalOccupation.value
    }

    await axios.post('/api/student/onboarding', payload)
    toast.success("Details saved! Redirecting to payment...")
    return true
  } catch (error) {
    toast.error("Failed to save info. Please try again.")
    return false
  }
}

// Onboarding fields
const fullname = ref('')
const phone = ref('')
const heardFrom = ref('')
const occupation = ref('')
const customOccupation = ref('') // For "Other"

const finalOccupation = computed(() => {
  return occupation.value === 'Other' ? customOccupation.value : occupation.value
})

// Form complete check
const formComplete = computed(() =>
  fullname.value &&
  phone.value &&
  heardFrom.value &&
  finalOccupation.value
)

watch(selectedCourse, () => {
  fetchDetails()
})

onMounted(() => {
  fetchUserCourse()
})

async function fetchCourse() {
  try {
    const res = await axios.get('/api/courses')
    if (res.status == 200) {
      availableCourse.value = res.data
    }
  } catch (e) {
    console.error('Caught error:', e)
  }
}

async function fetchUserCourse() {
  try {
    const res = await axios.get('/api/student/course')
    if (res.status == 200) {
      currentCourse.value = res.data.course
    }
  } catch (e) {
    console.error('Caught error:', e)
    fetchCourse()
  }
}

async function fetchDetails() {
  try {
    const course = availableCourse.value.find(c => c.id == selectedCourse.value)
    const user = await axios.get('/api/student/me')
    email.value = user.data.email
    selectedCourseAmount.value = course.price * 0.1
  } catch (e) {
    console.error('Caught error:', e)
    fetchCourse()
  }
}
</script>

<template>
  <div class="w-full">
    <QuickBar />

    <!-- If user is enrolled -->
    <div v-if="currentCourse" class="py-8">
      <div class="flex flex-wrap gap-2">
        <ModuleList />
        <div class="flex-1">
          <Leaderboard />
        </div>
      </div>
    </div>

    <!-- If NOT enrolled -->
    <div v-else-if="availableCourse" class="mt-6 max-w-4xl mx-auto px-4">
      <h2 class="text-2xl font-bold mb-4 text-center">Choose a Course</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <label
          v-for="course in availableCourse"
          :key="course.id"
          class="flex items-center justify-between gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:border-blue-400 hover:bg-blue-50"
          :class="selectedCourse === course.id ? 'bg-blue-100 border-blue-500 shadow-md' : 'bg-white border-gray-300'"
        >
          <div class="flex items-center gap-3 text-left">
            <input
              type="radio"
              :value="course.id"
              name="course"
              v-model="selectedCourse"
              class="form-radio text-blue-600 h-5 w-5"
            />
            <span class="text-sm font-medium text-gray-800">{{ course.title }}</span>
          </div>
        </label>
      </div>

      <!-- Onboarding Form -->
      <div v-if="selectedCourse" class="bg-white p-6 rounded-lg shadow-md space-y-4 mb-6">
        <h3 class="text-lg font-semibold mb-2">Before we enroll you, tell us a bit about yourself</h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Full Name -->
          <div>
            <label class="block mb-1 text-sm font-medium">Full Name</label>
            <input v-model="fullname" type="text" class="w-full border px-3 py-2 rounded-md" />
          </div>

          <!-- Phone Number -->
          <div>
            <label class="block mb-1 text-sm font-medium">Phone Number</label>
            <input v-model="phone" type="tel" class="w-full border px-3 py-2 rounded-md" />
          </div>

          <!-- Heard From -->
          <div>
            <label class="block mb-1 text-sm font-medium">How did you hear about us?</label>
            <select v-model="heardFrom" class="w-full border px-3 py-2 rounded-md">
              <option value="">Select One</option>
              <option>Instagram</option>
              <option>Twitter</option>
              <option>WhatsApp</option>
              <option>Facebook</option>
              <option>Google</option>
              <option>Friend / Referral</option>
              <option>Other</option>
            </select>
          </div>

          <!-- Occupation -->
          <div>
            <label class="block mb-1 text-sm font-medium">Occupation</label>
            <select v-model="occupation" class="w-full border px-3 py-2 rounded-md">
              <option value="">Select Occupation</option>
              <option>Student</option>
              <option>Graduate</option>
              <option>Tech Professional</option>
              <option>Freelancer</option>
              <option>Entrepreneur</option>
              <option>Civil Servant</option>
              <option>Teacher / Lecturer</option>
              <option>Stay-at-home</option>
              <option>NYSC Member</option>
              <option>Job Seeker</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <!-- Custom Occupation Input -->
        <div v-if="occupation === 'Other'">
          <label class="block mt-4 mb-1 text-sm font-medium">Please specify your occupation</label>
          <input v-model="customOccupation" type="text" class="w-full border px-3 py-2 rounded-md" />
        </div>
      </div>

      <!-- Paystack Button -->
      <PaystackButton
              v-if="formComplete"
              :course="selectedCourse"
              :email="email"
              :amount="selectedCourseAmount"
              :metadata="{
                         fullname: fullname,
                         phone: phone,
                         heardFrom: heardFrom,
                         occupation: finalOccupation
                         }"
              @click="submitOnboarding"
              >Enroll</PaystackButton>

      <p v-else class="text-sm text-red-500">Please complete all fields to proceed.</p>
    </div>
  </div>
</template>

