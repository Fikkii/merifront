<script setup>
    import DashNav from '../components/DashNav.vue'
    import Header from '../components/dashboard/Header.vue'
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'

const router = useRouter()

    const links = [
    {
        title: 'Home',
        name: 'dashboard-home',
        icon: 'ri-home-line',
    },
    {
        title: 'Course',
        name: 'learning',
        icon: 'ri-donut-chart-line',
    },
    {
        title: 'Chat',
        name: 'chat',
        icon: 'ri-quill-pen-ai-line',
    },
    {
        title: 'Peer',
        name: 'peer',
        icon: 'ri-user-community-line',
    },
    {
        title: 'Ebook',
        name: 'ebooks',
        icon: 'ri-book-shelf-line',
    },
    {
        title: 'profile',
        name: 'profile',
        icon: 'ri-user-line',
    },
    {
        title: 'community',
        name: 'community',
        icon: 'ri-link',
    },
    ]

const sidebarOpen = ref(true)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

function handleLogout(){
    localStorage.removeItem('jwt-token')
    router.push({ name: 'home' })
}
</script>

<template>
    <div class="min-h-screen max-w-screen flex flex-col bg-gray-50">
        <Header />
            <div class="flex-1">
                <div class="flex">
                    <div class="hidden md:block sticky top-10 left-0 max-h-screen overflow-auto">
                        <div class="w-60 bg-white/50 rounded-lg m-2 mt-8 flex gap-1 flex-col">
                            <RouterLink v-for="link in links" :to="{ name: link.name }" class="px-6 flex gap-6 hover:bg-blue-300 items-center py-4 border-l-[5px] border-blue-500 font-bold"><i :class="[link.icon, 'text-xl']"></i> {{ link.title }} </RouterLink>
                        </div>
                    </div>
                    <Transition name="fade-slide" mode="out-in">
                        <RouterView class="flex-1 px-6 py-12"></RouterView>
                    </Transition>
                </div>
            </div>
            <DashNav class="md:hidden"/>
    </div>
</template>

<style scoped>
.router-link-exact-active{
    background-color: blue;
    color: white;
    border: none;
}

.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(100px);
}

.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}

</style>

