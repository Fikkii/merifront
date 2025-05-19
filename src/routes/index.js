import { createRouter, createWebHistory } from "vue-router";
import axios from 'axios'

const routes = [
    {
        path: '/dashboard',
        component: () => import('../layouts/DashboardLayout.vue'),
        meta: { requiresAuth: true },
        beforeEnter: ( to, from ) => {
            const token = localStorage.getItem('jwt-token') || null
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            if( !token ){
                return { name: 'login' }
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
                path: 'about',
                name: 'about',
                component: () => import('../pages/dashboard/AboutPage.vue'),
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
                path: 'signup',
                name: 'signup',
                component: () => import('../pages/SignupPage.vue'),
            },
            {
                path: 'success',
                name: 'success',
                component: () => import('../pages/AccountSuccess.vue'),
            },
        ]
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
