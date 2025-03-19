<script setup lang="ts">
definePageMeta({
  layout: 'auth',
})
const { loading, signout } = useAuth()
</script>

<template>
  <main class=" grid place-content-center gap-8 h-screen ">
    <BaseTypography as="h1" size="lg">
      You need to be Admin or Employee to access this page
    </BaseTypography>
    <BaseButton @click="navigateTo(useLocaleR('/'))">
      redirect to Dashboard
    </BaseButton>
    <div class=" text-center">
      Or
    </div>
    <BaseButton :is-loading="loading" variant="ERROR" @click="signout">
      signout
    </BaseButton>
  </main>
</template>

<style scoped>

</style>
