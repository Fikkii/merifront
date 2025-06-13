<template>
  <div class="p-4 w-full mx-auto space-y-4">
    <!-- Editor Container -->
    <div ref="editorRef" class="border rounded" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineExpose } from 'vue'

import Editor from '@toast-ui/editor'
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'
import Prism from 'prismjs'
// Toast UI Editor core and plugin CSS
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css'

// Optional: Prism.js theme (from prism-themes or prismjs)
import 'prismjs/themes/prism-tomorrow.css' // You can change to your preferred theme

const editorRef = ref(null)
let editorInstance = null

const content = ref('')

onMounted(() => {
  editorInstance = new Editor({
    el: editorRef.value,
    height: '300px',
    initialEditType: 'markdown',
    previewStyle: 'vertical',
    plugins: [[codeSyntaxHighlight, { highlighter: Prism }]],
  })
})

onBeforeUnmount(() => {
  editorInstance?.destroy()
})

function setContent(content) {
  // This function will help set markdown content in an update scenario
  if (editorInstance) {
    editorInstance.setMarkdown(content)
  }
}


function saveContent() {
  if (editorInstance) {
    const markdown = editorInstance.getMarkdown()
    content.value = markdown
    return markdown
    // Example: save to backend
    // await axios.post('/api/save', { content: markdown })
  }
}

defineExpose({ setContent, saveContent })

</script>

