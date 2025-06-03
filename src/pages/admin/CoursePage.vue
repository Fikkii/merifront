<script setup>
    import AdminForm from './AdminForm.vue'
    import { ref, onMounted } from 'vue'

    const props = defineProps({
        dashboard: {
            type: Boolean,
            default: false
        }
    })

    import axios from 'axios'

    const availableCourse = ref([])
    const toggler = ref( false )

    onMounted(fetchCourse)

    function handleDelete(e){
        const id = e.currentTarget.id
        console.log(id)
        const res = axios.delete(`/api/admin/courses/${id}`)
        fetchCourse()
    }


    const fields = ref([
    {
        name: 'title',
        placeholder: 'Enter Course Title',
        res: ''
    },
    {
        name: 'description',
        placeholder: 'Enter Course Description',
        res: ''
    },
    ])

async function fetchCourse() {
  try {
    const res = await axios.get('/api/courses')

    if (res.status == 200) {
        const data = res.data
        availableCourse.value = data
        console.log(res.data)
    }
  } catch (e) {
    console.error('Caught error:', e);
  }
}

async function formSubmit(){
    const res = axios.post('/api/admin/courses', {
        title: fields.value[0].res,
        description: fields.value[1].res
    })
    fetchCourse()
    toggler.value = !toggler.value
}

function updateField(index, value){
fields.value[index].res = value
}

function formClose(){
    toggler.value = false
}

</script>

<template>
    <div>
        <div>
            <AdminForm v-if="toggler" :fields="fields" @update="updateField" @close="formClose"  @submit="formSubmit" >
            </AdminForm>
        </div>
        <div :class="[toggler ? 'blur' : '']">
            <div v-if="!props.dashboard">
                <button @click="toggler = !toggler" class="bg-blue-500 py-2 text-white block col-start-2 ms-auto w-[200px] rounded">Add course</button>
                <div class="flex gap-2 mt-4">
                    <input class="px-4 py-2 rounded-sm flex-1" placeholder="Enter Course Title" type="text"/>
                    <button class="px-4 py-2 bg-yellow-500 text-white rounded">Search</button>
                </div>
                <select class="px-4 py-2 mt-2 border rounded-sm">
                    <option>Latest</option>
                    <option>Active</option>
                    <option>Inactive</option>
                </select>
            </div>
            <Table :items="availableCourse"/>
        </div>
    </div>
</template>

<style scoped>

</style>


