<script setup>
    import Modal from '../../components/admin/Modal.vue'
    import { ref, onMounted } from 'vue'
    import { useToast } from 'vue-toastification'

    const toast = useToast()

    import axios from 'axios'

    const allStudent = ref([])
    const toggler = ref( false )

    onMounted(fetchStudent)

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

async function handlePairing(){
    const req = await axios.post('/api/peer')
    
    if(req.data.groups){
        const noCreatedGroups = req.data.groups.length
        toast.success(`${noCreatedGroups} Pair Group have been created successfully`)
    }else{
        toast.error('Unable to create Pair Group, Not enough user')
    }
}

</script>

<template>
    <div>
        <div>
            <Modal v-if="toggler" :fields="fields" @update="updateField" @close="formClose"  @submit="formSubmit" ></Modal>
        </div>
        <div :class="[toggler ? 'blur' : '']">
            <div>
                <div class="flex flex-wrap">
                    <button @click="handlePairing" class="bg-green-500 py-2 text-white block col-start-2 w-[100px] rounded">Group Students</button>
                </div>
            </div>
            <Table :items="allStudent" >
                <button @click="toggler = !toggler" class="bg-blue-500 ms-auto py-2 text-white block col-start-2 w-[100px] rounded"><i class="ri-add-line"></i>Add Student</button>
            </Table>
        </div>
    </div>
</template>

<style scoped>
</style>





