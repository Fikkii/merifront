<script setup>
    import { ref, defineProps, onMounted } from "vue"
    import axios from 'axios'

    const totalTopics = ref('')
    const totalCourses = ref('')
    const totalModules = ref('')
    const totalEnrollments = ref('')
    const totalUsers = ref('')
    const totalInstructors = ref('')

    onMounted(() => { fetchTotal() })

    async function fetchTotal(){
        axios.get('/api/total/topics')
            .then(res => totalTopics.value = res.data.total_topics)
        axios.get('/api/total/courses')
            .then(res => totalCourses.value = res.data.total_courses)
        axios.get('/api/total/modules')
            .then(res => totalModules.value = res.data.total_modules)
        axios.get('/api/total/enrollments')
            .then(res => totalEnrollment.value = res.data.total_enrollments)
        axios.get('/api/total/users')
            .then(res => totalUsers.value = res.data.total_users)
        axios.get('/api/total/instructors')
            .then(res => totalInstructors.value = res.data.total_instructors)
    }

</script>

<template>
    <!-- Stats Cards -->
    <div class="stats-grid">
        <div class="stat-card">
            <div class="stat-icon users">
                <i class="fas fa-users"></i>
            </div>
            <div class="stat-info">
                <h3>{{ totalUsers || 0 }}</h3>
                <p>Total Users</p>
                <span class="stat-change positive">+12%</span>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon courses">
                <i class="fas fa-book"></i>
            </div>
            <div class="stat-info">
                <h3>{{ totalCourses || 0 }}</h3>
                <p>Active Courses</p>
                <span class="stat-change positive">+5%</span>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon enrollments">
                <i class="fas fa-user-plus"></i>
            </div>
            <div class="stat-info">
                <h3>{{ totalEnrollments || 0 }}</h3>
                <p>Enrollments</p>
                <span class="stat-change positive">+8%</span>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon instructors">
                <i class="fas fa-robot"></i>
            </div>
            <div class="stat-info">
                <h3>{{ totalInstructors || 0 }}</h3>
                <p>AI Instructors</p>
                <span class="stat-change neutral">+2</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Stats Grid */
.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
}

.stat-card {
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: center;
    gap: 20px;
    transition: transform 0.3s ease;
}

.stat-card:hover {
    transform: translateY(-5px);
}

.stat-icon {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: white;
}

.stat-icon.users { background: linear-gradient(135deg, #667eea, #764ba2); }
.stat-icon.courses { background: linear-gradient(135deg, #f093fb, #f5576c); }
.stat-icon.enrollments { background: linear-gradient(135deg, #4facfe, #00f2fe); }
.stat-icon.instructors { background: linear-gradient(135deg, #43e97b, #38f9d7); }

.stat-info h3 {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 5px;
    color: #333;
}

.stat-info p {
    color: #666;
    margin-bottom: 8px;
}

.stat-change {
    font-size: 14px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 12px;
}

.stat-change.positive {
    background: #d4edda;
    color: #155724;
}

.stat-change.neutral {
    background: #e2e3e5;
    color: #6c757d;
}

</style>

