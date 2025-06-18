<script setup>
    import { ref, onMounted } from 'vue'
    import AOS from 'aos'
    import 'aos/dist/aos.css'
    import axios from 'axios'

    //components import
    import HeroSection from '../components/HeroSection.vue'
    import TechnologySection from '../components/TechnologySection.vue'
    import ChooseUsSection from '../components/ChooseUsSection.vue'
    import WhatWeOfferSection from '../components/WhatWeOfferSection.vue'
    import TestimonialSection from '../components/TestimonialSection.vue'
    import OurProgramCurricula from '../components/OurProgramCurricula.vue'
    import OurCourses from '../components/OurCourses.vue'
    import LocationSection from '../components/LocationSection.vue'
    import FooterSection from '../components/FooterSection.vue'

// Initialize AOS when component mounts
onMounted(() => {
  AOS.init({
    duration: 1000,
    once: false, // animate only once when in view
    offset: 200
  })
})

</script>

<template>
    <div class="min-h-screen max-w-full flex flex-col text-gray-800">
        <HeroSection />
        <TechnologySection />
        <ChooseUsSection />
        <OurCourses />
        <OurProgramCurricula />
        <WhatWeOfferSection />
        <TestimonialSection />
        <LocationSection />
        <FooterSection />
    </div>
</template>

<style scoped>

</style>
