<script setup>
    import { defineEmits } from 'vue'
    const props = defineProps(['fields'])

    const emit = defineEmits(['update', 'close', 'submit'])

    function onInputChange(index, event){
        emit('update', index, event.target.value)
    }

    function handleClose(){
        emit('close', true)
    }
    
    function handleSubmit(){
        emit('submit', true)
    }
    
</script>

<template>
    <!-- Modals -->
    <div id="add-course-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Add New Course</h3>
                <button class="close" @click.prevent="handleClose">&times;</button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group" v-for="(field, index) in props.fields">
                        <label for="course-name">{{ field.name }}</label>
                        <input
                                :id="field.name"
                                :placeholder="field.placeholder"
                                :value="field.res"
                                @input="event => onInputChange(index, event)"
                                required
                                class="w-full px-4 py-2 border rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                    </div>
                    <div>
                        <slot />
                    </div>
                    <div class="form-actions">
                        <button @click.prevent="handleSubmit" class="bg-indigo-500 py-2 text-white inline-block col-start-2 me-2 w-[100px] rounded">Add</button>
                        <button @click.prevent="handleClose" class="bg-indigo-500 py-2 text-white inline-block col-start-2 ms-auto w-[100px] rounded">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal {
    position: fixed;
    z-index: 2000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
}

.modal-content {
    background: white;
    margin: 2% auto;
    padding: 0;
    border-radius: 12px;
    width: 90%;
    max-width: 500px;
    overflow-y: scroll;
    max-height: 600px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.modal-header {
    padding: 20px 25px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h3 {
    margin: 0;
    color: #333;
}

.close {
    color: #aaa;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

.close:hover {
    color: #333;
}

.modal-body {
    padding: 25px;
}

/* Forms */
.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #333;
}

.form-group input,
.form-group textarea,
.form-group select {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    outline: none;
    transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin-top: 25px;
}

    
</style>

