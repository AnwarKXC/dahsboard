<script setup lang="ts">
const currentUser = useCookie('currentUser')
const { signout } = useAuth()
</script>

<template>
  <header
    class="bg-gold-300/5 shadow-sm shadow-gold-300/5 relative border-b h-[50px]"
  >
    <div class="py-3 md:grid grid-cols-3 flex justify-between gap-8 container items-center">
      <div class="gap-8 flex items-center max-md:hidden">
        <ModeSwitcher />
        <LangSwitcher />
      </div>
      <div class="max-md:w-fit">
        <Logo />
      </div>
      <div v-if="currentUser" class="flex justify-end items-center gap-2 h-full group relative">
        {{ currentUser.name.split(' ')[0] }} <Icon name="ic:round-logout" size="24" class="cursor-pointer text-error hover:text-red-800 duration-300" @click="signout" />
      </div>
    </div>
  </header>
</template>

<style scoped></style>
