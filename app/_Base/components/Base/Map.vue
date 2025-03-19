<script setup lang="ts">
// Define props with a default initial location
const props = withDefaults(defineProps<{
  initialLocation?: {
    lat: number
    lng: number
    address?: string
  }
  view?: boolean
}>(), {
  initialLocation: () => ({
    lat: 30.03878052080517,
    lng: 31.242480542041044,
    address: 'Cairo, Egypt',
  }),
})

const emit = defineEmits<{
  (e: 'update:location', location: {
    lat: number
    lng: number
    address?: string
  }): void
}>()

// Use the initial location as the starting point and maintain it
const currentLocation = ref({
  lat: props.initialLocation.lat,
  lng: props.initialLocation.lng,
  address: props.initialLocation.address,
})

const locations = ref([currentLocation.value])

async function addMarker(e: { latlng: { lat: number, lng: number } }) {
  if (props.view) {
    return
  }

  const { lat, lng } = e.latlng

  try {
    // Nominatim Reverse Geocoding API
    const response = await $fetch<{ display_name: string }>(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
      {
        method: 'GET',
      },
    )

    // Update the current location
    currentLocation.value = {
      lat,
      lng,
      address: response.display_name,
    }

    // Update locations array
    locations.value = [currentLocation.value]

    // Emit the updated location
    emit('update:location', currentLocation.value)

    consola.info('Full Address Details:', currentLocation.value)
  }
  catch (error) {
    consola.error('Geocoding Error:', error)
  }
}
</script>

<template>
  <ClientOnly>
    <LMap
      style="height: 70dvh; width: 100%;"
      :zoom="9"
      :center="[currentLocation.lat, currentLocation.lng]"
      :use-global-leaflet="false"
      @click="addMarker"
    >
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        layer-type="base"
        name="OpenStreetMap"
      />
      <LMarker
        v-for="(marker, index) in locations"
        :key="index"
        :lat-lng="[marker.lat, marker.lng]"
      />
    </LMap>
  </ClientOnly>
</template>
