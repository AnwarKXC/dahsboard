<script setup lang="ts">
const { locale } = useI18n()
const positions = await useFetchWithCache('/api/position/names')
</script>

<template>
  <BaseDropDown
    :options="positions"
    option-value="en"
    :option-label="locale"
  />
</template>

<style scoped>

</style>
