<script setup>
    import { ref, onMounted, nextTick, watch } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import { marked } from 'marked'
    import axios from 'axios'
    import hljs from 'highlight.js'

    import ModuleList from '../../components/ModuleList.vue'

    //User Store Import
    import { useUserStore } from '../../store/user.js'

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

    //For handling next and previous button
    const nextTopic = ref(null)
    const prevTopic = ref(null)

    watch(() => routes.params.id, (newVal, oldVal) => {
      fetchTopic(); handlePagination(newVal)
    });

    async function handlePagination(current = routes.params.id){
      const userStore = useUserStore();
      const topicIdArray = userStore.topics;

      const numericVal = Number(current);
      const currentIndex = topicIdArray.indexOf(numericVal);

      const nextIndex = currentIndex + 1;
      const prevIndex = currentIndex - 1;

      nextTopic.value = topicIdArray[nextIndex]
      prevTopic.value = topicIdArray[prevIndex]

      console.log('Next Topic:', nextTopic.value);
      console.log('Prev Topic:', prevTopic.value);
    }

    async function fetchTopic(){
        const res = await axios.get(`/api/student/topic?topicId=${props.id}`)

        topic.value = res.data.topic
        content.value = marked.parse(res.data.topic.content)

        await nextTick()
          document.querySelectorAll('pre code').forEach(block => {
            hljs.highlightElement(block)
          })
    }

    onMounted(async () => { fetchTopic(), handlePagination()})

    async function handleComplete(){
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
                <div class="text-lg mb-4 text-blue-800 font-semibold border-b">Module: {{ topic.module_title }} </div>
                <div class="text-2xl mb-4 font-semibold">{{ topic.title }} </div>
                <div class="video-container mb-6">
                    <div class="font-bold">Recommended Video:</div>
                    <iframe
                            :src="`https://www.youtube.com/embed/${topic.video}`"
                            frameborder="0"
                            allowfullscreen
                            ></iframe>
                </div>

                <div v-html="content" class="prose md:prose-md sm:prose-sm min-w-full"></div>
                <div class="flex justify-between">
                    <RouterLink v-if="prevTopic" :to="{ name: 'topic', params: { id: prevTopic } }" class="bg-black px-4 py-2 text-white rounded shadow-xl mt-5 block text-lg"><i class="ri-arrow-left-double-line"></i>Prev</RouterLink>
                    <RouterLink v-if="nextTopic" :to="{ name: 'topic', params: { id: nextTopic } }" class="bg-black px-4 py-2 text-white rounded shadow-xl mt-5 block text-lg">Next<i class="ri-arrow-right-double-line"></i></RouterLink>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        Loading...
    </div>
</template>

<style scoped>
.video-container {
    aspect-ratio: 16 / 9;
    width: 100%;
    max-width: 640px;
}
iframe {
    width: 100%;
    height: 100%;
}
</style>

