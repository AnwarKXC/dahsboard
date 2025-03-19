<script setup>
import { useField } from 'vee-validate'
import { computed, ref, watch } from 'vue'
import draggable from 'vuedraggable'

// Props
const props = defineProps({
  initialImages: {
    type: Array,
    default: () => [],
  },
  uploadEndpoint: {
    type: String,
    default: '/api/upload',
  },
  name: {
    type: String,
    required: true,
  },
  singleMode: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:images', 'uploadSuccess', 'uploadError'])
const { value: localImages, errorMessage } = useField(() => props.name, undefined, { syncVModel: true, validateOnMount: false, validateOnValueUpdate: false })
localImages.value = props.singleMode ? (props.initialImages[0] || '') : [...props.initialImages]

const isUploading = ref(false)
const dragActive = ref(false)

// Computed property for the current image in single mode
const currentImage = computed(() => {
  return props.singleMode ? localImages.value : null
})

// Watch for changes in initialImages prop
watch(() => props.initialImages, (newImages) => {
  localImages.value = props.singleMode ? (newImages[0] || '') : [...newImages]
}, { deep: true })

function handleDrop(e) {
  e.preventDefault()
  e.stopPropagation()
  dragActive.value = false

  const files = e.dataTransfer.files
  if (files?.length) {
    uploadImages({ target: { files } })
  }
}

function handleDragOver(e) {
  e.preventDefault()
  e.stopPropagation()
  dragActive.value = true
}

function handleDragLeave(e) {
  e.preventDefault()
  e.stopPropagation()
  dragActive.value = false
}

async function uploadImages(ev) {
  const files = ev.target?.files
  if (!files?.length)
    return

  isUploading.value = true

  try {
    const formData = new FormData()
    const filesToUpload = props.singleMode ? [files[0]] : files

    for (const file of filesToUpload) {
      if (!file.type.match('image.*'))
        continue
      formData.append('file', file)
    }

    const response = await $fetch(props.uploadEndpoint, {
      method: 'POST',
      body: formData,
    })

    if (response.links && Array.isArray(response.links)) {
      if (props.singleMode) {
        localImages.value = response.links[0] // Store as a string
      }
      else {
        localImages.value = [...localImages.value, ...response.links]
      }
      emitImagesChange()
      emit('uploadSuccess', response.links)
    }
  }
  catch (error) {
    console.error('Error uploading images:', error)
    emit('uploadError', error)
  }
  finally {
    isUploading.value = false
  }
}

function removeImage(index) {
  if (props.singleMode) {
    localImages.value = '' // Set to empty string in single mode
  }
  else {
    localImages.value.splice(index, 1)
  }
  emitImagesChange()
}

function emitImagesChange() {
  emit('update:images', props.singleMode ? localImages.value : [...localImages.value])
}
</script>

<template>
  <div
    class="mb-2 p-4  gap-2 rounded-md  flex-wrap border-2 border-dashed relative"
    :class="{
      'border-red-500': errorMessage,
      'border-primary-400 border-dashed': dragActive,
      '': !dragActive && !errorMessage,
      'justify-center ': singleMode,
      'flex': localImages.length,
    }"
    @drop="handleDrop"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
  >
    <div v-if="errorMessage" class="text-error absolute top-full mt-1 start-0 text-sm z-50">
      {{ errorMessage }}
    </div>
    <!-- Single Image Mode -->
    <div v-if="singleMode && currentImage" class="flex justify-center">
      <div class="relative md:size-32 size-24 rounded-xl overflow-hidden border-2 shadow-sm">
        <button class="absolute end-0 z-10" @click.prevent="removeImage(0)">
          <Icon name="ic:baseline-remove-circle" class="size-7 md:size-8" />
        </button>
        <img :src="currentImage" alt="" class="w-full h-full object-cover">
      </div>
    </div>

    <!-- Multiple Images Mode -->
    <draggable
      v-else-if="!singleMode && localImages.length > 0"
      v-model="localImages"
      class="flex flex-wrap gap-2 shrink-0"
      @end="emitImagesChange"
    >
      <template #item="{ element, index }">
        <div
          class="md:size-32 size-24 rounded-xl overflow-hidden border-2 shadow-sm hover:cursor-move relative"
        >
          <button class="absolute end-0" @click.prevent="removeImage(index)">
            <Icon name="ic:baseline-remove-circle" class="size-7 md:size-8" />
          </button>
          <img :src="element" alt="" class="size-full object-cover">
        </div>
      </template>
    </draggable>

    <!-- Loading Indicator -->
    <div
      v-if="isUploading"
      class="md:size-32 size-24 mx-auto rounded-xl overflow-hidden border border-gray-200 shadow-sm grid place-content-center animate-pulse bg-gray-100"
    >
      <Icon name="eos-icons:bubble-loading" size="56" />
    </div>

    <!-- Upload Button - Different text based on mode -->
    <label
      v-if="!isUploading && (singleMode ? !currentImage : true)"
      class="md:size-32 size-24 cursor-pointer text-center flex flex-col items-center justify-center rounded-xl shadow-sm border drop-shadow-sm bg-white/10   duration-300"
      :class="{ 'mx-auto': singleMode || localImages.length === 0 }"
    >
      <div class="flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          stroke-width="1.5" stroke="currentColor" class="w-6 h-6 "
        >
          <path
            stroke-linecap="round" stroke-linejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
          />
        </svg>
        <span v-if="dragActive" class="text-sm  mt-1">Drop it here</span>
        <span v-else class="text-sm  mt-1">
          {{ singleMode ? 'Add image' : 'Add images' }}
        </span>
        <span class="text-xs ">Drag & drop enabled</span>
      </div>
      <input
        type="file"
        :multiple="!singleMode"
        accept="image/*"
        class="hidden"
        @change="uploadImages"
      >
    </label>

    <!-- Empty State with Instructions -->
    <div v-if="!isUploading && localImages.length === 0 && !dragActive" class="text-center text-gray-500 text-sm mt-2">
      Drag and drop {{ singleMode ? 'an image' : 'images' }} or click to browse
    </div>
  </div>
</template>

<style scoped>
.draggable-item {
  transition: all 0.3s;
}
</style>
