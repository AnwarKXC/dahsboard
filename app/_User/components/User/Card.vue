<script setup lang="ts">
import { Icon } from '#components'

const props = defineProps<{
  user: IUser
  deleteUser: (id: number) => void
  loading: boolean
}>()
</script>

<template>
  <div class=" flex items-center gap-3  border-2 border-primary-300/25 p-3 mt-7 bg-white dark:bg-secondary-300/30 rounded-lg shadow relative " :class="loading ? 'opacity-50 animate-pulse' : ''">
    <Icon :name="user.status === 'Active' ? 'nrk:check-active' : 'nrk:close-active'" class=" absolute end-2 top-2 text-500" :class="user.status === 'Active' ? 'text-success' : 'text-error'" />
    <div class=" grid place-content-center place-items-center gap-4 border-e-2 pe-2">
      <NuxtImg :src="user.profileImage" width="50" height="50" alt="user image" class=" size-24 rounded-full border-[3px] border-t-gold-300/50 drop-shadow-sm border-primary-300 -mt-7 bg-white object-contain" />
      <div class="between gap-5 text-200 ">
        <NuxtLink :to="useLocaleR(`/users/${user._id}`)" class=" opacity-70 hover:opacity-100 duration-300 center flex-col ">
          <Icon :name="props.loading ? 'line-md:loading-loop' : 'material-symbols:person'" class=" text-400 " />
          View
        </NuxtLink>
        <NuxtLink :to="useLocaleR(`/users/${user._id}/edit`)" class="opacity-70 hover:opacity-100 duration-300 center flex-col ">
          <Icon :name="props.loading ? 'line-md:loading-loop' : 'material-symbols:edit'" class=" text-400 " />
          Edit
        </NuxtLink>
        <button class=" hover:text-error center flex-col opacity-70 hover:opacity-100 duration-300  text-secondary-600" @click="props.deleteUser(user._id)">
          <Icon :name=" props.loading ? 'line-md:loading-loop' : 'material-symbols:delete'" class=" text-400  " />
          Delete
        </button>
      </div>
    </div>
    <div class=" grid justify-between  h-full ">
      <div class="text-300">
        <h4 class="text-400">
          <b> {{ user.name }}</b>
        </h4>
        <h5> <span class="opacity-70 text-[.85em]">role: </span>{{ user.role }}</h5>
        <h6><span class="opacity-70 text-[.85em]"> Position: </span>{{ user.position }}</h6>
      </div>
      <div class="space-y-1 text-start text-200">
        <BaseIconLabel v-if="user.phone" icon="material-symbols:call" :label="user.phone" />
        <BaseIconLabel v-if="user.email" icon="material-symbols:mail" :label="user.email" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
