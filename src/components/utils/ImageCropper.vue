<template>
  <div class="max-w-lg w-full mx-auto px-4 py-6">
    <!-- Upload image -->
    <input
      type="file"
      accept="image/*"
      @change="onFileChange"
      class="mb-4 block w-full border rounded p-2 text-sm"
    />

    <!-- Cropper -->
    <div v-if="imageSrc" class="relative w-full">
      <Cropper
        ref="cropper"
        :src="imageSrc"
        class="w-full h-[400px] sm:h-[500px] rounded shadow-md overflow-hidden"
        :stencil-props="{
          aspectRatio: 16 / 9,
          movable: true,
          scalable: false,
          resizable: true
        }"
        :auto-zoom="true"
        :resize-image="{
          adjustStencil: true
        }"
        :transitions="true"
        :background-class="'bg-white'"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, defineExpose } from 'vue'
import { Cropper } from 'vue-advanced-cropper'
import axios from 'axios'
import 'vue-advanced-cropper/dist/style.css'

const imageSrc = ref(null)
const cropper = ref(null)

const onFileChange = (e) => {
  const file = e.target.files[0]
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (event) => {
      imageSrc.value = event.target.result
    }
    reader.readAsDataURL(file)
  }
}

const getCroppedImage = async () => {
  const result = cropper.value?.getResult()
  if (result?.canvas) {
    const blob = await new Promise((resolve) =>
      result.canvas.toBlob(resolve, 'image/jpeg', 0.9)
    )
    const formData = new FormData()
    formData.append('image', blob, 'cropped.jpg')
    return formData
  }
}

const uploadCroppedImage = async () => {
  const formData = await getCroppedImage()
  if (!formData) return

  try {
    const res = await axios.post('/api/upload', formData)
    console.log('Uploaded:', res.data)
  } catch (err) {
    console.error('Upload failed:', err)
  }
}

defineExpose({ getCroppedImage })
</script>

