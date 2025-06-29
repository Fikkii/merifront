<script setup>
    import Modal from '../../components/admin/Modal.vue'
    import { ref, onMounted, nextTick } from 'vue'
    import ToastEditor from '../../components/ToastEditor.vue'
    import { useToast } from 'vue-toastification'

    import axios from 'axios'

    const toast = useToast()

    const allProject = ref([])
    const toggler = ref( false )

    const moduleId = ref([])

    // This stores the edit id and sets the mode accordingly...
    const editId = ref(null)

    //For ToastEditor
    const toastRef = ref(null)
    const content = ref('')

    // Text fields
    const editFields = ref(null) // This handles text field when edit mode is on

    // Regular text field
    const fields = ref([
    {
        name: 'title',
        placeholder: 'Enter project Title',
        res: ''
    },
    {
        name: 'instructions',
        placeholder: 'Enter project instructions',
        type: 'textarea',
        res: ''
    },
    {
        name: 'rubric',
        placeholder: 'Grading Criteria',
        type: 'textarea',
        res: '',
    },
    {
        name: 'courseId',
        placeholder: 'Select Module Title',
        res: '',
        type: 'select',
        options: {}
    },
    {
        name: 'moduleId',
        placeholder: 'Select Module Title',
        res: '',
        type: 'select',
        options: {}
    },
    ])

    onMounted(() => {fetchProjects()})

async function fetchProjects() {
  try {
    const res = await axios.get('/api/projects')

    if (res.status == 200) {
        const data = res.data
        allProject.value = data
        console.log(res.data)
    }
  } catch (e) {
    console.error('Caught error:', e);
  }
}

async function handleDelete(id){
    const res = await axios.delete(`/api/admin/projects/${id}`)
    fetchProjects()
}

function updateField(index, value){
    if(editId.value){
        editFields.value[index].res = value
    }else{
        fields.value[index].res = value
    }
}

async function formSubmit(formData){

    // Get markdown content and append it form
    if(toastRef.value){
        content.value = toastRef.value.saveContent()
    }

    formData.append('content', content.value)
    const jsonData = Object.fromEntries(formData)

    try{
        if(editId.value){
            const res = axios.put(`/api/admin/projects/${editId.value}`, jsonData, {
                headers: {
                    "Content-Type": 'application/json'
                }
            })

            toast.success('Project has been edited successfully')
        }else{
            const res = axios.post('/api/admin/projects', jsonData, {
                headers: {
                    "Content-Type": 'application/json'
                }
            })

        }

        toggler.value = false
    }catch(e){
        toast.error(e)
    }finally{
        fetchProjects()
        availableCourse.value = await fetchCourses()
    }
}

function formClose(){
    toggler.value = false
}

async function handleEdit(id='1'){
        //Edit mode is active
        editId.value = id

        const data = await axios.get(`/api/projects/${id}`)

        const inputStruct = Object.entries(data.data).map(([key, value]) => {
            const exclude = ['id', 'evaluation', 'project_hint']
            if(exclude.includes(key)){
                return null
            }

            return {
            name: key,
            placeholder: 'No placeholder',
            type: 'text',
            res: value
            }
        })

        const fillInput = inputStruct.filter(value => value != null)

        editFields.value = fillInput

        toggler.value = true
        await nextTick()
        toastRef.value.setContent(data.data.project_hint)
}

function handleToggle(){
    toggler.value = true

    // Revert back to Add mode
    editFields.value = null
    editId.value = null
}

</script>

<template>
    <div>
        <div>
            <!-- shared admin form -->
            <Modal v-if="toggler" :fields="editFields || fields" @update="updateField" @close="formClose"  @submit="formSubmit" >
                <!-- The markdown editor stays here -->
                <div class="col-span-2">
                    <ToastEditor ref="toastRef" />
                </div>
            </Modal>
        </div>
        <div :class="[toggler ? 'blur' : '']">
            <CategorizedTable @edit="handleEdit" @delete="handleDelete" :items="allProject">
                <button :edit="editId" @click="handleToggle" class="bg-blue-500 ms-auto py-2 text-white block col-start-2 w-[100px] rounded"><i class="ri-add-line"></i>Add Project</button>
            </CategorizedTable>
        </div>
    </div>
</template>

<style scoped>

</style>
