<script setup>
    import Modal from '../../components/admin/Modal.vue'
    import ImageCropper from '../../components/utils/ImageCropper.vue'

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

    const imageRef = ref(null)

    onMounted(fetchCourse)

    function handleDelete(id){
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
    const formData = await imageRef.value.getCroppedImage()
    formData.append('title', fields.value[0].res)
    formData.append('description', fields.value[1].res)
    const res = axios.post('/api/admin/courses', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
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
            <Modal v-if="toggler" :fields="fields" @update="updateField" @close="formClose"  @submit="formSubmit" >
            <ImageCropper ref="imageRef" />
            </Modal>
        </div>
        <div :class="[toggler ? 'blur' : '']">
            <h3 class="text-xl mb-3">Course Management</h3>
            <div class="mb-4" v-if="!props.dashboard">
                <button @click="toggler = !toggler" class="bg-blue-500 py-2 text-white block col-start-2 ms-auto w-[200px] rounded">Add course</button>
            </div>
            <Table @delete="handleDelete" :items="availableCourse"/>
        </div>
    </div>
</template>

<style scoped>

</style>


