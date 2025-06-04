<script setup>
    import Modal from './Modal.vue'
    import { ref, computed } from 'vue'

    import axios from 'axios'

    const toggle = ref(false)

    let computedInput = null
    const endpoint = ref('')

    const links = [
        {
        name: "Add Course",
        tag: "courses"
        },
        {
        name: "Add Module",
        tag: "modules"
        },
        {
        name: "Create AI Instructor",
        tag: "instructors"
        },
        {
        name: "Upload Materials",
        tag: "materials"
        },
    ]

    const fields = ref([
    {
        name: 'title',
        placeholder: 'Enter Title Here',
        res: '',
        tags: ['courses', 'modules']
    },
    {
        name: 'description',
        placeholder: 'Enter Description Here',
        res: '',
        tags: ['courses']
    },
    ])

    function handleModal(e, current){
        endpoint.value = current

        computedInput = fields.value.filter((value, id) => value.tags.includes(current))

        console.log(computedInput)
        toggle.value = true
    }

async function formSubmit(){
    const data = []

    //Generate dynamic data
    computedInput.forEach((value, index) => {
        if(value.res){
            data.push({ [value.name]: value.res })
        }
    })

    const formdata = Object.assign({}, ...data)
    console.log(formdata)

    const res = axios.post(`/api/admin/${endpoint.value}`, {...formdata})

    toggle.value = !toggle.value
}

function updateField(index, value){
fields.value[index].res = value
}

function formClose(){
    toggle.value = false
}

</script>

<template>
    <!-- Quick Actions -->
    <Modal v-if="toggle" @close="formClose" @update="updateField" @submit="formSubmit" :fields="computedInput" >

    </Modal>

    <div class="quick-actions">
        <h2>Quick Actions</h2>
        <div class="action-buttons">
            <button @click="(e) => { handleModal(e, link.tag) }" :id="link.tag" v-for="link in links" :to="{name: link.link}" class="action-btn primary">
                <i class="fas fa-plus"></i>
                {{ link.name }}
            </button>
        </div>
    </div>


</template>

<style scoped>
/* Quick Actions */
.quick-actions {
    margin-bottom: 30px;
}

.quick-actions h2 {
    margin-bottom: 20px;
    color: #333;
}

.action-buttons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
}

.action-btn {
    padding: 15px 20px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s ease;
    color: white;
}

.action-btn.primary { background: linear-gradient(135deg, #667eea, #764ba2); }
.action-btn.secondary { background: linear-gradient(135deg, #f093fb, #f5576c); }
.action-btn.tertiary { background: linear-gradient(135deg, #4facfe, #00f2fe); }
.action-btn.quaternary { background: linear-gradient(135deg, #43e97b, #38f9d7); }

.action-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}


</style>
