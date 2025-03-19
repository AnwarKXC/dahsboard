<script setup lang="ts">
import { useQRCode } from '@vueuse/integrations/useQRCode'

const props = defineProps<{
  text?: string
}>()

const currentLocation = ref('')
const qrcodeText = ref('')

onMounted(() => {
  currentLocation.value = typeof window !== 'undefined' ? window.location.href : ''
})

watch([() => props.text, currentLocation], () => {
  qrcodeText.value = props.text || currentLocation.value
}, { immediate: true })

const qrcode = useQRCode(qrcodeText, {
  errorCorrectionLevel: 'H',
  margin: 3,
  scale: 5,
  type: 'image/jpeg',
  color: {
    dark: '#006e6e',
    light: '#fff',
  },
})
</script>

<template>
  <img :src="qrcode" alt="QR Code">
</template>
