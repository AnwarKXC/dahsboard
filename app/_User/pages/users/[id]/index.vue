<script setup lang="ts">
const { params } = useRoute()
const { get } = useApi()
const user = ref<IUser>()

params.id && (user.value = await get<IUser>('user', params.id as string))
</script>

<template>
  <div>
    <h1 class=" text-500 font-bold center leading-loose tracking-wider animate-pulse text-error">
      SORRY ,NO TIME
    </h1>

    <pre class=" bg-black text-white/70 p-3 rounded-lg  ">{{ JSON.stringify(user, null, 3)
    }}</pre>
  </div>
</template>

<style scoped>

</style>
