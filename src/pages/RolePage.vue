<script setup>
    import { useUserStore } from '../store/user.js'
    import { useRouter } from 'vue-router'

    const userStore = useUserStore()
    const router = useRouter()

    const role = userStore.role

    //route to student dashboard if student
    if(role == 'student'){
        router.push({ name: 'dashboard-home' })
    }

</script>
<template>
    <div class="">
        <div class="font-bold mb-4">
            You have multiple Roles, Login as:
        </div>
        <div>
            <RouterLink :to="{ name: 'admin-home' }"v :class="[role == 'student' ? 'hidden' : '' ]" class="block py-4 text-blue-500 px-4 rounded bg-blue-50 border rounded shadow self-stretch mb-2"> {{ role == 'instructor' ? 'Instructor' : 'Admin' }} <i class="ri-arrow-right-line"></i></RouterLink>
            <RouterLink :to="{ name: 'dashboard-home' }" class="block py-4 text-white px-4 rounded bg-blue-50 border rounded shadow self-stretch bg-indigo-500"> Continue as Student <i class="ri-arrow-right-line"></i></RouterLink>
        </div>
    </div>
</template>
