<script setup>
    import { ref, onMounted, nextTick, watch } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import { marked } from 'marked'
    import axios from 'axios'
    import hljs from 'highlight.js'

    import ModuleList from '../../components/ModuleList.vue'

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
    const routes = useRoute()

    watch(() => routes.params.id, (newVal, oldVal) => {
        fetchTopic()
    })

    async function fetchTopic(){
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
    }

    onMounted(async () => { fetchTopic()})

    async function handleComplete(){
        axios.put('/api/student/topic/complete', { topicId: props.id })
        router.push({ name: 'learning' })
    }
</script>

<template>
    <div v-if="topic">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 md:5 lg:gap-20 items-start">
            <div class="hidden md:block sticky top-0 left-0">
                <ModuleList />
            </div>
            <div class="col-span-2">
                <div class="text-2xl text-blue-800 font-semibold border-b">Topic: {{ topic.title }} </div>
                <div v-html="content" class="prose md:prose-md sm:prose-sm min-w-full"></div>
                <button class="bg-indigo-500 px-4 py-2 text-white rounded shadow-xl mt-5 ms-auto block text-lg">Complete Reading</button>
            </div>
        </div>
    </div>
    <div v-else>
        Loading...
    </div>
</template>

<style scoped>

</style>

