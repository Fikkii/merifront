<script setup>
    import { ref, onMounted, nextTick } from 'vue'
    import { useRouter } from 'vue-router'
    import { marked } from 'marked'
    import axios from 'axios'
    import hljs from 'highlight.js'

    import 'highlight.js/styles/github-dark.css' // ✅ Ensure this path is correct

    marked.setOptions({
      highlight(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
          return hljs.highlight(code, { language: lang }).value
        }
        return hljs.highlightAuto(code).value
      },
      langPrefix: 'hljs language-'
    })
    const props = defineProps(['id'])

    const topic = ref([])
    const content = ref([])

    const router = useRouter()

    onMounted(async () => {
        const res = await axios.get(`/api/student/topic?topicId=${props.id}`)

        topic.value = res.data.topic
        content.value = marked.parse(res.data.topic.content)

        await nextTick()
          document.querySelectorAll('pre code').forEach(block => {
            hljs.highlightElement(block)
          })
        if(res.status == 200){
            console.log(topic.value)
        }
    })

    async function handleComplete(){
        axios.put('/api/student/topic/complete', { topicId: props.id })
        router.push({ name: 'learning' })
    }
</script>

<template>
    <div v-if="topic">
        <div class="flex flex-col pb-3 mb-4 gap-2">
            <div class="flex justify-between items-center">
                <span class="text-lg">Home</span>
                <button @click="handleComplete" class="bg-indigo-600 px-6 text-white py-3 rounded">
                    <i class="ri-check-line me-3"></i>
                    <span>{{ topic.completed ? 'Completed' : 'Mark as Complete' }}</span>
                </button>
            </div>
            <div class="flex items-center gap-2">
                <div class="flex-1 h-2 items-center rounded shadow bg-white"></div>
                <span class>0</span>
            </div>
        </div>
        <div>
            <div class="text-2xl text-blue-800 font-bold"> {{ topic.title }} </div>
            <div v-html="content" class="prose md:prose-md sm:prose-sm"></div>
        </div>
    </div>
    <div v-else>
        Loading...
    </div>
</template>

<style scoped>

</style>

