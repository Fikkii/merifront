<script setup>
    import Modal from '../../components/admin/Modal.vue'
    import { ref, onMounted, nextTick } from 'vue'
    import { useToast } from 'vue-toastification'

    import loader from '../../assets/loader.gif'

    const toast = useToast()

    import axios from 'axios'

    const allStudent = ref([])
    const toggler = ref( false )

    onMounted(() => {
        fetchStudent(), fetchSingleProfile()
    })

    const editId = ref(null) // This handles text field when edit mode is on

    // Text fields
    const editFields = ref(null) // This handles text field when edit mode is on

    const actionDropdown = ref([
        {
            name: 'Delete',
            action: 'delete',
        },
        {
            name: 'Edit',
            action: 'edit',
        },
        {
            name: 'Update',
            action: 'update',
        },
    ])

    const fields = ref([
    {
        name: 'email',
        placeholder: 'Enter Email',
        res: ''
    },
    {
        name: 'name',
        placeholder: 'Enter Name',
        res: ''
    },
    {
        name: 'password',
        placeholder: 'Enter Password',
        res: ''
    },
    ])
async function fetchStudent() {
  try {
    const res = await axios.get('/api/students')

    if (res.status == 200) {
        const data = res.data
        allStudent.value = data
        console.log(res.data)
    }
  } catch (e) {
    console.error('Caught error:', e);
  }
}


function updateField(index, value){
    fields.value[index].res = value
    console.log(fields.value[index].res)
}


function formSubmit(){
try{
    axios.post('/api/auth/register', {
        email: fields.value[0].res,
        name: fields.value[1].res,
        password: fields.value[2].res,
    })
    toggler.value = false
}catch (e){
console.error(e)
}
}

function formClose(){
    toggler.value = false
}

function handleDropdown(id){
    console.log(id)
}

async function handlePairing(e){
  e.currentTarget.innerHTML += `<img class="absolute top-1 left-1 z-10" width="20" id="loader" src="${loader}">`
  setTimeout(() => {
    const temp = document.getElementById('loader')
    if (temp) temp.remove()
  }, 3000)

    const req = await axios.post('/api/peer')
    
    if(req.data.groups){
        const noCreatedGroups = req.data.groups.length
        toast.success(`${noCreatedGroups} Pair Group have been created successfully`)
        fetchStudent()
    }else{
        toast.error('Unable to create Pair Group, Not enough user')
    }

}


async function handlePairingDelete(e){
  e.currentTarget.innerHTML += `<img class="absolute top-1 left-1 z-10" width="20" id="loader" src="${loader}">`
  setTimeout(() => {
    const temp = document.getElementById('loader')
    if (temp) temp.remove()
  }, 3000)

    const req = await axios.delete('/api/peer')
    
    fetchStudent()
    if(req.status == 201){
        toast.success(`Pair Groups have been deleted successfully`)
    }else{
        toast.error('Unable to delete Pair Group')
    }

}

async function fetchSingleProfile(id= 23){
    const res = await axios.get(`/api/students/${id}`)

    if (res.status == 200) {
        const data = res.data
        console.log(res.data)
    }
} 

async function handleDelete(id){
    const res = await axios.delete(`/api/admin/students/${id}`)
    fetchStudent()
}


async function handleEdit(id='1'){
        //Edit mode is active
        editId.value = id

        const data = await axios.get(`/api/students/${id}`)

        const inputStruct = Object.entries(data.data).map(([key, value]) => {

            const exclude = ['id', 'enrollment', 'peer']

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




</script>

<template>
    <div>
        <div>
            <!-- shared admin form -->
            <Modal v-if="toggler" :fields="editFields || fields" @update="updateField" @close="formClose"  @submit="formSubmit" ></Modal>
        </div>
        <div :class="[toggler ? 'blur' : '']">
            <CategorizedTable groupBy="is_enrolled" @delete="handleDelete" @edit="handleEdit" :items="allStudent" >
                <div class="flex">
                    <div class="flex flex-wrap gap-2">
                        <button @click="handlePairing" class="relative bg-green-500 py-2 text-white block col-start-2 w-[100px] rounded">Assign Groups</button>
                        <button @click="handlePairingDelete" class="relative bg-red-500 py-2 text-white block col-start-2 w-[100px] rounded">Delete Groups</button>
                    </div>
                    <button @click="toggler = !toggler" class="bg-blue-500 ms-auto py-2 text-white block col-start-2 w-[100px] rounded"><i class="ri-add-line"></i>Add Student</button>
                </div>
            </CategorizedTable>
        </div>
    </div>
</template>

<style scoped>
</style>





