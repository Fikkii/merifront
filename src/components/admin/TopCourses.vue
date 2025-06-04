<template>
    <div class="card">
        <div class="card-header">
            <h3>Top Courses</h3>
            <a href="#" class="view-all">Manage All</a>
        </div>
        <div class="course-list">
            <div class="course-item">
                <div class="course-info">
                    <h4>JavaScript Fundamentals</h4>
                    <p>245 students enrolled</p>
                </div>
                <div class="course-actions">
                    <button class="btn-icon"><i class="fas fa-edit"></i></button>
                    <button class="btn-icon"><i class="fas fa-eye"></i></button>
                </div>
            </div>
            <div class="course-item">
                <div class="course-info">
                    <h4>Python for Beginners</h4>
                    <p>189 students enrolled</p>
                </div>
                <div class="course-actions">
                    <button class="btn-icon"><i class="fas fa-edit"></i></button>
                    <button class="btn-icon"><i class="fas fa-eye"></i></button>
                </div>
            </div>
            <div class="course-item">
                <div class="course-info">
                    <h4>React Development</h4>
                    <p>156 students enrolled</p>
                </div>
                <div class="course-actions">
                    <button class="btn-icon"><i class="fas fa-edit"></i></button>
                    <button class="btn-icon"><i class="fas fa-eye"></i></button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Cards */
.card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    overflow: hidden;
}

.card-header {
    padding: 20px 25px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-header h3 {
    font-size: 20px;
    font-weight: 600;
    color: #333;
}

.view-all {
    color: #667eea;
    text-decoration: none;
    font-weight: 500;
}

.view-all:hover {
    text-decoration: underline;
}

/* Course List */
.course-list {
    padding: 20px 25px;
}

.course-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #f0f0f0;
}

.course-item:last-child {
    border-bottom: none;
}

.course-info h4 {
    margin-bottom: 5px;
    color: #333;
}

.course-info p {
    color: #666;
    font-size: 14px;
}

.course-actions {
    display: flex;
    gap: 8px;
}
</style>
