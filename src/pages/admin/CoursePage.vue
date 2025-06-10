<script setup>
    import Modal from '../../components/admin/Modal.vue'
    import ImageCropper from '../../components/utils/ImageCropper.vue'

    // Import middleware to fetch course
    import { fetchCourses } from '../../controllers/controller.js'

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

    onMounted(async () => availableCourse.value = await fetchCourses())

    async function handleDelete(id){
        const res = axios.delete(`/api/admin/courses/${id}`)
        availableCourse.value = await fetchCourses()
    }

async function handleEdit(){
    
        availableCourse.value = await fetchCourses()
}

    const fields = ref([
    {
        name: 'title',
        placeholder: 'Enter Course Title',
        type: 'text',
        res: ''
    },
    {
        name: 'price',
        placeholder: 'Enter Course Pricing',
        type: 'number',
        res: ''
    },
    {
        name: 'description',
        placeholder: 'Enter Course Description',
        type: 'text',
        res: ''
    },
    ])

async function formSubmit(formData){
    const imgblob = await imageRef.value.getCroppedImage()
    formData.append('image', imgblob, 'cropped-img')
    const res = axios.post('/api/admin/courses', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    toggler.value = !toggler.value
    availableCourse.value = await fetchCourses()
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
            <Table @delete="handleDelete" @edit="handleEdit" :items="availableCourse"/>
        </div>
    </div>
</template>

<style scoped>

</style>


