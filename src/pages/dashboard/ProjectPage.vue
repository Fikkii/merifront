<script setup>
    import { ref, onMounted, nextTick, watch } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import { marked } from 'marked'
    import axios from 'axios'
    import hljs from 'highlight.js'

    import ModuleList from '../../components/ModuleList.vue'
    import Modal from '../../components/admin/Modal.vue'

    //User Store Import
    import { useUserStore } from '../../store/user.js'

    import 'highlight.js/styles/github-dark.css' // ✅ Ensure this path is correct

    import { useToast } from 'vue-toastification'

    const toast = useToast()

    marked.setOptions({
      highlight(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
          return hljs.highlight(code, { language: lang }).value
        }
        return hljs.highlightAuto(code).value
      },
      langPrefix: 'hljs language-'
    })

    const props = defineProps(['id'])

    const project = ref(null)

    //handles Toggle
    const toggler = ref(null)

    // Input Field
    const fields = ref([
    {
        name: 'file_link',
        placeholder: 'Paste the google link to the file',
        res: '',
        type: 'text'
    },
    ])

    const router = useRouter()
    const routes = useRoute()

    watch(() => routes.params.id, (newVal, oldVal) => {
      fetchProject()
    });

    async function fetchProject(){
        const res = await axios.get(`/api/student/project?projectId=${props.id}`)

        project.value = res.data.project
    }

    onMounted(async () => {fetchProject()})

    async function handleComplete(){
        router.push({ name: 'learning' })
    }

function handleToggle(){
    toggler.value = true
}

async function formSubmit(formData){
    formData.append('projectId', routes.params.id)
    const jsonData = Object.fromEntries(formData)
    console.log(jsonData)
    try{
        const res = await axios.post(`/api/grade/`, jsonData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })


        toast.success('Project has been submitted successfully...')
    }catch(e){
        console.log(e)
        toast.error('Unable to create Module...')
    } finally {
        toggler.value = false
    }

}

function formClose(){
    toggler.value = false
}

function updateField(index, value){
    if(editId.value){
        editFields.value[index].res = value
    }else{
        fields.value[index].res = value
    }
}
</script>

<template>
    <div v-if="project">
        <div>
            <Modal v-if="toggler" :fields="fields" @update="updateField" @close="formClose" @submit="formSubmit" ></Modal>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 md:5 lg:gap-20 items-start">
            <div class="col-span-2">
                <div class="flex gap-2">
                    <button class="text-indigo-500 px-[20px] py-[12px] font-bold rounded"><i class="ri-arrow-left-line"></i>Go Back</button>
                    <button @click="handleToggle" class="bg-indigo-500 hover:bg-indigo-600 px-[20px] py-[12px] font-bold text-white shadow rounded">Submit Project</button>
                    <button class="border border-gray-500 px-[20px] py-[12px] font-bold text-indigo-500 shadow rounded"><i class="ri-share-line"></i>Share Project</button>
                </div>
                <div class="text-xl mb-4 text-blue-800 font-bold mt-5 uppercase"><i class="ri-stack-fill">CAPSTONE PROJECT --/ </i>{{ project.title }} </div>
                <div class="prose md:prose-md sm:prose-sm min-w-full">{{ project.instructions }}</div>
            </div>
        </div>
    </div>
    <div v-else>
        Loading...
    </div>
</template>

<style scoped>
.video-container {
    aspect-ratio: 16 / 9;
    width: 100%;
    max-width: 640px;
}
iframe {
    width: 100%;
    height: 100%;
}
</style>


