<script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios'

    //components import
    import HeaderSection from '../components/HeaderSection.vue'
    import HeroSection from '../components/HeroSection.vue'
    import TechnologySection from '../components/TechnologySection.vue'
    import ChooseUsSection from '../components/ChooseUsSection.vue'
    import WhatWeOfferSection from '../components/WhatWeOfferSection.vue'
    import TestimonialSection from '../components/TestimonialSection.vue'
    import OurProgramCurricula from '../components/OurProgramCurricula.vue'
    import OurCourses from '../components/OurCourses.vue'
    import LocationSection from '../components/LocationSection.vue'
    import FooterSection from '../components/FooterSection.vue'

</script>

<template>
  <div class="min-h-screen flex flex-col text-gray-800">
    <HeaderSection />
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
