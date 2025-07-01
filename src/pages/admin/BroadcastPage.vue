<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import axios from 'axios'
import { marked } from 'marked'
import juice from 'juice'
import ToastEditor from '../../components/ToastEditor.vue'
import Modal from '../../components/admin/Modal.vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const message = ref('')
const users = ref([])
const courses = ref([])

const sendMode = ref('all')
const selectedUser = ref(null)
const selectedUsers = ref([])
const selectedCourse = ref(null)

const toggler = ref(false)
const toastRef = ref(null)

const fields = ref([
  { name: 'Header', placeholder: 'Enter Email Header', res: '' },
  { name: 'Subject', placeholder: 'Enter Email Subject', res: '' },
])

onMounted(() => { fetchStudents() })

watch(toggler, (val) => {
  if (val) {
    sendMode.value = 'all'
    selectedUser.value = null
    selectedUsers.value = []
    selectedCourse.value = null
  }
})

async function fetchStudents() {
  try {
    const res = await axios.get('/api/students')
    users.value = res.data
    const uniqueCourses = Array.from(new Set(res.data.map(u => u.course_title)))
    courses.value = uniqueCourses.map((title, index) => ({ id: index, title }))
  } catch (e) {
    console.error('Failed to fetch students:', e)
  }
}

function convertMarkdownToEmailHTML(markdownContent) {
  const baseStyles = `
    body { font-family: Arial, sans-serif; background:#f4f4f4; margin:0; padding:0; color:#333; }
    table.container { max-width:600px; background:#fff; border-collapse:collapse; }
    td.content { padding: 2px  }
    h1 { font-size:22px; color:#111827; margin-bottom:16px; }
    p { font-size:16px; line-height:1.6; margin-bottom:12px; }
    ul { padding-left:20px; margin:12px 0; }
    strong { font-weight:bold; color:#111827; }
    blockquote { border-left:4px solid #3b82f6; padding-left:10px; color:#1e40af; font-style:italic; margin:12px 0; }
    a.button { display:inline-block; padding:12px 20px; margin:12px 0; background:#2563eb; color:#fff !important; text-decoration:none; border-radius:5px; font-weight:bold; }
  `;
  const htmlContent = marked.parse(markdownContent)
  return juice.inlineContent(
    `<table class="container"><tr><td class="content">${htmlContent}</td></tr></table>`,
    baseStyles
  )
}

async function formSubmit() {
  if (toastRef.value) {
    message.value = convertMarkdownToEmailHTML(toastRef.value.saveContent())
  }

  let recipients = []
  if (sendMode.value === 'all') {
    recipients = users.value.map(u => u.email)
  } else if (sendMode.value === 'single' && selectedUser.value) {
    recipients = [selectedUser.value.email]
  } else if (sendMode.value === 'selected' && selectedUsers.value.length) {
    recipients = selectedUsers.value.map(u => u.email)
  } else if (sendMode.value === 'course' && selectedCourse.value) {
    recipients = users.value
      .filter(u => u.course_title === selectedCourse.value.title)
      .map(u => u.email)
  } else if (sendMode.value === 'not_enrolled') {
    recipients = users.value.filter(u => u.is_enrolled === 0).map(u => u.email)
  }

  if (!recipients.length) {
    toast.error('Please select at least one recipient.')
    return
  }

  try {
    await axios.post('/api/admin/mail', {
      message: message.value,
      recipients,
      header: fields.value[0].res,
      subject: fields.value[1].res,
    })
    toggler.value = false
    toast.success('Emails sent successfully!')
  } catch (e) {
    console.error(e)
    toast.error('Failed to send emails.')
  }
}

function formClose() {
  toggler.value = false
}

function updateField(index, value) {
  fields.value[index].res = value
}

const recipientCount = computed(() => {
  if (sendMode.value === 'all') return users.value.length
  if (sendMode.value === 'single' && selectedUser.value) return 1
  if (sendMode.value === 'selected') return selectedUsers.value.length
  if (sendMode.value === 'course' && selectedCourse.value) {
    return users.value.filter(u => u.course_title === selectedCourse.value.title).length
  }
  if (sendMode.value === 'not_enrolled') {
    return users.value.filter(u => u.is_enrolled === 0).length
  }
  return 0
})
</script>

<template>
  <div>
    <Modal v-if="toggler" :fields="fields" @update="updateField" @close="formClose" @submit="formSubmit">
      <div class="col-span-2 space-y-4">

        <label class="block mb-1 font-semibold">Send to:</label>
        <select v-model="sendMode" class="border p-2 rounded w-full">
          <option value="all">All Users</option>
          <option value="single">Single User</option>
          <option value="selected">Selected Users</option>
          <option value="course">Users by Course</option>
          <option value="not_enrolled">Users Not Enrolled</option>
        </select>

        <!-- Single user -->
        <div v-if="sendMode === 'single'">
          <label class="block mb-1 font-semibold">Select user:</label>
          <select v-model="selectedUser" class="border p-2 rounded w-full">
            <option v-for="user in users" :key="user.email" :value="user">{{ user.email }}</option>
          </select>
        </div>

        <!-- Multiple users -->
        <div v-if="sendMode === 'selected'">
          <label class="block mb-1 font-semibold">Select users:</label>
          <select v-model="selectedUsers" multiple class="border p-2 rounded w-full h-40">
            <option v-for="user in users" :key="user.email" :value="user">{{ user.email }}</option>
          </select>
        </div>

        <!-- By course -->
        <div v-if="sendMode === 'course'">
          <label class="block mb-1 font-semibold">Select course:</label>
          <select v-model="selectedCourse" class="border p-2 rounded w-full">
            <option v-for="c in courses" :key="c.id" :value="c">{{ c.title }}</option>
          </select>
        </div>

        <!-- Markdown editor -->
        <ToastEditor ref="toastRef" />

        <!-- Recipient count -->
        <div class="text-sm text-gray-600">Recipients: {{ recipientCount }}</div>
      </div>
    </Modal>

    <div :class="[toggler ? 'blur' : '']">
      <div class="text-center mt-20">
        <button @click="toggler = true" class="bg-blue-500 py-2 px-4 text-white rounded">
          Send Email
        </button>
        <div class="text-2xl mt-10 font-semibold">
          SEND A BROADCAST MAIL TO USERS...
        </div>
      </div>
    </div>
  </div>
</template>
