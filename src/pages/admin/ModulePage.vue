<script setup>
    import Modal from '../../components/admin/Modal.vue'
    import { ref, onMounted, onUpdated } from 'vue'
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

    onMounted(async () => {
    availableModules.value = await fetchModules();
    console.log(availableModules.value)
    availableCourse.value = await fetchCourses()
    })

    onUpdated(async () => availableModules.value = await fetchModules())


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
    ])

async function handleEdit(id, course_id){
    const res = await axios.put('/api/admin/modules', {
        id: id,
        courseId: course_id,
        title: fields.value[0].res,
        order: fields.value[1].res,
    })
}

function handleDelete(id){
    const res = axios.delete(`/api/admin/modules/${id}`)
    fetchModules()
}

function updateField(index, value){
fields.value[index].res = value
}

async function formSubmit(formData){
const jsonData = Object.fromEntries(formData)
try{
    const res = await axios.post('/api/admin/modules', jsonData, {
        headers: {
            "Content-Type": 'application/json'
        }
    })

    if(res.status !== 201){
        throw new Error('Unable to create Module')
        toast.error('Unable to create Module...')
    }

    toggler.value = false
    toast.success('Module Created Successfully...')
}catch(e){
    toast.error('Unable to create Module...')
}
}

function formClose(){
    toggler.value = false
}

</script>

<template>
    <div>
        <div>
            <Modal v-if="toggler" :fields="fields" @update="updateField" @close="formClose"  @submit="formSubmit" >
            </Modal>
        </div>
        <div :class="[toggler ? 'blur' : '']">
            <button @click="toggler = !toggler" class="bg-blue-500 py-2 text-white block col-start-2 ms-auto w-[200px] rounded">Add module</button>
            <CategorizedTable @delete="handleDelete" :items="availableModules" /> 
        </div>
    </div>
</template>

<style scoped>

</style>



