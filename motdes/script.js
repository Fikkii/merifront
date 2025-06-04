// Dashboard Navigation and Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the dashboard
    initializeNavigation();
    initializeResponsiveMenu();
    initializeModals();
    initializeSearchFunctionality();
    
    // Set default active page
    showPage('dashboard');
});

// Navigation functionality
function initializeNavigation() {
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a[data-page]');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all menu items
            document.querySelectorAll('.sidebar-menu li').forEach(li => {
                li.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.parentElement.classList.add('active');
            
            // Show corresponding page
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
            
            // Update page title
            updatePageTitle(pageId);
        });
    });
}

// Show specific page
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
}

// Update page title in header
function updatePageTitle(pageId) {
    const pageTitles = {
        'dashboard': 'Dashboard',
        'courses': 'Course Management',
        'users': 'User Management',
        'instructors': 'AI Instructor Management',
        'enrollments': 'Enrollment Management',
        'materials': 'Course Materials',
        'analytics': 'Analytics',
        'settings': 'Settings'
    };
    
    const titleElement = document.getElementById('page-title');
    if (titleElement && pageTitles[pageId]) {
        titleElement.textContent = pageTitles[pageId];
    }
}

// Responsive menu functionality
function initializeResponsiveMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                    sidebar.classList.remove('active');
                }
            }
        });
    }
}

// Modal functionality
function initializeModals() {
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

// Show modal
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

// Hide modal
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Search functionality
function initializeSearchFunctionality() {
    const searchInput = document.querySelector('.search-box input');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            // Implement search logic here
            console.log('Searching for:', searchTerm);
        });
    }
}

// Sample data for dashboard
const dashboardData = {
    stats: {
        totalUsers: 1234,
        activeCourses: 89,
        enrollments: 2456,
        aiInstructors: 15
    },
    recentActivity: [
        {
            type: 'enrollment',
            user: 'John Doe',
            course: 'Advanced JavaScript',
            time: '2 minutes ago'
        },
        {
            type: 'course',
            course: 'React Fundamentals',
            time: '1 hour ago'
        },
        {
            type: 'download',
            user: 'Sarah Smith',
            time: '3 hours ago'
        },
        {
            type: 'ai_update',
            instructor: 'CodeMaster',
            course: 'Python course',
            time: '5 hours ago'
        }
    ]
};

// Course Management Functions
function addNewCourse() {
    showModal('add-course-modal');
}

function editCourse(courseId) {
    console.log('Editing course:', courseId);
    // Implement edit course functionality
}

function deleteCourse(courseId) {
    if (confirm('Are you sure you want to delete this course?')) {
        console.log('Deleting course:', courseId);
        // Implement delete course functionality
    }
}

function downloadCourseMaterials(courseId) {
    console.log('Downloading materials for course:', courseId);
    // Implement download functionality
}

// User Management Functions
function addNewUser() {
    showModal('add-user-modal');
}

function editUser(userId) {
    console.log('Editing user:', userId);
    // Implement edit user functionality
}

function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        console.log('Deleting user:', userId);
        // Implement delete user functionality
    }
}

function viewUserDetails(userId) {
    console.log('Viewing user details:', userId);
    // Implement view user details functionality
}

// Enrollment Functions
function enrollUser() {
    showModal('enroll-user-modal');
}

function unenrollUser(enrollmentId) {
    if (confirm('Are you sure you want to unenroll this user?')) {
        console.log('Unenrolling user:', enrollmentId);
        // Implement unenroll functionality
    }
}

// AI Instructor Functions
function createAIInstructor() {
    showModal('create-instructor-modal');
}

function editInstructor(instructorId) {
    console.log('Editing instructor:', instructorId);
    // Implement edit instructor functionality
}

function deactivateInstructor(instructorId) {
    if (confirm('Are you sure you want to deactivate this AI instructor?')) {
        console.log('Deactivating instructor:', instructorId);
        // Implement deactivate instructor functionality
    }
}

// Materials Management Functions
function uploadMaterials() {
    showModal('upload-materials-modal');
}

function deleteMaterial(materialId) {
    if (confirm('Are you sure you want to delete this material?')) {
        console.log('Deleting material:', materialId);
        // Implement delete material functionality
    }
}

// Form handling
function handleFormSubmit(formId, callback) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Call callback with form data
            if (callback) {
                callback(data);
            }
            
            // Hide modal after submission
            const modal = form.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
            
            // Reset form
            form.reset();
        });
    }
}

// Notification functions
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Update dashboard statistics
function updateStats() {
    // This would typically fetch data from an API
    const stats = dashboardData.stats;
    
    // Update stat cards
    document.querySelectorAll('.stat-card').forEach((card, index) => {
        const statValue = card.querySelector('h3');
        if (statValue) {
            switch(index) {
                case 0:
                    statValue.textContent = stats.totalUsers.toLocaleString();
                    break;
                case 1:
                    statValue.textContent = stats.activeCourses;
                    break;
                case 2:
                    statValue.textContent = stats.enrollments.toLocaleString();
                    break;
                case 3:
                    statValue.textContent = stats.aiInstructors;
                    break;
            }
        }
    });
}

// Export functions for use in HTML
window.showModal = showModal;
window.hideModal = hideModal;
window.addNewCourse = addNewCourse;
window.editCourse = editCourse;
window.deleteCourse = deleteCourse;
window.downloadCourseMaterials = downloadCourseMaterials;
window.addNewUser = addNewUser;
window.editUser = editUser;
window.deleteUser = deleteUser;
window.viewUserDetails = viewUserDetails;
window.enrollUser = enrollUser;
window.unenrollUser = unenrollUser;
window.createAIInstructor = createAIInstructor;
window.editInstructor = editInstructor;
window.deactivateInstructor = deactivateInstructor;
window.uploadMaterials = uploadMaterials;
window.deleteMaterial = deleteMaterial;
window.showNotification = showNotification;
