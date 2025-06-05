<script setup>
    import Modal from '../../components/admin/Modal.vue'
    import { ref, onMounted } from 'vue'
    import { useToast } from 'vue-toastification'

    import axios from 'axios'

    const moduleId = ref([])
    const availableModules = ref([])
    const availableCourse = ref([])
    const availableProjects = ref([])
    const courseId = ref([])
    const toggler = ref( false )

    const toast = useToast()

    onMounted(() => {fetchModules(), fetchCourse()})


    const fields = ref([
    {
        name: 'title',
        placeholder: 'Enter module Title',
        res: ''
    },
    {
        name: 'order',
        placeholder: 'Enter module Order',
        res: ''
    },
    ])

async function fetchCourse() {
  try {
    const res = await axios.get('/api/courses')

    if (res.status == 200) {
        const data = res.data
        availableCourse.value = data
    }
  } catch (e) {
    console.error('Caught error:', e);
  }
}

async function handleEdit(id, course_id){
    const res = await axios.put('/api/admin/modules', {
        id: id,
        courseId: course_id,
        title: fields.value[0].res,
        order: fields.value[1].res,
    })
    fetchModules()
}

function handleDelete(id){
    const res = axios.delete(`/api/admin/modules/${id}`)
    fetchModules()
}

async function fetchModules() {
  try {
    const res = await axios.get('/api/modules')

    if (res.status == 200) {
        const data = res.data
        availableModules.value = data
        console.log(availableModules.value)
    }
  } catch (e) {
    console.error('Caught error:', e);
  }
}

function updateField(index, value){
fields.value[index].res = value
}

async function formSubmit(){
try{
    const res = await axios.post('/api/admin/modules', {
        courseId: courseId.value,
        title: fields.value[0].res,
        order: fields.value[1].res,
    })
    if(res.status !== 201){
        throw new Error('Unable to create Module')
        toast.error('Unable to create Module...')
    }
    fetchModules()
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
            <div class="mt-3">
                <select v-model="courseId" class="p-2 border">
                    <option v-for="course in availableCourse" :value="course.id">{{ course.title }}</option>
                </select>
            </div>
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



