<script setup>
    import Modal from '../../components/admin/Modal.vue'
    import ImageCropper from '../../components/utils/ImageCropper.vue'
    import { useToast } from 'vue-toastification'
    import { useRouter } from 'vue-router'

    // Import middleware to fetch course
    import { fetchCourses } from '../../controllers/controller.js'

    import { ref, onMounted, nextTick, watch } from 'vue'

    const toast = useToast()
    const router = useRouter()

    const props = defineProps({
        dashboard: {
            type: Boolean,
            default: false
        }
    })

    import axios from 'axios'

    const availableCourse = ref(null)
    const toggler = ref( false )
    
    const imageRef = ref(null) //This holds reference to the child component that handles upload

    // This stores the edit id and sets the mode accordingly...
    const editId = ref(null)

    // Text fields
    const editFields = ref(null) // This handles text field when edit mode is on

    // Regular text field
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

    onMounted(async () => {availableCourse.value = await fetchCourses()})

    async function handleDelete(id){
        const res = axios.delete(`/api/admin/courses/${id}`)
        availableCourse.value = await fetchCourses()
    }

async function handleEdit(id='1'){
        //Edit mode is active
        editId.value = id

        const data = await axios.get(`/api/courses/${id}`)

        const inputStruct = Object.entries(data.data).map(([key, value]) => {
            const exclude = ['id', 'cover_img_url']
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

        availableCourse.value = await fetchCourses()
}

async function formSubmit(formData){
    if(editId.value){
        const imgblob = await imageRef.value.getCroppedImage()
        if(!imgblob){
            toast.error('Please Image needs to be re-uploaded')
            return
        }
        formData.append('image', imgblob, 'cropped-img')
        const res = axios.put(`/api/admin/courses/${editId.value}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    }else{
        const imgblob = await imageRef.value.getCroppedImage()
        formData.append('image', imgblob, 'cropped-img')
        const res = axios.post('/api/admin/courses', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    }

    availableCourse.value = await fetchCourses()
    toggler.value = !toggler.value
}

function updateField(index, value){
    if(editId.value){
        editFields.value[index].res = value
    }else{
        fields.value[index].res = value
    }
}

function formClose(){
    toggler.value = false
}

//handles Toggle
function handleToggle(){
    toggler.value = true

    // Revert back to Add mode
    editFields.value = null
    editId.value = null
}

</script>

<template>
    <div>
        <div>
            <Modal v-if="toggler" :fields="editFields || fields" @update="updateField" @close="formClose" :edit="editId"  @submit="formSubmit" >
            <ImageCropper ref="imageRef" />
            </Modal>
        </div>
        <div :class="[toggler ? 'blur' : '']">
            <Table @delete="handleDelete" @edit="handleEdit" :items="availableCourse">
                <button @click="handleToggle" class="bg-blue-500 ms-auto py-2 text-white block col-start-2 w-[100px] rounded"><i class="ri-add-line"></i>Add Course</button>
            </Table>
        </div>
    </div>
</template>

<style scoped>

</style>


