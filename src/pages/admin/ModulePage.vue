<script setup>
    import Modal from '../../components/admin/Modal.vue'
    import { ref, onMounted } from 'vue'
    import { useToast } from 'vue-toastification'

    //Import controllers for fetching data
    import { fetchModules, fetchCourses } from '../../controllers/controller.js'

    import axios from 'axios'

    const moduleId = ref([])
    const availableModules = ref([])
    const availableCourse = ref([])
    const availableProjects = ref([])
    const courseId = ref([])
    const toggler = ref( false )

    const toast = useToast()

    // to store edit id...
    const editId = ref(null)

    onMounted(async () => {
    availableModules.value = await fetchModules();
    console.log(availableModules.value)
    availableCourse.value = await fetchCourses()
    })

    const fields = ref([
    {
        name: 'title',
        placeholder: 'Enter module Title',
        res: '',
        type: 'text'
    },
    {
        name: 'courseId',
        placeholder: 'Select Course Title',
        res: '',
        type: 'select',
        options: {}
    },
    {
        name: 'active',
        placeholder: '0 = Not Active, 1 = Active',
        res: '',
        type: 'number',
    },
    ])

    const editFields = ref(null)

async function handleEdit(id='1'){
        //Edit mode is active
        editId.value = id

        const data = await axios.get(`/api/modules/${id}`)

        const inputStruct = Object.entries(data.data).map(([key, value]) => {
            const exclude = ['id', 'cover_img_url']
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

        availableCourse.value = await fetchCourses()
}


async function handleDelete(id){
    const res = await axios.delete(`/api/admin/modules/${id}`)
    availableModules.value = await fetchModules()
}

function updateField(index, value){
if(editId.value){
    editFields.value[index].res = value
}else{
    fields.value[index].res = value
}
}

function handleToggle(){
    toggler.value = true

    // Revert back to Add mode
    editFields.value = null
    editId.value = null
}

async function formSubmit(formData){
    const jsonData = Object.fromEntries(formData)
    try{
        if(!editId.value){
                const res = await axios.post('/api/admin/modules', jsonData, {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                })

                if(res.status !== 201){
                    throw new Error('Unable to create Module')
                    toast.error('Unable to create Module...')
                }

                editId.value = null
        }else{
            const res = await axios.put(`/api/admin/modules/${editId.value}`, jsonData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            

            toast.success('Module Edited Successfully...')

        }
    }catch(e){
        console.log(e)
        toast.error('Unable to create Module...')
    } finally {
        toggler.value = false
        availableModules.value = await fetchModules()
    }

}

function formClose(){
    toggler.value = false
}

</script>

<template>
    <div>
        <div>
            <Modal v-if="toggler" :fields="editFields || fields" @update="updateField" @close="formClose" :edit="editId"  @submit="formSubmit" ></Modal>
        </div>
        <div :class="[toggler ? 'blur' : '']">
            <CategorizedTable @edit="handleEdit" @delete="handleDelete" :items="availableModules" > 
                <button @click="handleToggle" class="bg-blue-500 ms-auto py-2 text-white block col-start-2 w-[100px] rounded"><i class="ri-add-line"></i>Add Module</button>
            </CategorizedTable> 
        </div>
    </div>
</template>

<style scoped>

</style>



