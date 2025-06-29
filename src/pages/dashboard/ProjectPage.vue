<script setup>
    import { ref, onMounted, nextTick, watch } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import { marked } from 'marked'
    import axios from 'axios'
    import hljs from 'highlight.js'

    import ModuleList from '../../components/ModuleList.vue'

    import ProgressBar from '../../components/ProgressBar.vue'
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
    const project_report = ref(null)

    const hint = ref(null)

    //handles Toggle
    const toggler = ref(null)

    const show_report = ref(null)
    const full_report = ref(false)

    // Input Field
    const fields = ref([
    {
        name: 'file_type',
        placeholder: 'Paste the google link to the file',
        res: '',
        type: 'select',
        options: [
            {
                id: 'html',
                title: 'html'
            },
            {
                id: 'python',
                title: 'python'
            },
            {
                id: 'ipynb',
                title: 'ipynb'
            }
        ],
    },
    {
        name: 'file_link',
        placeholder: 'Select file type',
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
        hint.value = marked.parse(res.data.project.project_hint)

        //Check if user has been evaluated already...
        if(res.data.project.evaluation){
            project_report.value = res.data.project.evaluation
            show_report.value = true
        }
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

        if(res.status == 200){
            const data = res.data
            fetchProject()
            show_report.value = true
        }

        toast.success('Project has been submitted successfully...')
    }catch(e){
        console.log(e)
        toast.error(e.message)
    } finally {
        toggler.value = false
    }

}

function formClose(){
    toggler.value = false
}

function updateField(index, value){
        fields.value[index].res = value
}

function handleFullReport(){
        full_report.value = !full_report.value
}


</script>

<template>
    <div v-if="project">
        <div v-if="show_report" class="my-5">
            <div class="flex justify-between align-item-center mb-3">
                <div class="bg-green-50 text-green-500 font-bold">Very Good</div>
                <div>
                    <div class="flex gap-1 items-center">
                        <i class="ri-star-fill text-orange-300 text-lg"></i>
                        <i class="ri-star-fill text-orange-300 text-lg"></i>
                        <i class="ri-star-fill text-orange-300 text-lg"></i>
                        <i class="ri-star-fill text-orange-300 text-lg"></i>
                        <i class="ri-star-fill text-orange-300 text-lg"></i>
                        <span class="font-bold">{{ project_report.score}} out of 100</span>
                    </div>
                </div>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2 mb-3 overflow-hidden">
                <div class="bg-green-500 h-full rounded-full" :style="{width: project_report.score + '%'}"></div>
            </div>

            <!-- This button toggles Full Report -->
            <button @click="handleFullReport" class="bg-blue-50 border border-gray-400 rounded p-2">
                <i class="ri-dashboard-horizontal-fill"></i><span class="font-bold text-blue-500"> Show Full Report </span>
            </button>

            <!-- This is the full project report -->
            <div v-if="full_report" class="bg-blue-50 rounded px-[12px] py-[20px]">
                <ProgressBar :percentage="project_report.score" />
                <div class="prose prose-sm min-w-full">
                    <ol>
                        <h3> Project Strength </h3>
                        <li v-for="strength in project_report.feedback.project_strengths">{{ strength }}</li>
                    </ol>
                    <ol>
                        <h3> Project Weakness </h3>
                        <li v-for="weakness in project_report.feedback.project_weakness">{{ weakness }}</li>
                    </ol>
                    <ol>
                        <h3> Alignment with Instructor Instructions </h3>
                        <li v-for="alignment in project_report.feedback.alignment">{{ alignment }}</li>
                    </ol>
                    <ol>
                        <h3> Areas of Improvement </h3>
                        <li v-for="improvement in project_report.feedback.aoi">{{ improvement }}</li>
                    </ol>
                    <ol>
                        <h3>Final Assessment</h3>
                        <li v-for="final in project_report.feedback.final_assessment">{{ final }}</li>
                    </ol>
                </div>
            </div>
        </div>
        <div>
            <Modal v-if="toggler" :fields="fields" @update="updateField" @close="formClose" @submit="formSubmit" ></Modal>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 md:5 lg:gap-20 items-start">
            <div class="col-span-2">
                <div class="flex gap-2">
                    <button @click="router.go(-1)" class="text-indigo-500 px-[20px] py-[12px] font-bold rounded"><i class="ri-arrow-left-line"></i>Go Back</button>
                    <button @click="handleToggle" class="bg-indigo-500 hover:bg-indigo-600 px-[20px] py-[12px] font-bold text-white shadow rounded">Submit Project</button>
                    <button class="border border-gray-500 px-[20px] py-[12px] font-bold text-indigo-500 shadow rounded"><i class="ri-share-line"></i>Share Project</button>
                </div>
                <div class="text-xl mb-4 text-blue-800 font-bold mt-5 uppercase"><i class="ri-stack-fill">CAPSTONE PROJECT --/ </i>{{ project.title }} </div>
                <div class="prose md:prose-md sm:prose-sm min-w-full">{{ project.instructions }}</div>
                <div v-html="hint" class="prose md:prose-md sm:prose-sm min-w-full"></div>
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


