<script lang="ts" setup>
definePageMeta({
  layout: 'users',
})
</script>

<template>
  <div>
    <div class=" flex flex-wrap gap-20 justify-center my-16">
      <div v-for="i in 5" :key="i" v-observe-animation="{ speed: 10000, number: i * 50 }" class=" text-700 font-bold mx-20 " />
    </div>
    <div class=" flex flex-wrap gap-20 justify-center">
      <CircularProgress v-for="i in 14" :key="i" :percentage="i * 5.76" :title="i" :value="i * 1" />
    </div>
  </div>
</template>

<style>

</style>
