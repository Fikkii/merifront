<script setup>
    import Modal from '../../components/admin/Modal.vue'
    import ToastEditor from '../../components/ToastEditor.vue'
    import { ref, onMounted, onUpdated } from 'vue'

    import { useToast } from 'vue-toastification'

    //import controllers to fetch data
    import { fetchTopics, fetchModules } from '../../controllers/controller.js'

    import axios from 'axios'

    const availableTopics = ref([])
    const availableModules = ref([])
    const moduleId = ref([])
    const content = ref('')
    const toggler = ref( false )

    const toast = useToast()

    const toastRef = ref(null)

    onMounted(async () => { availableTopics.value = await fetchTopics(); availableModules.value = await fetchModules() })
    onUpdated(async () => { availableTopics.value = await fetchTopics(); availableModules.value = await fetchModules() })

function handleDelete(id){
    const res = axios.delete(`/api/admin/topics/${id}`)
}

    const fields = ref([
    {
        name: 'title',
        placeholder: 'Enter topic Title',
        res: ''
    },
    {
        name: 'moduleId',
        placeholder: 'Enter topic Title',
        res: '',
        type: 'select',
        options: {}
    },
    ])

async function handleEdit(id, topic_id){
    const res = await axios.put('/api/admin/topics', {
        id: id,
        moduleId: module_id,
        title: fields.value[0].res,
        order: fields.value[1].res,
    })
}

function getMarkdown(message){
    content.value = message
}

function updateField(index, value){
fields.value[index].res = value
}

async function formSubmit(){
try{
    if(toastRef.value){
        content.value = toastRef.value.saveContent()
    }

    const res = await axios.post('/api/admin/topics', {
        moduleId: moduleId.value,
        title: fields.value[0].res,
        content: content.value,
    })

    toggler.value = !toggler.value
    toast.success('Topic Created Successfully...')
}catch(e){
console.log(e)
    toast.error(e.response.data.error)
}
}

function formClose(){
    toggler.value = false
}


</script>

<template>
    <div class="relative">
        <div>
            <Modal v-if="toggler" :fields="fields" @update="updateField" @close="formClose"  @submit="formSubmit" >
            <div class="mt-3">
                <select v-model="moduleId" class="p-2 border">
                    <option v-for="module in availableModules" :value="module.id">{{ module.module_title }}</option>
                </select>
            </div>
            <!-- The markdown editor stays here -->
            <div class="col-span-2">
                <ToastEditor ref="toastRef" />
            </div>
            </Modal>
        </div>
        <div :class="[toggler ? 'blur' : '']">
            <button @click="toggler = !toggler" class="bg-blue-500 py-2 text-white block col-start-2 ms-auto w-[200px] rounded">Add topic</button>
            <CategorizedTable @delete="handleDelete" :items="availableTopics" />
        </div>
    </div>
</template>

<style scoped>

</style>




