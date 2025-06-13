<script setup>
    import Modal from '../../components/admin/Modal.vue'
    import ToastEditor from '../../components/ToastEditor.vue'
    import { ref, onMounted, nextTick, onUpdated } from 'vue'

    import { useToast } from 'vue-toastification'

    //import controllers to fetch data
    import { fetchTopics, fetchCourses } from '../../controllers/controller.js'

    import axios from 'axios'

    const availableTopics = ref([])
    const availables = ref([])
    const moduleId = ref([])
    const content = ref('')
    const toggler = ref( false )

    const toast = useToast()

    const toastRef = ref(null)

    // This stores the edit id and sets the mode accordingly...
    const editId = ref(null)

    // Text fields
    const editFields = ref(null) // This handles text field when edit mode is on

    // Regular text field
    const fields = ref([
    {
        name: 'title',
        placeholder: 'Enter topic Title',
        res: ''
    },
    {
        name: 'moduleId',
        placeholder: 'Enter module ID',
        res: '',
        type: 'select',
        options: {}
    },
    {
        name: 'recommended_video',
        placeholder: 'Enter Recommended Video link',
        res: '',
    },
    ])


    onMounted(async () => { availableTopics.value = await fetchTopics(); availables.value = await fetchModules() })

async function handleDelete(id){
    const res = axios.delete(`/api/admin/topics/${id}`)
    availableTopics.value = await fetchTopics();
    availables.value = await fetchModules(); 
}

function getMarkdown(message){
    content.value = message
}

async function formSubmit(formData){
    
    // Get markdown content and append it form
    if(toastRef.value){
        content.value = toastRef.value.saveContent()
    }

    formData.append('content', content.value)
    const jsonData = Object.fromEntries(formData)

    try{
        // check for editId and if not create a new topic
        if(!editId.value){

            const res = await axios.post('/api/admin/topics', jsonData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            toast.success('Topic Created Successfully...')
        }else{
            const res = await axios.put(`/api/admin/topics/${editId.value}`, jsonData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            
            toast.success('Topic Edited Successfully...')
        }
        toggler.value = !toggler.value

    }catch(e){
        console.log(e)
    }finally{
        availableTopics.value = await fetchTopics();
        availables.value = await fetchModules(); 
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

async function handleEdit(id='1'){
        //Edit mode is active
        editId.value = id

        const data = await axios.get(`/api/topics/${id}`)

        const inputStruct = Object.entries(data.data).map(([key, value]) => {
            const exclude = ['id', 'topic_content', 'module_title', 'course_title']
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
        toastRef.value.setContent(data.data.topic_content)
}


function handleToggle(){
    toggler.value = true

    // Revert back to Add mode
    editFields.value = null
    editId.value = null
}

</script>

<template>
    <div class="relative">
        <div>
            <Modal v-if="toggler" :fields="editFields || fields" @update="updateField" @close="formClose"  @submit="formSubmit" >
            <!-- The markdown editor stays here -->
            <div class="col-span-2">
                <ToastEditor ref="toastRef" />
            </div>
            </Modal>
        </div>
        <div :class="[toggler ? 'blur' : '']">
            <CategorizedTable @edit="handleEdit" @delete="handleDelete" :items="availableTopics" >
                <button :edit="editId" @click="handleToggle" class="bg-blue-500 ms-auto py-2 text-white block col-start-2 w-[100px] rounded"><i class="ri-add-line"></i>Add Topic</button>
            </CategorizedTable>
        </div>
    </div>
</template>

<style scoped>

</style>




