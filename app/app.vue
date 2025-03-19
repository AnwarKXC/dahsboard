<script setup lang="ts">
const { localeProperties } = useI18n()
</script>

<template>
  <Html :lang=" localeProperties.code " :dir=" localeProperties.direction ">
    <Body class="bg-zinc-100 dark:bg-secondary-200 dark:text-zinc-100 text-secondary-600">
      <NuxtLoadingIndicator color="#FEFCE8" />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>
