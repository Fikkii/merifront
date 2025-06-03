import { createRouter, createWebHistory } from "vue-router";
import axios from 'axios'

const routes = [
    {
        path: '/dashboard',
        component: () => import('../layouts/DashboardLayout.vue'),
        meta: { requiresAuth: true },
        beforeEnter: async ( to, from ) => {
            const url = import.meta.env.VITE_API_URL
            const token = localStorage.getItem('jwt-token') || null
            const role = localStorage.getItem('user-role') || null

            //set backend api
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            axios.defaults.baseURL = url

            if( !token ){
                return { name: 'login' }
            }
            if(role == 'admin'){
                return { name: 'admin-home' }
            }
        },
        children: [
            {
                path: '',
                name: 'dashboard-home',
                component: () => import('../pages/dashboard/HomePage.vue'),
            },
            {
                path: 'chat',
                name: 'chat',
                component: () => import('../pages/dashboard/ChatPage.vue'),
            },
            {
                path: 'ebooks',
                name: 'ebooks',
                component: () => import('../pages/dashboard/EbookPage.vue'),
            },
            {
                path: 'profile',
                name: 'profile',
                component: () => import('../pages/dashboard/ProfilePage.vue'),
            },
            {
                path: 'topic/:id',
                name: 'topic',
                props: true,
                component: () => import('../pages/dashboard/TopicPage.vue'),
            },
            {
                path: 'learning',
                name: 'learning',
                component: () => import('../pages/dashboard/LearningPage.vue'),
            },
        ]
    },
    {
        path: '/admin',
        component: () => import('../layouts/AdminLayout.vue'),
        beforeEnter: ( to, from ) => {
            const url = import.meta.env.VITE_API_URL
            const token = localStorage.getItem('jwt-token') || null
            const user = localStorage.getItem('user') || null
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            axios.defaults.baseURL = url
            if( !token ){
                return { name: 'login' }
            }
        },
        children: [
            {
                path: '',
                name: 'admin-home',
                component: () => import('../pages/admin/HomePage.vue'),
            },
            {
                path: 'course',
                name: 'admin-courses',
                component: () => import('../pages/admin/CoursePage.vue'),
            },
            {
                path: 'module',
                name: 'admin-modules',
                component: () => import('../pages/admin/ModulePage.vue'),
            },
            {
                path: 'topic',
                name: 'admin-topics',
                component: () => import('../pages/admin/TopicPage.vue'),
            },
            {
                path: 'student',
                name: 'admin-students',
                component: () => import('../pages/admin/StudentPage.vue'),
            },
            {
                path: 'broadcast',
                name: 'admin-broadcasts',
                component: () => import('../pages/admin/BroadcastPage.vue'),
            },
            {
                path: 'transaction',
                name: 'admin-transactions',
                component: () => import('../pages/admin/TransactionPage.vue'),
            },
            {
                path: 'project',
                name: 'admin-projects',
                component: () => import('../pages/admin/ProjectPage.vue'),
            },
        ]
    },
    {
        path: '/',
        component: () => import('../layouts/DefaultLayout.vue'),
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('../pages/LandingPage.vue'),
            },
            {
                path: 'login',
                name: 'login',
                component: () => import('../pages/LoginPage.vue'),
            },
            {
                path: 'reset-password',
                children: [
                    {
                        path: '',
                        props: true,
                        name: 'reset-password-email',
                        component: () => import('../pages/PasswordResetPage.vue'),
                    },
                    {
                        path: ':token',
                        props: true,
                        name: 'reset-password-token',
                        component: () => import('../pages/PasswordResetPage.vue'),
                    },
                ]
            },
        ]
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
