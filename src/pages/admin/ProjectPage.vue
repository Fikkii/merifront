<script setup>
    import Modal from '../../components/admin/Modal.vue'
    import { ref, onMounted } from 'vue'
    import { useToast } from 'vue-toastification'

    import axios from 'axios'

    const toast = useToast()

    const allProject = ref([])
    const toggler = ref( false )

    const moduleId = ref([])

    const availableModules = ref([])

    onMounted(() => { fetchModules() })

    const fields = ref([
    {
        name: 'title',
        placeholder: 'Enter project Title',
        res: ''
    },
    {
        name: 'instructions',
        placeholder: 'Enter project instructions',
        res: ''
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

function handleDelete(id){
    const res = axios.delete(`/api/admin/projects/${id}`)
    fetchProjects()
}

function updateField(index, value){
fields.value[index].res = value
}

async function fetchModules() {
  try {
    const res = await axios.get('/api/modules')

    if (res.status == 200) {
        const data = res.data
        availableModules.value = data
    }
  } catch (e) {
    console.error('Caught error:', e);
  }
}


async function formSubmit(){
try{
    const res = axios.post('/api/admin/projects', {
        moduleId: moduleId.value,
        title: fields.value[0].res,
        instructions: fields.value[1].res,
    })
    fetchProjects()
    toggler.value = !toggler.value
    toast.success('Project Created Successfully...')
}catch(e){
    toast.error('Unable to create Project...')
}
}

function formClose(){
    toggler.value = false
}


</script>

<template>
    <div>
        <div>
            <!-- shared admin form -->
            <Modal v-if="toggler" :fields="fields" @update="updateField" @close="formClose"  @submit="formSubmit" >
                <div class="mt-3">
                    <select v-model="moduleId" class="p-2 border">
                        <option v-for="module in availableModules" :value="module.id">{{ module.module_title }}</option>
                    </select>
                </div>
            </Modal>
        </div>
        <div :class="[toggler ? 'blur' : '']">
            <div>
                <button @click="toggler = !toggler" class="bg-blue-500 py-2 text-white block col-start-2 ms-auto w-[200px] rounded">Add project</button>
                <div class="flex gap-2 mt-4">
                    <input class="px-4 py-2 rounded-sm flex-1" placeholder="Enter project Title" type="text"/>
                    <button class="px-4 py-2 bg-yellow-500 text-white rounded">Search</button>
                </div>
                <select class="px-4 py-2 mt-2 border rounded-sm">
                    <option>Latest</option>
                    <option>Active</option>
                    <option>Inactive</option>
                </select>
            </div>
            <Table @delete="handleDelete" :items="allProject"/>
        </div>
    </div>
</template>

<style scoped>

</style>






