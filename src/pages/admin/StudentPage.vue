<script setup>
    import Card from '../../components/admin/Card.vue'
    import AdminForm from './AdminForm.vue'
    import { ref, onMounted } from 'vue'

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

</script>

<template>
    <div>
        <div>
            <AdminForm v-if="toggler" :fields="fields" @update="updateField" @close="formClose"  @submit="formSubmit" ></AdminForm>
            
        </div>
        <div :class="[toggler ? 'blur' : '']">
            <div>
                <button @click="toggler = !toggler" class="bg-blue-500 py-2 text-white block col-start-2 ms-auto w-[200px] rounded">Add Student</button>
                <div class="flex gap-2 mt-4">
                    <input class="px-4 py-2 rounded-sm flex-1" placeholder="Enter Student Title" type="text"/>
                    <button class="px-4 py-2 bg-yellow-500 text-white rounded">Search</button>
                </div>
                <select class="px-4 py-2 mt-2 border rounded-sm">
                    <option>Latest</option>
                    <option>Active</option>
                    <option>Inactive</option>
                </select>
            </div>
            <Table :items="allStudent" />
        </div>
    </div>
</template>

<style scoped>
</style>





