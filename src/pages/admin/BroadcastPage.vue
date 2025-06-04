<script setup>
    import ToastEditor from '../../components/ToastEditor.vue'
    import { ref, onMounted } from 'vue'
    import { marked } from 'marked'
    import juice from 'juice'

import Modal from '../../components/admin/Modal.vue'

    import axios from 'axios'
    import { useToast } from 'vue-toastification'

    const toast = useToast()

    const message = ref('')
    const recipients = ref('')
    const subject = ref('')
    const toggler = ref( false )

    const toastRef = ref(null)

    const fields = ref([
    {
        name: 'Header',
        placeholder: 'Enter Email Header',
        res: ''
    },
    {
        name: 'Subject',
        placeholder: 'Enter Email Subject',
        res: ''
    },
    ])

    onMounted(() => { fetchStudents() })


async function fetchStudents(){
try{
    const res = await axios.get('/api/students')
    const data = res.data
    recipients.value = data.map(value => value.student_email)
    toggler.value = false
}catch(e){
    console.log(e)
}
}

// Converts markdown to HTML email to be used my mailer
function convertMarkdownToEmailHTML(markdownContent) {
    // Sample Tailwind prose styles (adjust as needed)
    const baseStyles = `
.prose {
  color: #374151;
  max-width: 65ch;
  font-weight: 400;
  line-height: 1.75;
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
}
.prose h1 {
  font-weight: 700;
  font-size: 2.25rem;
  line-height: 2.5rem;
  margin-top: 0;
  margin-bottom: 0.8889em;
  color: #111827;
}
.prose p {
  margin-top: 0;
  margin-bottom: 1em;
}
.prose strong {
  font-weight: 600;
  color: #111827;
}
.prose ul {
  list-style-type: disc;
  padding-left: 1.25em;
  margin-top: 0;
  margin-bottom: 1em;
}
.prose blockquote {
  border-left: 0.25rem solid #3b82f6;
  padding-left: 1em;
  color: #1e40af;
  font-style: italic;
  margin-top: 0;
  margin-bottom: 1em;
}
`
    ;

  const htmlContent = marked.parse(markdownContent);
  const wrapped = `<div class="prose">${htmlContent}</div>`;
  const inlined = juice.inlineContent(wrapped, baseStyles);
  return inlined;
}

async function formSubmit(){
if(toastRef.value){
    message.value = convertMarkdownToEmailHTML(toastRef.value.saveContent())
}
try{
    const res = await axios.post('/api/admin/mail', {
        message: message.value,
        recipients: recipients.value,
        header: fields.value[0].res,
        subject: fields.value[1].res,
    })
    if(res.status !== 200){
        throw new Error('Unable to Send Email')
    }
    toggler.value = false
    toast.success('Emails sent successfully...')
}catch(e){
    toast.error('Unable to create Module...')
}
}

function formClose(){
    toggler.value = false
}

function updateField(index, value){
fields.value[index].res = value
}

</script>

<template>
    <div>
            <div>
                <Modal v-if="toggler" :fields="fields" @update="updateField" @close="formClose"  @submit="formSubmit" >
                    <!-- The markdown editor stays here -->
                    <div class="col-span-2">
                        <ToastEditor ref="toastRef" />
                    </div>
                </Modal>
            </div>
        <div :class="[toggler ? 'blur' : '']">
            <div>
                <button @click="toggler = !toggler" class="bg-blue-500 py-2 text-white block col-start-2 ms-auto w-[200px] rounded">Send Email</button>
                <div class="flex gap-2 mt-4">
                    <input class="px-4 py-2 rounded-sm flex-1" placeholder="Enter topic Title" type="text"/>
                    <button class="px-4 py-2 bg-yellow-500 text-white rounded">Search</button>
                </div>
                <select class="px-4 py-2 mt-2 border rounded-sm">
                    <option>Latest</option>
                    <option>Active</option>
                    <option>Inactive</option>
                </select>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>





