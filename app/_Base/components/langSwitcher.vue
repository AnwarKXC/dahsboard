<script setup lang="ts">
const switchLocalePath = useSwitchLocalePath()
const { localeProperties } = useI18n()
</script>

<template>
  <div>
    <NuxtLink
      class="localeButtonStyle"
      :to=" switchLocalePath(localeProperties.code === 'ar' ? 'en' : 'ar') "
    >
      <p class="flex items-center gap-2">
        <span>{{ localeProperties.name === 'عربي' ? 'English' : 'عربي' }}</span>
        <Icon v-if=" localeProperties.name !== 'عربي' " name="circle-flags:ae" class="text-2xl" />
        <Icon v-else name="emojione:flag-for-united-states" class="text-2xl" />
      </p>
    </NuxtLink>
  </div>
</template>

<style scoped></style>
