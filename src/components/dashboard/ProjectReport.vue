<script setup>
    import ProgressBar from '../ProgressBar.vue'
    
    defineProps({
        project: {
            type: 'string',
            required: true,
            default: null
        }
    })
</script>

<template>
    <div v-if="project" class="my-5">
        <div class="flex justify-between align-item-center mb-3">
            <div class="bg-green-50 text-green-500 font-bold">Very Good</div>
            <div>
                <div class="flex gap-1 items-center">
                    <i class="ri-star-fill text-orange-300 text-lg"></i>
                    <i class="ri-star-fill text-orange-300 text-lg"></i>
                    <i class="ri-star-fill text-orange-300 text-lg"></i>
                    <i class="ri-star-fill text-orange-300 text-lg"></i>
                    <i class="ri-star-fill text-orange-300 text-lg"></i>
                    <span class="font-bold">{{ project.score}} out of 100</span>
                </div>
            </div>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2 mb-3 overflow-hidden">
            <div class="bg-green-500 h-full rounded-full" :style="{width: project.score + '%'}"></div>
        </div>
        <div class="bg-blue-50 rounded px-[12px] py-[20px]">
            <ProgressBar :percentage="project.score" />
            <div class="prose prose-sm min-w-full">
                <ol>
                    <h3> Project Strength </h3>
                    <li v-for="strength in project.project_strengths">{{ strength }}</li>
                </ol>
                <ol>
                    <h3> Project Weakness </h3>
                    <li v-for="weakness in project.project_weakness">{{ weakness }}</li>
                </ol>
                <ol>
                    <h3> Alignment with Instructor Instructions </h3>
                    <li v-for="alignment in project.alignment">{{ alignment }}</li>
                </ol>
                <ol>
                    <h3> Areas of Improvement </h3>
                    <li v-for="improvement in project.aoi">{{ improvement }}</li>
                </ol>
                <ol>
                    <h3>Final Assessment</h3>
                    <li v-for="final in project.final_assessment">{{ final }}</li>
                </ol>
            </div>
        </div>
    </div>
</template>
