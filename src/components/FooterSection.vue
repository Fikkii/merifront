<script setup>

</script>

<template>
    <!-- Footer -->
    <footer class="bg-black/90 text-white px-6">
        <div class="max-w-6xl mt-7 mx-auto">
            <div class="text-blue-500 font-bold mb-6 text-3xl"> Merilearn </div>
            <div class="flex justify-between flex-col md:flex-row gap-5">
                <div>
                    <a class="block" href="#home"> Home </a>
                    <a class="block" href="#about"> About </a>
                    <a class="block" href="#contact"> Contact </a>
                </div>
                <div>
                    <div> School of Design </div>
                    <div> School of AI and Data Science </div>
                    <div> School of Web Development </div>
                </div>
                <div>
                    <RouterLink :to="{ name: 'login' }"> Login/Signup </RouterLink>
                    <div> Contact us: support@merilearn.com.ng </div>
                </div>
            </div>
            <div class="text-center py-10 text-sm text-gray-500 space-y-3">
                <p>© {{ new Date().getFullYear() }} MeriLearn. All rights reserved.</p>
                <div class="flex justify-center gap-4 text-xl text-blue-600">
                    <a href="#" target="_blank"><i class="ri-facebook-circle-line"></i></a>
                    <a href="#" target="_blank"><i class="ri-twitter-x-line"></i></a>
                    <a href="#" target="_blank"><i class="ri-linkedin-box-line"></i></a>
                    <a href="mailto:support@merilearn.com"><i class="ri-mail-line"></i></a>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>

</style>


