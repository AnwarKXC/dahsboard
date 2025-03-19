<script setup lang="ts">
import type { BaseInput } from '#build/components'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  lat?: number
  lng?: number
  placeId?: string
  address?: string
  disabled?: boolean
  isRequired?: boolean
}>(), {
  disabled: false,
})

const emit = defineEmits(['address', 'latitude', 'longitude', 'place'])

// Reactive state
const showModal = ref(false)
const showMap = ref(false)
const searchQuery = ref('')
const searchPlacesResults = ref<
{ description: string, placeId: string }[] | { error: string }
>([])
const inputRef = ref<InstanceType<typeof BaseInput>>()

watch(() => inputRef.value?.isInputDisabled, (val) => {
  if (!val) {
    showModal.value = true
  }
})

const { getLocations } = useGooglePlacesApi()

// Methods
async function searchPlaces() {
  try {
    searchPlacesResults.value = await getLocations(searchQuery.value)
  }
  catch (error) {
    consola.error('Error fetching places:', error)
  }
}

function selectPlaceHandler(result: { description: string, placeId: string }) {
  emit('address', result.description)
  emit('place', result.placeId)
  showModal.value = false
}

function handleMarkers(location: { lat: number, lng: number, address?: string }) {
  consola.info('Selected location:', location)
  if (location) {
    emit('address', location.address || '')
    emit('latitude', location.lat)
    emit('longitude', location.lng)
    showMap.value = false
    showModal.value = false
  }
}
</script>

<template>
  <!-- Address Input -->
  <BaseInput
    v-bind="$attrs"
    ref="inputRef"
    icon="ic:outline-edit"
    placeholder="Enter Address"
    :is-required="isRequired"
    :disabled="disabled"
    @focus="showModal = true"
  />

  <!-- Address Modal -->
  <BaseModal
    v-model="showModal"
    center
    title="Enter Your Address"
  >
    <div class="my-4 min-h-[40dvh]">
      <label class="py-2 relative">
        <Icon
          name="material-symbols-light:search-rounded"
          class="text-secondary-600 absolute top-0 m-1"
          size="28"
        />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search address"
          class="py-2.5 my-2 focus-within:outline-none border ps-9 text-primary-500 border-secondary-500 min-w-72 md:min-w-[420px] peer"
          @input="searchPlaces"
        >
        <ul
          v-if="Array.isArray(searchPlacesResults) && searchPlacesResults.length > 0"
          class="absolute rounded-sm p-2 h-40 overflow-y-auto z-10 bg-white top-full w-full drop-shadow border mt-1.5"
        >
          <li
            v-for="result in searchPlacesResults"
            :key="result.placeId"
            class="p-2 rounded-sm hover:bg-primary-500 hover:text-white cursor-pointer hover:bg-secondary-100 duration-200 text-sm"
            @click="selectPlaceHandler(result)"
          >
            {{ result.description }}
          </li>
        </ul>
      </label>
      <button class="flex items-center gap-2 mt-4" @click="showMap = true">
        <Icon
          name="solar:point-on-map-line-duotone"
          class="text-primary-500"
          size="28"
        />
        <p class="text-primary-500">
          {{ $t('general.chooseMap') }}
        </p>
      </button>
    </div>
  </BaseModal>

  <!-- Map Modal -->
  <BaseModal v-model="showMap" center>
    <div class="!w-[80vw]">
      <BaseMap
        :initial-location="{
          lat: props.lat || 0,
          lng: props.lng || 0,
          address: props.address,
        }"
        @update:location="handleMarkers"
      />
    </div>
  </BaseModal>
</template>

<style scoped>
/* Add any additional scoped styles here */
</style>
