<script setup lang="ts">
const links = ref([
  {
    title: 'Dashboard',
    icon: 'material-symbols:dashboard',
    href: '/',
  },
  {
    title: 'Users',
    icon: 'solar:users-group-rounded-linear',
    href: '/users',
  },
  {
    title: 'Holidays',
    icon: 'solar:tea-cup-bold-duotone',
    href: '/holidays',
  },
  {
    title: 'Settings',
    icon: 'material-symbols:settings-outline-rounded',
    href: '/settings',
  },

])
</script>

<template>
  <aside class="bg-gradient-to-b from-primary-500 to-primary-400/50 dark:from-[#46494d] dark:to-[#000000] drop-shadow-md  border-e-4 dark:border-gold-400/25 overflow-hidden pt-[50px]">
    <nav>
      <ul class=" space-y-1 text-center text-white text-200 overflow-y-auto">
        <li v-for="link in links" :key="link.title">
          <NuxtLink :to="useLocaleR(link.href)" class=" center flex-col hover:bg-white/15  py-4 gap-1">
            <Icon :name="link.icon" class=" text-2xl md:text-4xl" />
            <p class="max-md:hidden   ">
              {{ link.title }}
            </p>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
.router-link-active {
  @apply bg-black/35 border-s-4 border-gold-300 drop-shadow;
}
</style>
