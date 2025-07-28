<script setup>
    import axios from 'axios'
    import { ref, onMounted } from 'vue'
    import { useToast } from 'vue-toastification'

    const toast = useToast()

    const metrics = ref()

    onMounted(() => { fetchMetrics() })

    async function fetchMetrics(){
    try{
        const url = import.meta.env.VITE_API_URL
        const req = await axios.get(`${url}/metrics`)
        metrics.value = req.data
        console.log(req.data)
    }catch(e){
        toast.error(e.message)
        console.error(e.message)
    }
    }
const offers = [
  {
    title: 'AI Partner',
    info: "Dive into real-world projects that simulate industry challenges. Build a portfolio of work that showcases your skills to potential employers.",
    video: 'ai.mp4'
  },
  {
    title: 'Project Based Learning',
    info: 'Dive into real-world projects that simulate industry challenges. Build a portfolio of work that showcases your skills to potential employers.',
    video: 'project.mp4'
  },
  {
    title: 'Peered Learning',
    info: 'Engage with interactive modules, quizzes, and assignments that keep you involved. Collaborate with peers in group projects and community forums.',
    video: 'peer.mp4'
  }
]
</script>

<template>
    <section class="py-16 px-7 lg:px-20">
        <div class="max-w-6xl mx-auto">
            <div class="prose min-w-full mb-10">
                <h2 class="text-xl font-bold text-gray-900">How We Learn</h2>
                <p>At Merilearn, we believe in a hands-on, immersive learning experience that bridges the gap between knowledge and real-world application.</p>
            </div>
            <div class="relative">
                <div
                        v-for="(offer, index) in offers"
                        :key="index"
                        :style="{ zIndex: index }"
                        class="sticky top-[0px] mb-10 p-5 flex flex-col md:flex-row gap-10 items-center border-[10px] border-blue-500 bg-white rounded-lg shadow-lg text-black text-center"
                        >
                        <div>
                            <h3 class="text-lg md:text-2xl font-bold mb-6">{{ offer.title }}</h3>
                            <p>{{ offer.info }}</p>
                        </div>

                        <div class="max-w-lg mx-auto rounded-xl overflow-hidden shadow-lg aspect-video">
                            <video
                                    autoplay
                                    muted
                                    playsinline
                                    loop
                                    class="w-full h-full object-cover"
                                    >
                                    <source :src="`/videos/${offer.video}`" type="video/mp4" />
                                    Your browser does not support the video tag.
                            </video>
                        </div>
                </div>
            </div>

            <div class="mt-12">
                <h2 class="font-bold text-2xl text-center">What The Record Says</h2>
                <div v-if="metrics" class="flex flex-col md:flex-row gap-4 justify-evenly mt-7 items-center">
                    <div>
                        <div class="font-bold text-7xl">
                            {{ metrics.total_users }}+
                        </div>
                        <div class="text-xl text-center">
                            Total Students
                        </div>
                    </div>
                    <div>
                        <div class="font-bold text-7xl">
                            {{ metrics.total_courses }}+
                        </div>
                        <div class="text-xl text-center">
                            Total Courses
                        </div>
                    </div>
                    <div>
                        <div class="font-bold text-7xl">
                            {{ metrics.total_projects }}+
                        </div>
                        <div class="text-xl text-center">
                            Total Projects
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* You can add transition or hover effects here if needed */
</style>

