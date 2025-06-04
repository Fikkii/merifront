<template>
    <div class="card">
        <div class="card-header">
            <h3>Recent Activity</h3>
            <a href="#" class="view-all">View All</a>
        </div>
        <div class="activity-list">
            <div class="activity-item">
                <div class="activity-icon enrolled">
                    <i class="fas fa-user-plus"></i>
                </div>
                <div class="activity-content">
                    <p><strong>John Doe</strong> enrolled in "Advanced JavaScript"</p>
                    <span class="activity-time">2 minutes ago</span>
                </div>
            </div>
            <div class="activity-item">
                <div class="activity-icon course">
                    <i class="fas fa-book"></i>
                </div>
                <div class="activity-content">
                    <p>New course <strong>"React Fundamentals"</strong> was added</p>
                    <span class="activity-time">1 hour ago</span>
                </div>
            </div>
            <div class="activity-item">
                <div class="activity-icon download">
                    <i class="fas fa-download"></i>
                </div>
                <div class="activity-content">
                    <p><strong>Sarah Smith</strong> downloaded course materials</p>
                    <span class="activity-time">3 hours ago</span>
                </div>
            </div>
            <div class="activity-item">
                <div class="activity-icon ai">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="activity-content">
                    <p>AI Instructor <strong>"CodeMaster"</strong> updated Python course</p>
                    <span class="activity-time">5 hours ago</span>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>
/* Activity List */
.activity-list {
    padding: 20px 25px;
}

.activity-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;
}

.activity-item:last-child {
    border-bottom: none;
}

.activity-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 16px;
}

.activity-icon.enrolled { background: #667eea; }
.activity-icon.course { background: #f5576c; }
.activity-icon.download { background: #4facfe; }
.activity-icon.ai { background: #43e97b; }

.activity-content p {
    margin-bottom: 5px;
    color: #333;
}

.activity-time {
    color: #999;
    font-size: 12px;
}

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

</style>
