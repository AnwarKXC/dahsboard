<script setup lang="ts">
defineProps<{
  icon: string
  label: string
}>()
</script>

<template>
  <div class=" flex items-center gap-1 ">
    <Icon :name="icon" />
    <span>{{ label }}</span>
  </div>
</template>

<style scoped>

</style>
