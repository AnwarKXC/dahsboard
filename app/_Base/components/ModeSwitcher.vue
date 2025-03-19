<script setup lang="ts">
const colorMode = useColorMode()
</script>

<template>
  <div
    class="w-[60px] h-[28px] bg-gold-300/20  dark:bg-white/10 rounded-full flex items-center px-2 cursor-pointer transition-all ease-in-out shrink-0"
    @click="
      colorMode.preference === 'light'
        ? (colorMode.preference = 'dark')
        : (colorMode.preference = 'light')
    "
  >
    <TransitionGroup name="list">
      <span
        class="rounded-full size-8 flex items-center justify-start text-foreground transition-all dark:translate-x-7 dark:rtl:-translate-x-7 duration-300 drop-shadow"
      >
        <Icon
          name="solar:sun-2-linear"
          class="text-gold-400  dark:!hidden text-base sun-icon "
        />
        <Icon
          name="solar:moon-linear"
          class="text-white dark:!block !hidden text-base mb-[1px] ms-[1px]"
        />
      </span>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
}

.sun-icon {
  filter: drop-shadow(0 0 20px rgba(255, 165, 0, 0.8));
}
</style>
